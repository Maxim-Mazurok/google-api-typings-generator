import {ProxySetting} from 'get-proxy-settings';
import _ from 'lodash';
import assert from 'node:assert';
import {existsSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import http, {Server} from 'node:http';
import {join} from 'node:path';
import {
  DiscoveryItem,
  getAllDiscoveryItems,
  getExtraRestDescriptions,
  getRestDescriptionIfPossible,
} from '../src/discovery.js';
import {getGoogleAdsRestDescription} from '../src/extra-apis.js';
import {getPackageNameFromRestDescription, getProxy} from '../src/utils.js';

let proxy: ProxySetting | undefined;

const apiHttpHost = 'localhost';
let apiPort: number;
let apiServer: Server;

beforeAll(async () => {
  proxy = await getProxy();
});

describe('getRestDescriptionIfPossible', () => {
  beforeAll(async () => {
    const getPort = (await import('get-port')).default;
    apiPort = await getPort();
    apiServer = http // TODO: @low-value @medium-cost Replace with MSW?
      .createServer((request, response) => {
        if (request.url === '/status/402') {
          response.writeHead(402);
        } else if (request.url === '/status/403') {
          response.writeHead(403);
        } else if (request.url === '/status/404') {
          response.writeHead(404);
        } else {
          throw new Error(`Unexpected request.url: ${request.url}`);
        }
        response.end();
      })
      .listen(
        apiPort,
        () =>
          process.env.DEBUG &&
          console.log(`api listening on ${apiHttpHost}:${apiPort}`),
      );
  });
  afterAll(() => {
    apiServer.close();
    if (process.env.DEBUG) console.log('close apiServer');
  });
  ['403', '404'].map(httpStatusCode =>
    it(`resolves on ${httpStatusCode} and logs warning`, async () => {
      const originalConsoleWarn = console.warn; // TODO: @low-value @low-cost Properly mock/spy
      let consoleWarnCalledWith;
      console.warn = (...args) => (consoleWarnCalledWith = args);
      await getRestDescriptionIfPossible(
        new URL(`http://${apiHttpHost}:${apiPort}/status/${httpStatusCode}`),
        proxy,
      );
      console.warn = originalConsoleWarn;

      expect(consoleWarnCalledWith).toStrictEqual([
        `http://${apiHttpHost}:${apiPort}/status/${httpStatusCode} returned ${httpStatusCode}, skipping...`,
      ]);
    }),
  );
  it('rejects on non-404 and non-403', async () => {
    const promise = getRestDescriptionIfPossible(
      new URL(`http://${apiHttpHost}:${apiPort}/status/402`),
      proxy,
    );

    await assert.rejects(promise);
  }, 10_000);
});

describe('discovery items', () => {
  let discoveryItems: DiscoveryItem[] = [];

  beforeAll(async () => {
    const cacheFilePath = join(
      import.meta.dirname,
      'discovery-items-cache.json',
    );
    if (
      existsSync(cacheFilePath) &&
      Date.now() - statSync(cacheFilePath).mtimeMs < 60 * 60 * 1000 // 1 hour
    ) {
      discoveryItems = JSON.parse(readFileSync(cacheFilePath, 'utf-8'));
    } else {
      discoveryItems = await getAllDiscoveryItems(proxy);
      writeFileSync(cacheFilePath, JSON.stringify(discoveryItems, null, 2), {
        encoding: 'utf-8',
      });
    }
  }, 15_000);

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
      const name = getPackageNameFromRestDescription(discoveryItem);
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
    // cspell:words abcdefghijklmnopqrstuvwxyz
    const versions: string[] = [];
    discoveryItems.forEach(({version}) => {
      const originalVersion = version;
      if (version?.includes('*') || version?.includes('xxx'))
        throw '* or xxx in version';

      version = version?.replace(/\d+/g, '1');
      version = version?.replace(/alpha/g, '*');
      version = version?.replace(/beta/g, '*');
      version = version?.replace(/[abcdefghijklmnopqrstuvwxyz]{2,}/g, 'xxx');
      if (!versions.includes(version as string)) {
        console.log({version, originalVersion});
        versions.push(version as string);
      }

      // v1
      // v4.1
      // v1alpha
      // v1beta
      // v1beta1
      // directory_v1
      // accounts_v1beta
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
      'xxx_v1*',
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
      'xxx_v1*': 0,
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
      'xxx_v1*': [],
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
    ],
    "xxx_v1*": [
      "accounts_v1beta",
      "conversions_v1beta",
      "datasources_v1beta", // cspell:words datasources
      "inventories_v1beta",
      "lfp_v1beta",
      "notifications_v1beta",
      "products_v1beta",
      "promotions_v1beta",
      "quota_v1beta",
      "reports_v1beta"
    ],
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
      } else if (/^[a-z]{2,}_v\d+(alpha|beta)$/.test(version)) {
        options['xxx_v1*']++;
        examples['xxx_v1*'].push(version);
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
  // Arrange & Act
  const googleAds = await getExtraRestDescriptions(
    [getGoogleAdsRestDescription],
    proxy,
  );

  // Assert
  expect(googleAds.length).toBeGreaterThan(0);
}, 30000); // performs requests to the actual server
