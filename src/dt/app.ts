import sortObject from 'deep-sort-object';
import {ProxySetting} from 'get-proxy-settings';
import path from 'node:path';
import {excludedRestDescriptionIds} from '../app';
import {fallbackDocumentationLinks} from '../constants';
import {
  getAllDiscoveryItems,
  getRestDescriptionIfPossible,
  getRestDescriptionsForService,
} from '../discovery';
import {
  checkExists,
  ensureDirectoryExists,
  getMajorAndMinorVersion,
  getPackageNameFromRestDescription,
} from '../utils';
import {DtTemplateData, Template} from './template/index';

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
      packageName
    );

    ensureDirectoryExists(destinationDirectory);

    const templateData: DtTemplateData = {
      restDescription,
      packageName, // always new package name, not legacy!
      owners: this.config.owners,
      majorAndMinorVersion: getMajorAndMinorVersion(packageName),
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

      let failedFetchesCount = 0;

      discoveryItems.forEach(async discoveryItem => {
        const restDescriptionSource = new URL(
          checkExists(discoveryItem.discoveryRestUrl)
        );

        let restDescription;
        try {
          restDescription = await getRestDescriptionIfPossible(
            restDescriptionSource,
            this.config.proxy
          );
        } catch (e) {
          failedFetchesCount++;
          if (failedFetchesCount >= 5) {
            throw Error(
              `Failed to fetch ${failedFetchesCount} services, potentially something is wrong, please check.`
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
