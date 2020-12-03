import _ from 'lodash';
import path from 'path';
import request from 'request';
import sortObject from 'deep-sort-object';
import {ensureDirectoryExists, getTypeDirectory, parseVersion} from '../utils';
import {Template} from './template';
import {ProxySetting} from 'get-proxy-settings';
import {excludedApis} from '../app';
import {fallbackDocumentationLinks} from '../constants';

type RestDescription = gapi.client.discovery.RestDescription;
type DirectoryList = gapi.client.discovery.DirectoryList;

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

  private request(url: string): Promise<DirectoryList> {
    return new Promise((resolve, reject) => {
      request(
        url,
        {
          gzip: true,
          ...(this.config.proxy ? {proxy: this.config.proxy.toString()} : {}),
        },
        (error, response, body) => {
          if (!error && response.statusCode === 200) {
            try {
              const api = JSON.parse(body) as DirectoryList;
              resolve(api);
            } catch (e) {
              console.error(
                `Caught an error: ${e.message}; while parsing JSON from ${url}: "${body}"`
              );
              reject(error);
            }
          } else {
            console.error('Got an error: ', error);
            if (response && response.statusCode) {
              console.error(`with status code: ${response.statusCode}`);
            }
            console.error(`while fetching ${url}`);
            reject(error);
          }
        }
      );
    });
  }

  async processService(url: string, actualVersion: boolean) {
    let api;

    try {
      api = (await this.request(url)) as RestDescription;
    } catch (e) {
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
      getTypeDirectory(api.name, actualVersion ? null : api.version)
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

    const list: DirectoryList = await this.request(
      'https://www.googleapis.com/discovery/v1/apis'
    );

    const apis = list
      .items!.filter(api => (service ? api.name === service : true))
      .filter(api => excludedApis.indexOf(checkExists(api.name)) < 0);

    if (apis.length === 0) {
      throw Error("Can't find services");
    }

    _.forEach(
      _.groupBy(apis, item => item.name),
      async (associatedApis, apiKey) => {
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
    );
  }
}
