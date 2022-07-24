import path from 'node:path';
import sortObject from 'deep-sort-object';
import {
  checkExists,
  ensureDirectoryExists,
  getPackageName,
  getPackageNameLegacy,
  isLatestOrPreferredVersion,
  parseVersion,
  parseVersionLegacy,
} from '../utils.js';
import {DtTemplateData, Template} from './template/index.js';
import {ProxySetting} from 'get-proxy-settings';
import {excludedRestDescriptionIds} from '../app.js';
import {fallbackDocumentationLinks} from '../constants.js';
import {
  getAllDiscoveryItems,
  getRestDescription,
  getRestDescriptionsForService,
} from '../discovery.js';

type RestDescription = gapi.client.discovery.RestDescription;

const tsconfigTpl = new Template('tsconfig.dot');
const tslintTpl = new Template('tslint.dot');
const packageJsonTpl = new Template('package-json.dot');
const packageJsonLegacyTpl = new Template('package-json-legacy.dot');
const indexDTsTpl = new Template('index-d-ts.dot');
const indexDTsLegacyTpl = new Template('index-d-ts-legacy.dot');

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

  async processService(
    restDescription: RestDescription,
    generateLegacyPackage = false
  ) {
    restDescription = sortObject(restDescription);
    restDescription.id = checkExists(restDescription.id);
    restDescription.name = checkExists(restDescription.name);
    const packageName = generateLegacyPackage
      ? getPackageNameLegacy(restDescription)
      : getPackageName(restDescription);

    console.log(
      `Processing ${generateLegacyPackage ? 'legacy ' : ''}service with ID ${
        restDescription.id
      }...`
    );

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

    const getVersion = () => {
      const restDescriptionVersion = checkExists(restDescription.version);
      if (generateLegacyPackage) {
        const version = parseVersionLegacy(restDescriptionVersion);
        return `${version.major}${version.minor}`;
      }
      return parseVersion(restDescriptionVersion);
    };

    const templateData: DtTemplateData = {
      restDescription,
      majorAndMinorVersion: getVersion(),
      packageName: getPackageName(restDescription),
      ...(generateLegacyPackage && {
        legacyPackageName: getPackageNameLegacy(restDescription),
      }),
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
    const packageJsonTemplate = generateLegacyPackage
      ? packageJsonLegacyTpl
      : packageJsonTpl;
    await packageJsonTemplate.write(
      path.join(destinationDirectory, 'package.json'),
      templateData
    );
    const indexDTsTemplate = generateLegacyPackage
      ? indexDTsLegacyTpl
      : indexDTsTpl;
    await indexDTsTemplate.write(
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

          const generateLegacyPackage = isLatestOrPreferredVersion(
            restDescriptionExtended,
            serviceRestDescriptionsExtended.map(
              ({discoveryItem}) => discoveryItem || {}
            )
          );
          if (generateLegacyPackage) {
            await this.processService(
              restDescriptionExtended.restDescription,
              generateLegacyPackage
            );
          }
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
        const restDescription = await getRestDescription(
          restDescriptionSource,
          this.config.proxy
        );

        if (!restDescription) return;

        try {
          await this.processService(restDescription);

          const generateLegacyPackage = isLatestOrPreferredVersion(
            {restDescription, restDescriptionSource, discoveryItem},
            discoveryItems
          );
          if (generateLegacyPackage) {
            await this.processService(restDescription, generateLegacyPackage);
          }
        } catch (e) {
          console.error(e);
          throw Error(`Error processing service: ${restDescription.name}`);
        }
      });
    }
  }
}
