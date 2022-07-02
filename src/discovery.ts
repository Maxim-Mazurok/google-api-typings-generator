import {ProxySetting} from 'get-proxy-settings';
import {extraDiscoveryRestUrls} from './extra-apis.js';
import {request} from './utils.js';

export type DiscoveryItems = NonNullable<
  gapi.client.discovery.DirectoryList['items']
>;

export type DiscoveryItem = DiscoveryItems[0];

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

export const getExtraDiscoveryItems = async (
  proxy?: ProxySetting
): Promise<DiscoveryItems> => {
  const extraDiscoveryItems: DiscoveryItems = [];

  for (const discoveryRestUrl of extraDiscoveryRestUrls) {
    const discoveryRest = {
      ...(await request<
        NonNullable<gapi.client.discovery.DirectoryList['items']>[number]
      >(discoveryRestUrl, proxy)),
      discoveryRestUrl,
    };
    extraDiscoveryItems.push(discoveryRest);
  }

  return extraDiscoveryItems;
};

export const getAllDiscoveryItems = async (proxy?: ProxySetting) => {
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  const extraDiscoveryItems = await getExtraDiscoveryItems();

  return baseDiscoveryItems.concat(extraDiscoveryItems);
};
