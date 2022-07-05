import {ProxySetting} from 'get-proxy-settings';
import {HTTPError} from 'got';
import {RestDescription} from './discovery.js';
import {request} from './utils.js';

export async function* getGoogleAdsRestDescription(
  proxy?: ProxySetting
): AsyncGenerator<RestDescription> {
  let version = 4; // starting version

  do {
    const discoveryRestUrl =
      'https://googleads.googleapis.com/$discovery/rest?version=%%VERSION%%'.replace(
        '%%VERSION%%',
        `v${version}`
      );

    try {
      const discoveryRest = {
        ...(await request<RestDescription>(discoveryRestUrl, proxy)),
        discoveryRestUrl,
      };
      yield discoveryRest;
    } catch (e) {
      if (e instanceof HTTPError && e.response.statusCode === 404) {
        // got 404 as expected, stop looking further
      } else {
        throw e;
      }
      return;
    }

    version++;
  } while (true);
}

export const allExtraApiGenerators = [getGoogleAdsRestDescription];
