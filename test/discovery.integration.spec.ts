import assert from 'node:assert';
import {ProxySetting} from 'get-proxy-settings';
import {
  DiscoveryItem,
  getAllDiscoveryItems,
  getExtraRestDescriptions,
  getRestDescriptionIfPossible,
} from '../src/discovery.js';
import {getPackageName, getProxy} from '../src/utils.js';
import {getGoogleAdsRestDescription} from '../src/extra-apis.js';
import _ from 'lodash';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let proxy: ProxySetting | undefined;

beforeAll(async () => {
  proxy = await getProxy();
});

describe('getRestDescriptionIfPossible', () => {
  it('resolves on 404 and logs warning', async () => {
    const originalConsoleWarn = console.warn; // TODO: properly mock/spy
    let consoleWarnCalledWith;
    console.warn = (...args) => (consoleWarnCalledWith = args);
    await getRestDescriptionIfPossible(
      new URL('https://httpbin.org/status/404'),
      proxy
    );
    console.warn = originalConsoleWarn;

    expect(consoleWarnCalledWith).toStrictEqual([
      'https://httpbin.org/status/404 returned 404, skipping...',
    ]);
  });
  it('rejects on non-404', async () => {
    const promise = getRestDescriptionIfPossible(
      new URL('https://httpbin.org/status/403'),
      proxy
    );

    await assert.rejects(promise);
  });
});

describe('discovery items', () => {
  let discoveryItems: DiscoveryItem[] = [];

  beforeAll(async () => {
    const cacheFilePath = join(__dirname, 'discovery-items-cache.json');
    if (existsSync(cacheFilePath)) {
      discoveryItems = JSON.parse(readFileSync(cacheFilePath, 'utf-8'));
    } else {
      discoveryItems = await getAllDiscoveryItems(proxy);
      writeFileSync(cacheFilePath, JSON.stringify(discoveryItems, null, 2), {
        encoding: 'utf-8',
      });
    }
  }, 0);

  it('items exist', () => {
    expect(discoveryItems.length > 0).toBe(true);
  });

  it('there are a lot of items', () => {
    expect(discoveryItems.length > 350).toBe(true);
  });

  it('id is a non-empty string', () => {
    discoveryItems.forEach(item => {
      expect(typeof item.id).toBe('string');
      expect(item.id?.trim()).not.toBe('');
    });
  });

  it('id = name:version', () => {
    discoveryItems.forEach(item => {
      expect(item.id).toBe([item.name, item.version].join(':'));
    });
  });

  it('id is unique', () => {
    const ids: DiscoveryItem['id'][] = [];
    discoveryItems.forEach(({id}) => {
      expect(ids).not.toContain(id);
      ids.push(id);
    });
  });

  it('all package names are unique', () => {
    const names = new Set<string>();
    discoveryItems.forEach(discoveryItem => {
      const name = getPackageName(discoveryItem);
      expect(names).not.toContain(name);
      names.add(name);
    });
  });

  it('id does not have "-"', () => {
    discoveryItems.forEach(({id}) => {
      expect(id).not.toContain('-');
    });
  });

  it('version patterns match', () => {
    // cspell:words abcdefghijklmnopqrstuwxyz
    const versions: string[] = [];
    discoveryItems.forEach(({version}) => {
      if (version?.includes('*') || version?.includes('xxx'))
        throw '* or xxx in version';

      version = version?.replace(/\d+/g, '1');
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
    expect(versions.sort()).toStrictEqual([
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

  it('versions match all patterns', () => {
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
    const examples: {
      [key: string]: string[];
    } = {
      '*': [],
      v1: [],
      'v1*': [],
      'v1*1': [],
      'v1*1a': [],
      'v1.1': [],
      v1b1: [],
      'v1p1*1': [],
      v1xxx: [],
      xxx_v1: [],
    };

    /*
    "*": [
      "alpha",
      "beta"
    ],
    "v1": [
      "v1",
      "v2",
      "v3",
      "v4",
      "v5"
    ],
    "v1*": [
      "v1alpha",
      "v1beta",
      "v2alpha",
      "v2beta"
    ],
    "v1*1": [
      "v1alpha1",
      "v1alpha2",
      "v1beta1",
      "v1beta2",
      "v1beta3",
      "v1beta4",
      "v2alpha1",
      "v2beta1",
      "v2beta2",
      "v2beta3",
      "v3beta1"
    ],
    "v1*1a": [
      "v1beta1a"
    ],
    "v1.1": [
      "v1.1",
      "v2.1",
      "v3.5",
      "v4.1"
    ],
    "v1b1": [
      "v1b3"
    ],
    "v1p1*1": [
      "v1p1beta1",
      "v1p2beta1",
      "v1p3beta1",
      "v1p4beta1",
      "v1p5beta1",
      "v1p7beta1",
      "v3p1beta1"
    ],
    "v1xxx": [
      "v1configuration",
      "v1management"
    ],
    "xxx_v1": [
      "datatransfer_v1", // cspell:words datatransfer
      "directory_v1",
      "reports_v1"
    ]
    */

    discoveryItems.forEach(({version}) => {
      if (typeof version !== 'string') throw "version isn't string";

      if (/^v\d+$/.test(version)) {
        options['v1']++;
        examples['v1'].push(version);
      } else if (/^v\d+(alpha|beta)$/.test(version)) {
        options['v1*']++;
        examples['v1*'].push(version);
      } else if (/^v\d+(alpha|beta)\d+$/.test(version)) {
        options['v1*1']++;
        examples['v1*1'].push(version);
      } else if (/^[a-z]+_v\d+$/.test(version)) {
        options['xxx_v1']++;
        examples['xxx_v1'].push(version);
      } else if (/^v\d+\.\d+$/.test(version)) {
        options['v1.1']++;
        examples['v1.1'].push(version);
      } else if (/^v\d+p\d+(alpha|beta)\d$/.test(version)) {
        options['v1p1*1']++;
        examples['v1p1*1'].push(version);
      } else if (/^(alpha|beta)$/.test(version)) {
        options['*']++;
        examples['*'].push(version);
      } else if (/^v\d+b\d+$/.test(version)) {
        options['v1b1']++;
        examples['v1b1'].push(version);
      } else if (/^v\d+[a-z]+$/.test(version)) {
        options['v1xxx']++;
        examples['v1xxx'].push(version);
      } else if (/^v\d+(alpha|beta)\d+a$/.test(version)) {
        options['v1*1a']++;
        examples['v1*1a'].push(version);
      } else {
        throw `${version} didn't match any pattern`;
      }
    });

    Object.values(options).forEach(count => {
      expect(count).not.toBe(0);
    });

    Object.keys(examples).forEach(pattern => {
      examples[pattern] = _.uniq(examples[pattern]).sort();
    });
    // console.log(JSON.stringify(examples, null, 2));
  });
});

it('getExtraRestDescriptions works for google ads', async () => {
  // Act
  const googleAds = await getExtraRestDescriptions(
    [getGoogleAdsRestDescription],
    proxy
  );

  // Assert
  expect(googleAds.map(x => x.restDescription.version)).toStrictEqual([
    'v4',
    'v5',
    'v6',
    'v7',
    'v8',
    'v9',
    'v10',
    'v11',
  ]);
}, 0); // performs requests to the actual server
