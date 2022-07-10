import path from 'node:path';
import sortObject from 'deep-sort-object';
import {
  checkExists,
  ensureDirectoryExists,
  getPackageName,
  parseVersion,
} from '../utils.js';
import {DtTemplateData, Template} from './template/index.js';
import {ProxySetting} from 'get-proxy-settings';
import {excludedRestDescriptionIds} from '../app.js';
import {fallbackDocumentationLinks} from '../constants.js';
import {getAllRestDescriptions} from '../discovery.js';

type RestDescription = gapi.client.discovery.RestDescription;

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

  async processService(restDescription: RestDescription) {
    restDescription = sortObject(restDescription);
    restDescription.id = checkExists(restDescription.id);
    restDescription.name = checkExists(restDescription.name);
    const packageName = getPackageName(restDescription);

    console.log(`Processing service with ID ${restDescription.id}...`);

    restDescription.documentationLink =
      restDescription.documentationLink ||
      fallbackDocumentationLinks[restDescription.id];

    if (!restDescription.documentationLink) {
      throw `No documentationLink found for service with ID ${restDescription.id}, can't write required Project header, aborting`;
    }

    const destinationDirectory = path.join(
      this.config.dtTypesDirectory,
      packageName
    );

    ensureDirectoryExists(destinationDirectory);

    const templateData: DtTemplateData = {
      restDescription,
      majorAndMinorVersion: parseVersion(checkExists(restDescription.version)),
      packageName,
    };

    await tsconfigTpl.write(
      path.join(destinationDirectory, 'tsconfig.json'),
      templateData
    );
    await tslintTpl.write(
      path.join(destinationDirectory, 'tslint.json'),
      templateData
    );
    await packageJsonTpl.write(
      path.join(destinationDirectory, 'package.json'),
      templateData
    );
    await indexDTsTpl.write(
      path.join(destinationDirectory, 'index.d.ts'),
      templateData
    );
  }

  async discover(service: string | undefined) {
    console.log('Discovering Google services...');

    const restDescriptions = (await getAllRestDescriptions(this.config.proxy))
      .filter(({restDescription}) =>
        service ? restDescription.name === service : true
      )
      .filter(
        ({restDescription}) =>
          !excludedRestDescriptionIds.includes(
            checkExists(restDescription.name)
          )
      );

    if (restDescriptions.length === 0) {
      throw Error("Can't find services");
    }

    for (const {restDescription} of restDescriptions) {
      // do not call processService() in parallel, Google used to be able to handle this, but not anymore

      try {
        await this.processService(restDescription);
      } catch (e) {
        console.error(e);
        throw Error(`Error processing service: ${restDescription.name}`);
      }
    }
  }
}
