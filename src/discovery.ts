import {ProxySetting} from 'get-proxy-settings';
import {HTTPError} from 'got';
import {extraDiscoveryRestUrls} from './extra-apis.js';
import {ArrayElement, request} from './utils.js';

export type DiscoveryItems = NonNullable<
  gapi.client.discovery.DirectoryList['items']
>;

export type DiscoveryItem = ArrayElement<DiscoveryItems>;

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
      ...(await request<DiscoveryItem>(discoveryRestUrl, proxy)),
      discoveryRestUrl,
    };
    extraDiscoveryItems.push(discoveryRest);
  }

  return extraDiscoveryItems;
};

// WIP
export const getExtraDiscoveryItemsWIP = async (
  proxy?: ProxySetting
): Promise<DiscoveryItems> => {
  const extraDiscoveryItems: DiscoveryItems = [];

  async function* getExtraDiscoveryItems() {
    // const extraItems = {
    //   baseUrl:
    //     'https://googleads.googleapis.com/$discovery/rest?version=%%VERSION%%',
    //   getVersion: generator
    // };
    let version = 4;

    do {
      const discoveryRestUrl =
        'https://googleads.googleapis.com/$discovery/rest?version=%%VERSION%%'.replace(
          '%%VERSION%%',
          `v${version}`
        );

      try {
        const discoveryRest = {
          ...(await request<DiscoveryItem>(discoveryRestUrl, proxy)),
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

  const generator = getExtraDiscoveryItems();

  for await (const discoveryItem of generator) {
    extraDiscoveryItems.push(discoveryItem);
  }

  return extraDiscoveryItems;
};

export const getAllDiscoveryItems = async (proxy?: ProxySetting) => {
  const baseDiscoveryItems = await getBaseDiscoveryItems(proxy);
  const extraDiscoveryItems = await getExtraDiscoveryItems();

  return baseDiscoveryItems.concat(extraDiscoveryItems);
};
