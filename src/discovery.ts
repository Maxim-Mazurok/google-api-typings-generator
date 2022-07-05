import {ProxySetting} from 'get-proxy-settings';
import {allExtraApiGenerators} from './extra-apis.js';
import {ArrayElement, request} from './utils.js';

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

export const getAllDiscoveryItems = async (proxy?: ProxySetting) => {
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  const extraRestDescriptions = await getExtraRestDescriptions(
    allExtraApiGenerators,
    proxy
  );

  return baseDiscoveryItems.concat(extraRestDescriptions);
};
