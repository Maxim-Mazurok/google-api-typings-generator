import {ProxySetting} from 'get-proxy-settings';
import {allExtraApiGenerators} from './extra-apis.js';
import {ArrayElement, checkExists, request} from './utils.js';

export type DiscoveryItems = NonNullable<
  gapi.client.discovery.DirectoryList['items']
>;

export type DiscoveryItem = ArrayElement<DiscoveryItems>;
export type RestDescription = gapi.client.discovery.RestDescription;

export const getBaseDiscoveryItems = async (
  proxy?: ProxySetting
): Promise<DiscoveryItems> => {
  const list = await request<gapi.client.discovery.DirectoryList>(
    'https://discovery.googleapis.com/discovery/v1/apis', // as per https://developers.google.com/discovery/v1/getting_started#rest
    proxy
  );
  if (!list.items) throw 'no items in discovery list';
  return list.items;
};

export const getBaseRestDescriptions = async (
  proxy?: ProxySetting
): Promise<RestDescription[]> => {
  const baseRestDescriptions: RestDescription[] = [];

  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  for (const baseDiscoveryItem of baseDiscoveryItems) {
    const baseRestDescription = await request<RestDescription>(
      checkExists(baseDiscoveryItem.discoveryRestUrl),
      proxy
    );

    baseRestDescriptions.push(baseRestDescription);
  }

  return baseRestDescriptions;
};

export const getExtraRestDescriptions = async (
  generatorFunctions: Array<
    (proxy?: ProxySetting) => AsyncGenerator<RestDescription>
  >,
  proxy?: ProxySetting
): Promise<RestDescription[]> => {
  const extraRestDescriptions: RestDescription[] = [];

  for (const generatorFunction of generatorFunctions) {
    const generator = generatorFunction(proxy);

    for await (const restDescription of generator) {
      extraRestDescriptions.push(restDescription);
    }
  }

  return extraRestDescriptions;
};

export const getAllRestDescriptions = async (
  proxy?: ProxySetting
): Promise<Array<RestDescription>> => {
  const baseRestDescriptions = await getBaseRestDescriptions(proxy);
  const extraRestDescriptions = await getExtraRestDescriptions(
    allExtraApiGenerators,
    proxy
  );

  return [...baseRestDescriptions, ...extraRestDescriptions];
};
