import fs from 'fs';
import {URL} from 'url';
import {Protocol, ProxySetting} from 'get-proxy-settings';
import {HttpProxyAgent, HttpsProxyAgent} from 'hpagent';
import got from 'got/dist/source';
import path from 'path';
import stripJsonComments from 'strip-json-comments';
import {extraDiscoveryRestUrls} from './extra-apis';

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
  // eslint-disable-next-line node/no-unpublished-import
  const tslintAll = await import('../node_modules/tslint/lib/configs/all');
  const options = tslintAll.rules['ban-types'].options;
  return options.length || options[0].length ? options.map(x => x[0]) : [];
}

export async function request<T extends object | string>(
  url: string,
  proxy: ProxySetting | undefined,
  responseType: 'json' | 'text' = 'json'
): Promise<T> {
  const protocol = new URL(url).protocol as 'http:' | 'https:';
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
 * @param ms Milliseconds to wait
 */
export const sleep = (ms: number) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

export const getAllDiscoveryItems = async (proxy?: ProxySetting) => {
  const getExtraDiscoveryItems = async (proxy?: ProxySetting) => {
    const discoveryRestItems: NonNullable<
      gapi.client.discovery.DirectoryList['items']
    > = [];
    for (const discoveryRestUrl of extraDiscoveryRestUrls) {
      const discoveryRest = {
        ...(await request<
          NonNullable<gapi.client.discovery.DirectoryList['items']>[number]
        >(discoveryRestUrl, proxy)),
        discoveryRestUrl,
      };
      discoveryRestItems.push(discoveryRest);
    }

    return discoveryRestItems;
  };

  const list = await request<gapi.client.discovery.DirectoryList>(
    'https://www.googleapis.com/discovery/v1/apis',
    proxy
  );

  return [...(list.items || []), ...(await getExtraDiscoveryItems())];
};
