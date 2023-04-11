import {getProxySettings, Protocol, ProxySetting} from 'get-proxy-settings';
import got from 'got';
import {HttpProxyAgent, HttpsProxyAgent} from 'hpagent';
import latestVersion from 'latest-version';
import _ from 'lodash';
import LineByLine from 'n-readlines';
import fs, {appendFileSync} from 'node:fs';
import {EOL} from 'node:os';
import path from 'node:path';
import {fileURLToPath, URL} from 'node:url';
import semverPatch from 'semver/functions/patch.js';
import stripJsonComments from 'strip-json-comments';
import validateNpmPackageName from 'validate-npm-package-name';
import {revisionPrefix} from './constants.js';
import {RestDescription} from './discovery.js';
import {PathLike} from 'node:fs';

type RestResource = gapi.client.discovery.RestResource;
type RestMethod = gapi.client.discovery.RestMethod;

export const TYPE_PREFIX = 'gapi.client.';
export const NPM_ORGANIZATION = 'maxim_mazurok';

/**
 * Returns the capitalized name of the TypeScript interface for the specified resource.
 */
export function getResourceTypeName(resourceName: string) {
  resourceName = resourceName
    .split('-')
    .map(x => `${x[0].toUpperCase()}${x.substring(1)}`)
    .join('');

  return `${resourceName[0].toUpperCase()}${resourceName.substring(1)}Resource`;
}

/**
 * Creates directory recursively if it doesn't exist
 */
export function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {recursive: true});
  }
}

/**
 * Reads and parses `dtslint.json` to get `max-line-length` value
 */
export function getMaxLineLength(): number {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dtslintJson = fs.readFileSync(
    path.join(__dirname, '../node_modules/dtslint/dtslint.json'),
    'utf-8'
  );
  const dtslintConfig = JSON.parse(stripJsonComments(dtslintJson)) as {
    rules: {
      'max-line-length': [boolean, number] | [boolean, {limit: number}];
    };
  };
  return typeof dtslintConfig.rules['max-line-length'][1] === 'number'
    ? dtslintConfig.rules['max-line-length'][1]
    : dtslintConfig.rules['max-line-length'][1].limit;
}

/**
 * Loads default tslint config to get banned types from `ban-types` rule
 */
export async function getBannedTypes(): Promise<string[]> {
  // eslint-disable-next-line node/no-extraneous-import
  const tslintAll = await import('tslint/lib/configs/all.js');
  const options = tslintAll.rules['ban-types'].options;
  return options.length || options[0].length ? options.map(x => x[0]) : [];
}

export async function request<T extends object | string>(
  url: URL,
  proxy: ProxySetting | undefined,
  responseType: 'json' | 'text' = 'json'
): Promise<T> {
  const protocol = url.protocol as 'http:' | 'https:';
  const agentProtocol = protocol === 'http:' ? Protocol.Http : Protocol.Https;
  const agent =
    agentProtocol === Protocol.Http ? HttpProxyAgent : HttpsProxyAgent;
  const response = got(url, {
    ...(proxy
      ? {
          agent: {
            [agentProtocol]: new agent({
              keepAlive: true,
              keepAliveMsecs: 1000,
              maxSockets: 256,
              maxFreeSockets: 256,
              scheduling: 'lifo',
              proxy: proxy.toString(),
            }),
          },
        }
      : {}),
  });
  return (await response[responseType]()) as T;
}

/**
 * @param seconds Seconds to wait
 */
export const sleep = (seconds: number) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seconds * 1000);
};

export const hasOwnProperty = <T, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const getProxy = async () => {
  const proxy = await getProxySettings();
  return proxy ? proxy.https || proxy.http : undefined;
};

// from https://stackoverflow.com/a/51399781/4536543
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const checkExists = <T>(value: T): NonNullable<T> => {
  if (value === null) {
    throw new Error('Expected non-null reference, but got null');
  }
  if (value === undefined) {
    throw new Error('Expected value to be defined, but got undefined');
  }
  return value as NonNullable<T>;
};

export const getAllNamespaces = (
  restDescription: RestDescription
): string[] => {
  const namespaces: string[] = [];

  const processMethod = ([methodName, method]: [
    methodName: string,
    method: RestMethod
  ]) => {
    if (!method.id) throw new Error(`Method ${methodName} has no ID`);

    if (!method.id.includes('.'))
      throw new Error(`Malformed method ID: ${method.id} (no dots)`);

    const namespace = method.id.split('.')[0];
    if (!namespace) throw new Error(`Can't get namespace from ${method.id}`);

    if (!namespaces.includes(namespace)) namespaces.push(namespace);
  };

  const processResource = (resource: RestResource) => {
    if (resource.methods) {
      Object.entries(resource.methods).forEach(processMethod);
    }

    if (resource.resources) {
      Object.values(resource.resources).forEach(processResource);
    }
  };

  processResource(restDescription);

  return namespaces.sort();
};

export const camelCaseToSnakeCase = (string: string): string =>
  string.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (substring, offset) => (offset ? '_' : '') + substring.toLowerCase()
  );

export const getApiName = ({id}: RestDescription): string =>
  camelCaseToSnakeCase(checkExists(id).replace(':', '-'));

export const getPackageNameFromRestDescription = (
  restDescription: RestDescription
) => {
  const apiName = getApiName(restDescription);
  return getPackageName(apiName);
};

export const getPackageName = (apiName: string) => {
  const packageName = `${TYPE_PREFIX}${apiName}`;
  const packageNameValidationResult = validateNpmPackageName(packageName);
  if (packageNameValidationResult.validForNewPackages === false) {
    console.error(packageNameValidationResult);
    throw new Error(`"${packageName}" is not a valid npm package name`);
  }
  return packageName;
};

export const getFullPackageName = (packageName: string) =>
  `@${NPM_ORGANIZATION}/${packageName}`;

export const getRevision = (indexDTSPath: PathLike) => {
  let revision: number | undefined, lineBuffer: Buffer | false;
  const liner = new LineByLine(indexDTSPath);
  while ((lineBuffer = liner.next())) {
    const line = lineBuffer.toString();
    if (line.startsWith(revisionPrefix)) {
      const match = line.match(new RegExp(`^${revisionPrefix}(\\d+)$`));
      if (match !== null && match.length === 2) {
        revision = Number(match[1]);
        break;
      }
    }
  }
  return revision;
};

export const sameNamespace = (
  id: RestMethod['id'],
  namespace: string
): boolean =>
  checkExists(id)
    .replace(new RegExp(`^${TYPE_PREFIX}`), '')
    .startsWith(namespace) === true;

/**
 * Will set output if running inside of GitHub Actions
 * https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
 * https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#environment-files
 */
export const setOutputGHActions = (key: 'FAILED_TYPE', value: string) => {
  console.log(
    // TODO: maybe remove this?
    `Trying to write ${key}=${value} to the ${process.env.GITHUB_OUTPUT}`
  );
  if (process.env.GITHUB_OUTPUT !== undefined) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}${EOL}`);
  }
};

export const hasValueRecursive = <T>(
  someObjectOrArray: object | unknown[],
  searchValue: T
): boolean => {
  let values = [];
  if (_.isObject(someObjectOrArray)) {
    values = Object.values(someObjectOrArray);
  } else if (_.isArray(someObjectOrArray)) {
    values = someObjectOrArray;
  }
  for (const value of values) {
    if (value === searchValue) {
      return true;
    }
    if (_.isObject(value) || _.isArray(value)) {
      const result = hasValueRecursive(value, searchValue);
      if (result === true) return true;
    }
  }
  return false;
};

export const getChangedTypes = async (
  packages: {name: string; revision: number}[],
  getLatestVersion = latestVersion
) => {
  const changedTypes: string[] = [];
  await Promise.all(
    packages.map(async ({name: packageName, revision: newRevision}) => {
      const fullPackageName = getFullPackageName(packageName);
      let latestPackageVersion: string;
      try {
        latestPackageVersion = await getLatestVersion(fullPackageName);
      } catch (e) {
        if ((e as Pick<Error, 'name'>).name === 'PackageNotFoundError') {
          changedTypes.push(packageName);
          return;
        }
        throw e;
      }
      const latestPublishedRevision = semverPatch(latestPackageVersion);
      if (newRevision > latestPublishedRevision) {
        changedTypes.push(packageName);
      }
    })
  );
  return changedTypes;
};

export const rootFolder = new URL('../', import.meta.url);
