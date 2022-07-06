import {ProxySetting} from 'get-proxy-settings';
import {HTTPError} from 'got';
import {RestDescription, RestDescriptionWithSource} from './discovery.js';
import {request} from './utils.js';

export async function* getGoogleAdsRestDescription(
  proxy?: ProxySetting
): AsyncGenerator<RestDescriptionWithSource> {
  const baseUrl = 'https://googleads.googleapis.com/$discovery/rest';
  let version = 4; // starting version
  const params = {
    get version() {
      return `v${version}`;
    },
  };

  do {
    const restDescriptionSource = new URL(baseUrl);
    Object.entries(params).forEach(([paramName, paramValue]) => {
      restDescriptionSource.searchParams.set(paramName, paramValue);
    });

    try {
      const restDescription = await request<RestDescription>(
        restDescriptionSource,
        proxy
      );
      yield {
        restDescriptionSource,
        restDescription,
      };
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
