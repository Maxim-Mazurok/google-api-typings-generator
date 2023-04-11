import _ from 'lodash';
import fs, {readdirSync} from 'node:fs';
import {excludedRestDescriptionIds} from '../src/app.js';
import {getAllDiscoveryItems} from '../src/discovery.js';
import {
  NPM_ORGANIZATION,
  TYPE_PREFIX,
  checkExists,
  getApiName,
  getFullPackageName,
  getPackageNameFromRestDescription,
  getProxy,
  request,
  rootFolder,
} from '../src/utils.js';

const prefix = `@${NPM_ORGANIZATION}/${TYPE_PREFIX}`;
const homePath = new URL('..', rootFolder);
const pathToLocalAllowedPackageJsonDependencies = new URL(
  'DefinitelyTyped-tools/packages/definitions-parser/allowedPackageJsonDependencies.txt',
  homePath
);
const pathToDefinitelyTypedTypes = new URL('DefinitelyTyped/types', homePath);

const updateLocalAllowedPackageJsonDependencies = (
  discoveryTypes: string[]
) => {
  const getDirectories = (source: URL) =>
    readdirSync(source, {withFileTypes: true})
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  const definitelyTypedTypes = getDirectories(pathToDefinitelyTypedTypes)
    .filter(x => x.startsWith(TYPE_PREFIX))
    .map(x => getFullPackageName(x));

  const newAllowedPackageJsonDependencies = _.uniq(
    fs
      .readFileSync(pathToLocalAllowedPackageJsonDependencies, {
        encoding: 'utf-8',
      })
      .split('\n')
      .filter(x => x !== '')
      .concat(...discoveryTypes.map(x => `${prefix}${x}`))
      .filter(
        x => {
          if (x.startsWith(prefix)) {
            return definitelyTypedTypes.includes(x);
          }
          return true;
        } // delete my types that are already deleted from DefinitelyTyped
      )
      .sort((a, b) => {
        // only sort my packages
        if (a.startsWith(prefix) || b.startsWith(prefix)) {
          return a.localeCompare(b);
        } else {
          return 0;
        }
      })
  );

  fs.writeFileSync(
    pathToLocalAllowedPackageJsonDependencies,
    newAllowedPackageJsonDependencies.join('\n') + '\n'
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
          getPackageNameFromRestDescription({id: excludedRestDescriptionId}) ===
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
  // todo: open PR
}
