import _ from 'lodash';
import assert from 'assert';
import {
  getResourceTypeName,
  getTypeDirectoryName,
  parseVersion,
  sleep,
} from '../src/utils';

describe('parseVersion', () => {
  const expectations = {
    v1: '1.0',
    'v1.2': '1.2',
    'v1.2beta3': '1.2',
    vm_beta: '0.0',
    invalid: '0.0',
  };

  _.forEach(expectations, (expected, given) => {
    it(`should parse: ${given}`, () => {
      assert.strictEqual(parseVersion(given), expected);
    });
  });
});

describe('getResourceTypeName', () => {
  const expectations = {
    marketplaceprivateauction: 'MarketplaceprivateauctionResource',
    marketplacePrivateAuction: 'MarketplacePrivateAuctionResource',
    'marketplace-privateauction': 'MarketplacePrivateauctionResource',
    'marketplace-private-auction': 'MarketplacePrivateAuctionResource',
  };

  _.forEach(expectations, (expected, given) => {
    it(`should convert: ${given}`, () => {
      assert.strictEqual(getResourceTypeName(given), expected);
    });
  });
});

describe('getTypeDirectory', () => {
  describe('no version', () => {
    it('should return name', () => {
      assert.strictEqual('gapi.client.API', getTypeDirectoryName('API'));
    });
  });
});

describe('sleep', () => {
  it('about 10ms', () => {
    const t1 = process.hrtime();
    sleep(10);
    const [, nanoseconds] = process.hrtime(t1);
    assert(9_000_000 < nanoseconds); // more than 9ms
    assert(11_000_000 > nanoseconds); // less than 11ms
  });
});
