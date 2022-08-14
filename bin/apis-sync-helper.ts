import {
  checkExists,
  getApiName,
  getPackageName,
  getProxy,
  request,
} from '../src/utils.js';
import fs from 'node:fs';
import path from 'node:path';
import {excludedRestDescriptionIds} from '../src/app.js';
import {fileURLToPath} from 'node:url';
import {getAllDiscoveryItems} from '../src/discovery.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prefix = '@maxim_mazurok/gapi.client.';
const pathToConfig = path.resolve(
  __dirname,
  '..',
  'bin/auto-publish/config.ts'
);
const pathToLocalAllowedPackageJsonDependencies = path.resolve(
  __dirname,
  '..',
  '..',
  'DefinitelyTyped-tools/packages/definitions-parser/allowedPackageJsonDependencies.txt'
);

const updateSupportedApis = (discoveryTypes: string[]) => {
  const newConfig = [
    'export const supportedApis = [',
    '  // cspell:disable',
    ...discoveryTypes.map(x => `  '${x}',`),
    '  // cspell:enable',
    '];',
    '',
  ];
  fs.writeFileSync(pathToConfig, newConfig.join('\n'));
};

const updateLocalAllowedPackageJsonDependencies = (
  discoveryTypes: string[]
) => {
  const localAllowedPackageJsonDependencies = fs
    .readFileSync(pathToLocalAllowedPackageJsonDependencies, {
      encoding: 'utf-8',
    })
    .split('\n');

  const firstIndex = localAllowedPackageJsonDependencies.findIndex(x =>
    x.startsWith(prefix)
  );

  const newLocalAllowedPackageJsonDependencies =
    localAllowedPackageJsonDependencies.filter(x => !x.startsWith(prefix));

  newLocalAllowedPackageJsonDependencies.splice(
    firstIndex,
    0,
    ...discoveryTypes.map(x => `${prefix}${x}`)
  );
  fs.writeFileSync(
    pathToLocalAllowedPackageJsonDependencies,
    newLocalAllowedPackageJsonDependencies.join('\n')
  );
};

const getAllApiNames = async () => {
  const allDiscoveryItems = await getAllDiscoveryItems(await getProxy());

  return allDiscoveryItems
    .filter(({id}) => !excludedRestDescriptionIds.includes(checkExists(id)))
    .map(restDescription => getApiName(restDescription))
    .sort();
};

const getAllowedPackageJsonDependencies = async () => {
  const allowedPackageJsonDependencies = await request<string>(
    new URL(
      'https://raw.githubusercontent.com/microsoft/DefinitelyTyped-tools/master/packages/definitions-parser/allowedPackageJsonDependencies.txt'
    ),
    await getProxy(),
    'text'
  );
  return allowedPackageJsonDependencies
    .split('\n')
    .filter(maximMazurokPackageName =>
      maximMazurokPackageName.startsWith(prefix)
    )
    .filter(maximMazurokPackageName =>
      excludedRestDescriptionIds.find(
        excludedRestDescriptionId =>
          getPackageName({id: excludedRestDescriptionId}) ===
          maximMazurokPackageName
      )
    )
    .sort();
};

const apiNames = await getAllApiNames();
const allowedPackageJsonDependencies =
  await getAllowedPackageJsonDependencies();

const discoveryTypesNotPresentInAllowedPackageJsonDependencies =
  apiNames.filter(x => !allowedPackageJsonDependencies.includes(x));

console.log({discoveryTypesNotPresentInAllowedPackageJsonDependencies});

const allowedPackageJsonDependenciesNotPresentInDiscoveryTypes =
  allowedPackageJsonDependencies.filter(x => !apiNames.includes(x));

console.log({allowedPackageJsonDependenciesNotPresentInDiscoveryTypes});

if (
  discoveryTypesNotPresentInAllowedPackageJsonDependencies.length !== 0 ||
  allowedPackageJsonDependenciesNotPresentInDiscoveryTypes.length !== 0
) {
  updateLocalAllowedPackageJsonDependencies(apiNames);
  updateSupportedApis(apiNames);
  // todo: open PR
}
