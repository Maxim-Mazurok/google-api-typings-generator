import {ProxySetting} from 'get-proxy-settings';
import {allExtraApiGenerators} from './extra-apis.js';
import {ArrayElement, checkExists, request} from './utils.js';

export type DiscoveryItem = ArrayElement<
  NonNullable<gapi.client.discovery.DirectoryList['items']>
>;
export type RestDescription = gapi.client.discovery.RestDescription;
export type RestDescriptionExtended = {
  restDescriptionSource: URL;
  discoveryItem?: DiscoveryItem; // only for those from the DiscoveryList
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
    const {HTTPError} = await import('got');
    if (e instanceof HTTPError && e.response.statusCode === 404) {
      // got 404 as expected, stop looking further
      console.warn(`${restDescriptionSource} returned 404, skipping...`);
    } else if (e instanceof HTTPError && e.response.statusCode === 403) {
      // got 403 for some unreleased API, as expected, skip...
      console.warn(`${restDescriptionSource} returned 403, skipping...`);
    } else {
      console.error(`Error getting ${restDescriptionSource}`);
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
): Promise<Required<RestDescriptionExtended>[]> => {
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);

  return await getRestDescriptionsOfDiscoveryItems(baseDiscoveryItems, proxy);
};

export const getRestDescriptionsOfDiscoveryItems = async (
  discoveryItems: DiscoveryItem[],
  proxy?: ProxySetting
): Promise<Required<RestDescriptionExtended>[]> => {
  const restDescriptionsExtended: Required<RestDescriptionExtended>[] = [];

  for (const discoveryItem of discoveryItems) {
    const restDescriptionSource = new URL(
      checkExists(discoveryItem.discoveryRestUrl)
    );

    const restDescription = await getRestDescriptionIfPossible(
      restDescriptionSource,
      proxy
    );

    if (restDescription) {
      restDescriptionsExtended.push({
        restDescription,
        discoveryItem,
        restDescriptionSource,
      });
    }
  }

  return restDescriptionsExtended;
};

export const getExtraRestDescriptions = async (
  generatorFunctions: ((
    proxy?: ProxySetting
  ) => AsyncGenerator<RestDescriptionExtended>)[],
  proxy?: ProxySetting
): Promise<RestDescriptionExtended[]> => {
  const extraRestDescriptionsExtended: RestDescriptionExtended[] = [];

  for (const generatorFunction of generatorFunctions) {
    const generator = generatorFunction(proxy);

    for await (const restDescriptionExtended of generator) {
      extraRestDescriptionsExtended.push(restDescriptionExtended);
    }
  }

  return extraRestDescriptionsExtended;
};

export const getAllRestDescriptions = async (
  // TODO: @medium-value @medium-cost Look into why it is not used
  proxy?: ProxySetting
): Promise<Array<RestDescriptionExtended>> => {
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
  const extraDiscoveryItems = extraRestDescriptions.map(
    restDescriptionExtended =>
      restDescriptionExtendedToDiscoveryItem(restDescriptionExtended)
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

export const restDescriptionExtendedToDiscoveryItem = ({
  restDescription,
  restDescriptionSource,
}: RestDescriptionExtended): DiscoveryItem => {
  return {
    ...restDescription,
    discoveryRestUrl: restDescriptionSource.toString(),
  };
};

export const getRestDescriptionsForService = async (
  service: NonNullable<RestDescription['name']>,
  proxy?: ProxySetting
): Promise<RestDescriptionExtended[]> => {
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
