import sortObject from 'deep-sort-object';
import {ProxySetting} from 'get-proxy-settings';
import path from 'node:path';
import {excludedRestDescriptionIds} from '../app.js';
import {fallbackDocumentationLinks} from '../constants.js';
import {
  getAllDiscoveryItems,
  getRestDescriptionIfPossible,
  getRestDescriptionsForService,
} from '../discovery.js';
import {checkExists, ensureDirectoryExists, getPackageName} from '../utils.js';
import {DtTemplateDataToCollect, Template} from './template/index.js';

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

    const templateData: DtTemplateDataToCollect = {
      restDescription,
      packageName: getPackageName(restDescription), // always new package name, not legacy!
      owners: this.config.owners,
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

    if (service) {
      const serviceRestDescriptionsExtended =
        await getRestDescriptionsForService(service, this.config.proxy);
      for (const restDescriptionExtended of serviceRestDescriptionsExtended) {
        try {
          await this.processService(restDescriptionExtended.restDescription);
        } catch (e) {
          console.error(e);
          throw Error(
            `Error processing service: ${restDescriptionExtended.restDescription.name}`
          );
        }
      }
    } else {
      const discoveryItems = (
        await getAllDiscoveryItems(this.config.proxy)
      ).filter(
        discoveryItem =>
          !excludedRestDescriptionIds.includes(checkExists(discoveryItem.id))
      );

      if (discoveryItems.length === 0) {
        throw Error("Can't find services");
      }

      discoveryItems.forEach(async discoveryItem => {
        const restDescriptionSource = new URL(
          checkExists(discoveryItem.discoveryRestUrl)
        );
        const restDescription = await getRestDescriptionIfPossible(
          restDescriptionSource,
          this.config.proxy
        );

        if (!restDescription) return;

        try {
          await this.processService(restDescription);
        } catch (e) {
          console.error(e);
          throw Error(`Error processing service: ${restDescription.name}`);
        }
      });
    }
  }
}
