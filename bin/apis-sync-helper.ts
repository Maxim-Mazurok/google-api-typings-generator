import {getProxySettings} from 'get-proxy-settings';
import _ from 'lodash';
import {request} from '../src/utils';
import fs from 'fs';
import {excludedApis} from '../src/app';
type DirectoryList = gapi.client.discovery.DirectoryList;

const prefix = '@maxim_mazurok/gapi.client.';
const pathToConfig =
  '/home/maxim/google-api-typings-generator/bin/auto-publish/config.ts';
const pathToLocalAllowedPackageJsonDependencies =
  '/home/maxim/DefinitelyTyped-tools/packages/definitions-parser/allowedPackageJsonDependencies.txt';

const getProxy = async () => {
  const proxy = await getProxySettings();
  return proxy ? proxy.https || proxy.http : undefined;
};

const updateSupportedApis = (discoveryTypes: string[]) => {
  const newConfig = [
    'export const supportedApis = [',
    ...discoveryTypes.map(x => `  '${x}',`),
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

  const newLocalAllowedPackageJsonDependencies = localAllowedPackageJsonDependencies.filter(
    x => !x.startsWith(prefix)
  );

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
  const list = await request<DirectoryList>(
    'https://www.googleapis.com/discovery/v1/apis',
    await getProxy()
  );

  return _.uniq(
    list.items
      ?.filter(x => x.name !== undefined)
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
  const allowedPackageJsonDependencies = await listAllowedPackageJsonDependencies();

  const discoveryTypesNotPresentInAllowedPackageJsonDependencies = discoveryTypes.filter(
    x => !allowedPackageJsonDependencies.includes(x)
  );

  console.log({discoveryTypesNotPresentInAllowedPackageJsonDependencies});

  if (discoveryTypesNotPresentInAllowedPackageJsonDependencies.length !== 0) {
    updateLocalAllowedPackageJsonDependencies(discoveryTypes);
    updateSupportedApis(discoveryTypes);
    // todo: open PR
  }

  const allowedPackageJsonDependenciesNotPresentInDiscoveryTypes = allowedPackageJsonDependencies.filter(
    x => !discoveryTypes.includes(x)
  );
  console.log({allowedPackageJsonDependenciesNotPresentInDiscoveryTypes});
})();
