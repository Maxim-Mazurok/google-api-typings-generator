import fs from 'node:fs';
import {fileURLToPath, URL} from 'node:url';
import {Protocol, ProxySetting} from 'get-proxy-settings';
import {HttpProxyAgent, HttpsProxyAgent} from 'hpagent';
import got from 'got';
import path from 'node:path';
import stripJsonComments from 'strip-json-comments';
import {getProxySettings} from 'get-proxy-settings';
import {
  DiscoveryItem,
  RestDescription,
  RestDescriptionExtended,
} from './discovery.js';
import LineByLine from 'n-readlines';
import {revisionPrefix} from './constants.js';
import validateNpmPackageName from 'validate-npm-package-name';
import _ from 'lodash';

type RestResource = gapi.client.discovery.RestResource;
type RestMethod = gapi.client.discovery.RestMethod;

export const TYPE_PREFIX = 'gapi.client.';

/**
 * Converts the specified version into a `major.minor` convention.
 *
 * Always returns `0.0` because we can't reliably parse versions;
 * and we'll have one package per version anyway, see https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/652
 * and it won't be right to have `1.2` for both `v1.2beta3` and `v1.2alpha1` for example
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseVersion(version: string) {
  return '0.0'; // TODO: convert this function to a constant?
}

export function parseVersionLegacy(version: string): {
  minor: number;
  major: number;
} {
  const matches = version.match(/v(\d+)(?:\.(\d+))?/);
  if (matches === null) return {major: 0, minor: 0};
  return {major: Number(matches[1] || 0), minor: Number(matches[2] || 0)};
}

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

export const getPackageNameLegacy = (
  restDescriptionOrDiscoveryItem: RestDescription | DiscoveryItem
): string =>
  `${TYPE_PREFIX}${restDescriptionOrDiscoveryItem.name?.toLowerCase()}`;

export const getPackageName = (restDescription: RestDescription): string => {
  const apiName = getApiName(restDescription);
  const packageName = `${TYPE_PREFIX}${apiName}`;
  const packageNameValidationResult = validateNpmPackageName(packageName);
  if (packageNameValidationResult.validForNewPackages === false) {
    console.error(packageNameValidationResult);
    throw new Error(`"${packageName}" is not a valid npm package name`);
  }
  return packageName;
};

export const getRevision = (indexDTSPath: string): number | undefined => {
  let revision, line;
  const liner = new LineByLine(indexDTSPath);
  while ((line = liner.next())) {
    line = line.toString();
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
 * For items from Discovery List finds the preferred version
 * For extra items find the latest one by name
 */
export const isLatestOrPreferredVersion = (
  restDescriptionExtended: RestDescriptionExtended,
  discoveryItems: DiscoveryItem[]
): boolean => {
  if (
    Object.prototype.hasOwnProperty.call(
      restDescriptionExtended,
      'discoveryItem'
    ) &&
    Object.prototype.hasOwnProperty.call(
      restDescriptionExtended.discoveryItem,
      'preferred'
    )
  ) {
    return restDescriptionExtended.discoveryItem?.preferred || false;
  }

  const latest = discoveryItems
    .filter(
      discoveryItem =>
        checkExists(discoveryItem.name) ===
        checkExists(restDescriptionExtended.restDescription.name)
    )
    .sort((a, b) => {
      const versionA = parseVersionLegacy(checkExists(a.version));
      const versionB = parseVersionLegacy(checkExists(b.version));
      const majorDiff = versionB.major - versionA.major;
      if (majorDiff !== 0) return majorDiff;
      const minorDiff = versionB.minor - versionA.minor;
      return minorDiff;
    })[0];

  if (!latest)
    throw new Error(
      `Can't find the latest API for ${restDescriptionExtended.restDescription.name}`
    );

  return _.isEqual(latest, restDescriptionExtended.restDescription);
};
