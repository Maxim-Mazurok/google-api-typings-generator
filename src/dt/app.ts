import _ from 'lodash';
import path from 'node:path';
import sortObject from 'deep-sort-object';
import {
  ensureDirectoryExists,
  getTypeDirectoryName,
  parseVersion,
  request,
} from '../utils.js';
import {Template} from './template/index.js';
import {ProxySetting} from 'get-proxy-settings';
import {excludedApis} from '../app.js';
import {fallbackDocumentationLinks} from '../constants.js';
import {getAllDiscoveryItems} from '../discovery.js';

type RestDescription = gapi.client.discovery.RestDescription;

function checkExists<T>(t: T): NonNullable<T> {
  if (t === null) {
    throw new Error('Expected non-null reference, but got null');
  }
  return t as NonNullable<T>;
}

const tsconfigTpl = new Template('tsconfig.dot');
const tslintTpl = new Template('tslint.dot');
const packageJsonTpl = new Template('package-json.dot');
const indexDTsTpl = new Template('index-d-ts.dot');

export interface Configuration {
  proxy?: ProxySetting;
  dtTypesDirectory: string;
  maxLineLength: number;
  owners: string[];
}

export class App {
  constructor(private readonly config: Configuration) {
    ensureDirectoryExists(config.dtTypesDirectory);

    console.log(`types directory: ${config.dtTypesDirectory}`);
    console.log();
  }

  static parseOutPath(dir: string) {
    ensureDirectoryExists(dir);

    return dir;
  }

  async processService(url: string, actualVersion: boolean) {
    console.log(`Processing service ${url}...`);
    let api;

    try {
      api = (await request(url, this.config.proxy)) as RestDescription;
    } catch (e) {
      console.log(`Couldn't download ${url}`);
      console.warn(e);
      return;
    }

    api = sortObject(api);
    api.name = api.name!.toLocaleLowerCase();
    api.version = api.version!.toLocaleLowerCase();
    api.documentationLink =
      api.documentationLink ||
      fallbackDocumentationLinks[api.name] ||
      undefined;

    if (!api.documentationLink) {
      throw `No documentationLink found for ${api.id}, can't write required Project header, aborting`;
    }

    const destinationDirectory = path.join(
      this.config.dtTypesDirectory,
      getTypeDirectoryName(api.name)
    );

    ensureDirectoryExists(destinationDirectory);

    const templateData = {...api, actualVersion};
    const majorAndMinorVersion = parseVersion(checkExists(api.version));

    tsconfigTpl.write(
      path.join(destinationDirectory, 'tsconfig.json'),
      templateData
    );
    tslintTpl.write(
      path.join(destinationDirectory, 'tslint.json'),
      templateData
    );
    packageJsonTpl.write(path.join(destinationDirectory, 'package.json'), {
      ...templateData,
      majorAndMinorVersion,
    });
    indexDTsTpl.write(path.join(destinationDirectory, 'index.d.ts'), {
      ...templateData,
      majorAndMinorVersion,
      owners: this.config.owners,
    });
  }

  async discover(service: string | undefined, allVersions = false) {
    console.log('Discovering Google services...');

    const listItems = await getAllDiscoveryItems(this.config.proxy);

    const apis = listItems
      .filter(api => (service ? api.name === service : true))
      .filter(api => excludedApis.indexOf(checkExists(api.name)) < 0);

    if (apis.length === 0) {
      throw Error("Can't find services");
    }
    const apisGroupByName = _.groupBy(apis, item => item.name);

    for (const apiKey in apisGroupByName) {
      // do not call processService() in parallel, Google used to be able to handle this, but not anymore
      const associatedApis = apisGroupByName[apiKey];

      const preferredApi =
        associatedApis.find(x => x.preferred) ||
        associatedApis.sort((a, b) =>
          checkExists(a.version) > checkExists(b.version) ? 1 : -1
        )[0];

      if (preferredApi) {
        try {
          await this.processService(
            checkExists(preferredApi.discoveryRestUrl),
            checkExists(preferredApi.preferred)
          );
        } catch (e) {
          console.error(e);
          throw Error(
            `Error processing service: ${preferredApi.discoveryRestUrl}`
          );
        }
      } else {
        console.warn(`Can't find preferred API for ${apiKey}`);
      }

      if (allVersions) {
        for (const api of associatedApis.filter(x => x !== preferredApi)) {
          try {
            await this.processService(
              checkExists(api.discoveryRestUrl),
              checkExists(api.preferred)
            );
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
}
