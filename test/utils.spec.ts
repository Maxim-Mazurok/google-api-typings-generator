import _ from 'lodash';
import assert from 'assert';
import {
  checkExists,
  getResourceTypeName,
  getTypeDirectoryName,
  parseVersion,
  sleep,
} from '../src/utils.js';

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
    marketplaceprivateauction: 'MarketplaceprivateauctionResource', // cspell:disable-line
    marketplacePrivateAuction: 'MarketplacePrivateAuctionResource',
    'marketplace-privateauction': 'MarketplacePrivateauctionResource', // cspell:disable-line
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
  it('about 1s', () => {
    const start = process.hrtime.bigint();
    sleep(1);
    const end = process.hrtime.bigint();
    const sleptForNanoseconds = end - start;
    assert(900000000 < sleptForNanoseconds); // more than 0.5s
    assert(2000000000 > sleptForNanoseconds); // less than 2s
  });
});

describe('checkExists', () => {
  it('returns when exists', () => {
    // Arrange
    const value = 'some string';
    const object = {value};

    // Act
    const result = checkExists(object.value);

    // Assert
    assert.strictEqual(result, value);
  });

  it('throws when does not exist', () => {
    // Arrange
    const object = {value: null};
    const bindCheckExists = () => checkExists(object.value);

    // Act & Assert
    assert.throws(
      bindCheckExists,
      new Error('Expected non-null reference, but got null')
    );
  });
});
