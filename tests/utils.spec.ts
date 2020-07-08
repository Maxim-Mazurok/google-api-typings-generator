import _ from 'lodash';
import assert from 'assert';
import {
  getResourceTypeName,
  getTypeDirectory,
  parseVersion,
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
      assert.strictEqual('gapi.client.API', getTypeDirectory('API', null));
    });
  });

  describe('with version', () => {
    it('should return name', () => {
      assert.strictEqual('gapi.client.API/v1', getTypeDirectory('API', 'v1'));
    });
  });
});
