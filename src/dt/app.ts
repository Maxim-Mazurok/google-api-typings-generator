import sortObject from 'deep-sort-object';
import {ProxySetting} from 'get-proxy-settings';
import {copyFile} from 'node:fs/promises';
import path from 'node:path';
import {excludedRestDescriptionIds} from '../app.js';
import {fallbackDocumentationLinks} from '../constants.js';
import {
  getAllDiscoveryItems,
  getRestDescriptionIfPossible,
  getRestDescriptionsForService,
} from '../discovery.js';
import {
  checkExists,
  ensureDirectoryExists,
  getPackageNameFromRestDescription,
  majorAndMinorVersion,
} from '../utils.js';
import {DtTemplateData, Template} from './template/index.js';

type RestDescription = gapi.client.discovery.RestDescription;

const packageJsonTpl = new Template('package-json.dot');
const indexDTsTpl = new Template('index-d-ts.dot');

export interface Configuration {
  proxy?: ProxySetting;
  dtTypesDirectory: string;
  owners: {name: string; githubUsername: string}[];
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
    const packageName = getPackageNameFromRestDescription(restDescription);

    console.log(`Processing service with ID ${restDescription.id}...`);

    restDescription.documentationLink =
      restDescription.documentationLink ||
      fallbackDocumentationLinks[restDescription.id];

    if (!restDescription.documentationLink) {
      throw `No documentationLink found for service with ID ${restDescription.id}, can't write required Project header, aborting`;
    }

    const destinationDirectory = path.join(
      this.config.dtTypesDirectory,
      packageName,
    );

    ensureDirectoryExists(destinationDirectory);

    const templateData: DtTemplateData = {
      restDescription,
      packageName, // always new package name, not legacy!
      owners: this.config.owners,
      majorAndMinorVersion,
    };

    await packageJsonTpl.write(
      path.join(destinationDirectory, 'package.json'),
      templateData,
    );
    await indexDTsTpl.write(
      path.join(destinationDirectory, 'index.d.ts'),
      templateData,
    );

    await Promise.all(
      ['tsconfig.json', '.npmIgnore'.toLowerCase()].map(fileName =>
        copyFile(
          path.join(
            import.meta.dirname,
            'template',
            `template.${fileName}`, // can't use just fileName, because tsconfig.json will act like a real config for the index.ts inside of template folder
          ),
          path.join(destinationDirectory, fileName),
        ),
      ),
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
            `Error processing service: ${restDescriptionExtended.restDescription.name}`,
          );
        }
      }
    } else {
      const discoveryItems = (
        await getAllDiscoveryItems(this.config.proxy)
      ).filter(
        discoveryItem =>
          !excludedRestDescriptionIds.includes(checkExists(discoveryItem.id)),
      );

      if (discoveryItems.length === 0) {
        throw Error("Can't find services");
      }

      let failedFetchesCount = 0;

      discoveryItems.forEach(async discoveryItem => {
        const restDescriptionSource = new URL(
          checkExists(discoveryItem.discoveryRestUrl),
        );

        let restDescription;
        try {
          restDescription = await getRestDescriptionIfPossible(
            restDescriptionSource,
            this.config.proxy,
          );
        } catch (e) {
          console.warn(e);
          failedFetchesCount++;
          if (failedFetchesCount >= 5) {
            throw Error(
              `Failed to fetch ${failedFetchesCount} services, potentially something is wrong, please check.`,
            );
          }
        }

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
