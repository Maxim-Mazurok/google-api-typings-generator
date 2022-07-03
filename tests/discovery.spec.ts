import assert from 'assert';
import {ProxySetting} from 'get-proxy-settings';
import {
  DiscoveryItem,
  DiscoveryItems,
  getBaseDiscoveryItems,
  getExtraDiscoveryItemsWIP,
} from '../src/discovery.js';
import {getProxy, request} from '../src/utils.js';

describe('discovery', () => {
  let proxy: ProxySetting | undefined;
  let items: DiscoveryItems = [];

  beforeEach(async () => {
    proxy = await getProxy();
    items = await getBaseDiscoveryItems(proxy);
  });

  it('items exist', () => {
    assert.strictEqual(items.length > 0, true);
  });

  it('there are a lot of items', () => {
    assert.strictEqual(items.length > 350, true);
  });

  it('id is a non-empty string', () => {
    items.forEach(item => {
      assert.strictEqual(typeof item.id, 'string');
      assert.notStrictEqual(item.id?.trim(), '');
    });
  });

  it('id = name:version', () => {
    items.forEach(item => {
      assert.strictEqual(item.id, [item.name, item.version].join(':'));
    });
  });

  it('id is unique', () => {
    const ids: DiscoveryItem['id'][] = [];
    items.forEach(({id}) => {
      assert.strictEqual(ids.includes(id), false);
      ids.push(id);
    });
  });

  it('kind is always discovery#directoryItem', () => {
    items.forEach(({kind}) => {
      assert.strictEqual(kind, 'discovery#directoryItem');
    });
  });

  it.skip('version patterns match', () => {
    // cspell:words abcdefghijklmnopqrstuwxyz
    const versions: string[] = [];
    items.forEach(({version}) => {
      if (version?.includes('*') || version?.includes('xxx'))
        throw '* or xxx in version';

      version = version?.replace(/\d/g, '1');
      version = version?.replace(/alpha/g, '*');
      version = version?.replace(/beta/g, '*');
      version = version?.replace(/[abcdefghijklmnopqrstuwxyz]{2,}/g, 'xxx');
      if (!versions.includes(version as string))
        versions.push(version as string);

      // v1
      // v4.1
      // v1alpha
      // v1beta
      // v1beta1
      // directory_v1
      // v1p1beta1
      // v1beta1a
      // v1configuration
      // assert.match(
      //   version as string,
      //   // /^(([a-z]+_)?v\d+((p\d+)?(alpha|beta)\d*|\.\d+|b\d+|[a-z]+)?|alpha|beta)$/
      //   /^(([a-z]+_)?v\d+(\.\d+|[0-9a-z]+)?|alpha|beta)$/
      // );
    });
    assert.deepStrictEqual(versions.sort(), [
      '*',
      'v1',
      'v1*',
      'v1*1',
      'v1*1a',
      'v1.1',
      'v1b1',
      'v1p1*1',
      'v1xxx',
      'xxx_v1',
    ]);
  });

  it.skip('versions match all patterns', () => {
    const options = {
      '*': 0,
      v1: 0,
      'v1*': 0,
      'v1*1': 0,
      'v1*1a': 0,
      'v1.1': 0,
      v1b1: 0,
      'v1p1*1': 0,
      v1xxx: 0,
      xxx_v1: 0,
    };

    items.forEach(({version}) => {
      if (typeof version !== 'string') throw "version isn't string";

      if (/^v\d+$/.test(version)) {
        options['v1']++;
      } else if (/^v\d+(alpha|beta)$/.test(version)) {
        options['v1*']++;
      } else if (/^v\d+(alpha|beta)\d+$/.test(version)) {
        options['v1*1']++;
      } else if (/^[a-z]+_v\d+$/.test(version)) {
        options['xxx_v1']++;
      } else if (/^v\d+\.\d+$/.test(version)) {
        options['v1.1']++;
      } else if (/^v\d+p\d+(alpha|beta)\d$/.test(version)) {
        options['v1p1*1']++;
      } else if (/^(alpha|beta)$/.test(version)) {
        options['*']++;
      } else if (/^v\d+b\d+$/.test(version)) {
        options['v1b1']++;
      } else if (/^v\d+[a-z]+$/.test(version)) {
        options['v1xxx']++;
      } else if (/^v\d+(alpha|beta)\d+a$/.test(version)) {
        options['v1*1a']++;
      } else {
        throw `${version} didn't match any pattern`;
      }
    });

    Object.values(options).forEach(count => {
      assert.notStrictEqual(count, 0);
    });
  });

  it.skip('all apis have ids', async () => {
    for (const {discoveryRestUrl} of items.splice(0, 10)) {
      if (!discoveryRestUrl) throw 'no discoveryRestUrl';

      const api = await request<gapi.client.discovery.RestDescription>(
        discoveryRestUrl,
        proxy
      );

      assert.strictEqual(typeof api.canonicalName, 'string');
      assert.notStrictEqual(api.canonicalName, '');
    }
  }).timeout(0);

  it('getExtraDiscoveryItemsWIP works', async () => {
    // Act
    const googleAds = await getExtraDiscoveryItemsWIP();

    // Assert
    assert.deepStrictEqual(
      googleAds.map(x => x.version),
      ['v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11']
    );
  }).timeout(0);
});
