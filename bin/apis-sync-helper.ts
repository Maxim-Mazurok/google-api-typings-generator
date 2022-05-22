import {getProxySettings} from 'get-proxy-settings';
import _ from 'lodash';
import {request, getAllDiscoveryItems} from '../src/utils.js';
import fs from 'node:fs';
import path from 'node:path';
import {excludedApis} from '../src/app.js';
import {fileURLToPath} from 'node:url';
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

const getProxy = async () => {
  const proxy = await getProxySettings();
  return proxy ? proxy.https || proxy.http : undefined;
};

const updateSupportedApis = (discoveryTypes: string[]) => {
  const newConfig = [
    '  // cspell:disable',
    'export const supportedApis = [',
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

const listDiscoveryTypes = async () => {
  const listItems = await getAllDiscoveryItems(await getProxy());

  return _.uniq(
    listItems
      .filter(x => x.name !== undefined)
      .map(x => (x.name || '').toLocaleLowerCase())
      .filter(x => !excludedApis.includes(x))
  ).sort();
};

const listAllowedPackageJsonDependencies = async () => {
  const list = await request<string>(
    'https://raw.githubusercontent.com/microsoft/DefinitelyTyped-tools/master/packages/definitions-parser/allowedPackageJsonDependencies.txt',
    await getProxy(),
    'text'
  );
  return _.uniq(
    list
      .split('\n')
      .filter(x => x.startsWith(prefix))
      .map(x => x.replace(prefix, '').toLocaleLowerCase())
      .filter(x => !excludedApis.includes(x))
  ).sort();
};

(async () => {
  const discoveryTypes = await listDiscoveryTypes();
  const allowedPackageJsonDependencies =
    await listAllowedPackageJsonDependencies();

  const discoveryTypesNotPresentInAllowedPackageJsonDependencies =
    discoveryTypes.filter(x => !allowedPackageJsonDependencies.includes(x));

  console.log({discoveryTypesNotPresentInAllowedPackageJsonDependencies});

  if (discoveryTypesNotPresentInAllowedPackageJsonDependencies.length !== 0) {
    updateLocalAllowedPackageJsonDependencies(discoveryTypes);
    updateSupportedApis(discoveryTypes);
    // todo: open PR
  }

  const allowedPackageJsonDependenciesNotPresentInDiscoveryTypes =
    allowedPackageJsonDependencies.filter(x => !discoveryTypes.includes(x));
  console.log({allowedPackageJsonDependenciesNotPresentInDiscoveryTypes});
})();
