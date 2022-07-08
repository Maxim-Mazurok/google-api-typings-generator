import {ProxySetting} from 'get-proxy-settings';
import {HTTPError} from 'got';
import {allExtraApiGenerators} from './extra-apis.js';
import {ArrayElement, checkExists, request} from './utils.js';

export type DiscoveryItems = NonNullable<
  gapi.client.discovery.DirectoryList['items']
>;

export type DiscoveryItem = ArrayElement<DiscoveryItems>;
export type RestDescription = gapi.client.discovery.RestDescription;
export type RestDescriptionWithSource = {
  restDescriptionSource: URL;
  restDescription: RestDescription;
};

export const getRestDescription = (url: URL, proxy?: ProxySetting) =>
  request<RestDescription>(url, proxy);

export const getBaseDiscoveryItems = async (
  proxy?: ProxySetting
): Promise<DiscoveryItems> => {
  const list = await request<gapi.client.discovery.DirectoryList>(
    new URL('https://discovery.googleapis.com/discovery/v1/apis'), // as per https://developers.google.com/discovery/v1/getting_started#rest
    proxy
  );
  if (!list.items) throw 'no items in discovery list';
  return list.items;
};

export const getBaseRestDescriptions = async (
  proxy?: ProxySetting
): Promise<RestDescriptionWithSource[]> => {
  const baseRestDescriptionsWithSource: RestDescriptionWithSource[] = [];

  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  for (const baseDiscoveryItem of baseDiscoveryItems) {
    const restDescriptionSource = new URL(
      checkExists(baseDiscoveryItem.discoveryRestUrl)
    );

    try {
      console.log(`Getting ${restDescriptionSource}...`);
      const restDescription = await getRestDescription(
        restDescriptionSource,
        proxy
      );
      baseRestDescriptionsWithSource.push({
        restDescriptionSource,
        restDescription,
      });
    } catch (e) {
      if (e instanceof HTTPError && e.response.statusCode === 404) {
        // got 404 as expected, stop looking further
        console.warn(`${restDescriptionSource} returned 404, skipping...`);
      } else {
        throw e;
      }
    }
  }

  return baseRestDescriptionsWithSource;
};

export const getExtraRestDescriptions = async (
  generatorFunctions: Array<
    (proxy?: ProxySetting) => AsyncGenerator<RestDescriptionWithSource>
  >,
  proxy?: ProxySetting
): Promise<RestDescriptionWithSource[]> => {
  const extraRestDescriptionsWithSource: RestDescriptionWithSource[] = [];

  for (const generatorFunction of generatorFunctions) {
    const generator = generatorFunction(proxy);

    for await (const restDescriptionWithSource of generator) {
      extraRestDescriptionsWithSource.push(restDescriptionWithSource);
    }
  }

  return extraRestDescriptionsWithSource;
};

export const getAllRestDescriptions = async (
  proxy?: ProxySetting
): Promise<Array<RestDescriptionWithSource>> => {
  const baseRestDescriptions = await getBaseRestDescriptions(proxy);
  const extraRestDescriptions = await getExtraRestDescriptions(
    allExtraApiGenerators,
    proxy
  );

  return [...baseRestDescriptions, ...extraRestDescriptions];
};
