import fs from 'node:fs';
import {fileURLToPath, URL} from 'node:url';
import {Protocol, ProxySetting} from 'get-proxy-settings';
import {HttpProxyAgent, HttpsProxyAgent} from 'hpagent';
import got from 'got';
import path from 'node:path';
import stripJsonComments from 'strip-json-comments';
import {getProxySettings} from 'get-proxy-settings';

export const TYPE_PREFIX = 'gapi.client.';

/**
 * Converts the specified version into a `major.minor` convention.
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library
 */
export function parseVersion(version: string) {
  const matches = version.match(/v(\d+)?\.?(\d+)?/);

  return matches ? `${matches[1] || 0}.${matches[2] || 0}` : '0.0';
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
 * Returns the filesystem directory name for the specified service.
 */
export const getTypeDirectoryName = (api: string) => `${TYPE_PREFIX}${api}`;

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
