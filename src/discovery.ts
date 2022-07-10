import {ProxySetting} from 'get-proxy-settings';
import {HTTPError} from 'got';
import {allExtraApiGenerators} from './extra-apis.js';
import {ArrayElement, checkExists, request} from './utils.js';

export type DiscoveryItem = ArrayElement<
  NonNullable<gapi.client.discovery.DirectoryList['items']>
>;
export type RestDescription = gapi.client.discovery.RestDescription;
export type RestDescriptionWithSource = {
  restDescriptionSource: URL;
  restDescription: RestDescription;
};

export const getRestDescription = (
  restDescriptionSource: URL,
  proxy?: ProxySetting
) => request<RestDescription>(restDescriptionSource, proxy);

export const getRestDescriptionIfPossible = async (
  restDescriptionSource: URL,
  proxy?: ProxySetting
): Promise<RestDescription | void> => {
  try {
    console.log(`Getting ${restDescriptionSource}...`);
    const restDescription = await getRestDescription(
      restDescriptionSource,
      proxy
    );
    return restDescription;
  } catch (e) {
    if (e instanceof HTTPError && e.response.statusCode === 404) {
      // got 404 as expected, stop looking further
      console.warn(`${restDescriptionSource} returned 404, skipping...`);
    } else {
      throw e;
    }
  }
};

export const getBaseDiscoveryItems = async (
  proxy?: ProxySetting
): Promise<DiscoveryItem[]> => {
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
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);

  return await getRestDescriptionsOfDiscoveryItems(baseDiscoveryItems, proxy);
};

export const getRestDescriptionsOfDiscoveryItems = async (
  discoveryItems: DiscoveryItem[],
  proxy?: ProxySetting
): Promise<RestDescriptionWithSource[]> => {
  const restDescriptionsWithSource: RestDescriptionWithSource[] = [];

  for (const discoveryItem of discoveryItems) {
    const restDescriptionSource = new URL(
      checkExists(discoveryItem.discoveryRestUrl)
    );

    const restDescription = await getRestDescriptionIfPossible(
      restDescriptionSource,
      proxy
    );

    if (restDescription) {
      restDescriptionsWithSource.push({restDescription, restDescriptionSource});
    }
  }

  return restDescriptionsWithSource;
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

export const getExtraDiscoveryItems = async (
  proxy?: ProxySetting
): Promise<DiscoveryItem[]> => {
  const extraRestDescriptions = await getExtraRestDescriptions(
    allExtraApiGenerators,
    proxy
  );
  const extraDiscoveryItems = extraRestDescriptions.map(({restDescription}) =>
    restDescriptionToDiscoveryItem(restDescription)
  );
  return extraDiscoveryItems;
};

export const getAllDiscoveryItems = async (
  proxy?: ProxySetting
): Promise<DiscoveryItem[]> => {
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  const extraDiscoveryItems = await getExtraDiscoveryItems(proxy);

  return [...baseDiscoveryItems, ...extraDiscoveryItems];
};

export const restDescriptionToDiscoveryItem = (
  restDescription: RestDescription
): DiscoveryItem => {
  return restDescription;
};

export const getRestDescriptionsForService = async (
  service: NonNullable<RestDescription['name']>,
  proxy?: ProxySetting
): Promise<RestDescriptionWithSource[]> => {
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  const baseDiscoveryItemsMatches = baseDiscoveryItems.filter(discoveryItem =>
    service ? discoveryItem.name === service : true
  );
  if (baseDiscoveryItemsMatches.length > 0) {
    return getRestDescriptionsOfDiscoveryItems(
      baseDiscoveryItemsMatches,
      proxy
    );
  }

  const extraRestDescriptions = await getExtraRestDescriptions(
    allExtraApiGenerators,
    proxy
  );
  const extraDiscoveryItemsMatches = extraRestDescriptions.filter(
    ({restDescription}) => (service ? restDescription.name === service : true)
  );
  return extraDiscoveryItemsMatches;
};
