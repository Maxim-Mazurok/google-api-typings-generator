import _ from 'lodash';
import assert from 'assert';
import {getResourceTypeName, parseVersion} from '../src/utils';

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
      assert.equal(parseVersion(given), expected);
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
      assert.equal(getResourceTypeName(given), expected);
    });
  });
});
