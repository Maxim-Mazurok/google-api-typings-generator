import {ProxySetting} from 'get-proxy-settings';
import {
  getRestDescriptionIfPossible,
  RestDescriptionExtended,
} from './discovery.js';

export async function* getGoogleAdsRestDescription(
  proxy?: ProxySetting
): AsyncGenerator<RestDescriptionExtended> {
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

    console.log(`Getting ${restDescriptionSource}...`);
    const restDescription = await getRestDescriptionIfPossible(
      restDescriptionSource,
      proxy
    );
    if (restDescription === undefined) return;
    yield {
      restDescriptionSource,
      restDescription,
    };

    version++;
  } while (true);
}

export const allExtraApiGenerators = [getGoogleAdsRestDescription];
