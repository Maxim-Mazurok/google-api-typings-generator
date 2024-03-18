import {ProxySetting} from 'get-proxy-settings';
import {
  getRestDescriptionIfPossible,
  RestDescriptionExtended,
} from './discovery';

export const startingVersion = 13; // v4-v12 return 404 since 18-Mar-2024; see https://developers.google.com/google-ads/api/docs/sunset-dates

export async function* getGoogleAdsRestDescription(
  proxy?: ProxySetting
): AsyncGenerator<RestDescriptionExtended> {
  const baseUrl = 'https://googleads.googleapis.com/$discovery/rest';
  let version = startingVersion;
  const params = {
    get version() {
      return `v${version}`;
    },
  };
  let foundNon404 = false;

  do {
    const restDescriptionSource = new URL(baseUrl);
    Object.entries(params).forEach(([paramName, paramValue]) => {
      restDescriptionSource.searchParams.set(paramName, paramValue);
    });

    const restDescription = await getRestDescriptionIfPossible(
      restDescriptionSource,
      proxy
    );
    if (restDescription === undefined) {
      if (foundNon404) {
        return undefined;
      }
      if (foundNon404 === false && version >= startingVersion + 50) {
        throw `We tried to fetch Google Ads Rest Descriptions for v${startingVersion} to v${version} and all returned 404. This is suspicious...`;
      }
      version++;
      continue; // try to fetch and yield next version
    }
    foundNon404 = true;
    yield {
      restDescriptionSource,
      restDescription,
    };

    version++;
  } while (true);
}

export const allExtraApiGenerators = [getGoogleAdsRestDescription];
