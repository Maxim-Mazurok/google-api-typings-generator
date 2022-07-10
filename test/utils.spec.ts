import _ from 'lodash';
import assert from 'assert';
import {
  camelCaseToSnakeCase,
  checkExists,
  getAllNamespaces,
  getPackageName,
  getResourceTypeName,
  parseVersion,
  sleep,
} from '../src/utils.js';

describe('parseVersion', () => {
  const expectations = {
    v11: '0.0',
    'v1.2': '0.0',
    'v1.2beta3': '0.0',
    vm_beta: '0.0',
    invalid: '0.0',

    // patterns from `versions match all patterns` test

    // *
    alpha: '0.0',
    beta: '0.0',
    // v1
    v1: '0.0',
    v2: '0.0',
    v3: '0.0',
    v4: '0.0',
    v5: '0.0',
    // v1*
    v1alpha: '0.0',
    v1beta: '0.0',
    v2alpha: '0.0',
    v2beta: '0.0',
    // v1*1
    v1alpha1: '0.0',
    v1alpha2: '0.0',
    v1beta1: '0.0',
    v1beta2: '0.0',
    v1beta3: '0.0',
    v1beta4: '0.0',
    v2alpha1: '0.0',
    v2beta1: '0.0',
    v2beta2: '0.0',
    v2beta3: '0.0',
    v3beta1: '0.0',
    // v1*1a
    v1beta1a: '0.0',
    // v1.1
    'v1.1': '0.0',
    'v2.1': '0.0',
    'v3.5': '0.0',
    'v4.1': '0.0',
    // v1b1
    v1b3: '0.0',
    // v1p1*1
    v1p1beta1: '0.0',
    v1p2beta1: '0.0',
    v1p3beta1: '0.0',
    v1p4beta1: '0.0',
    v1p5beta1: '0.0',
    v1p7beta1: '0.0',
    v3p1beta1: '0.0',
    // v1xxx
    v1configuration: '0.0',
    v1management: '0.0',
    // xxx_v1
    datatransfer_v1: '0.0', // cspell:words datatransfer
    directory_v1: '0.0',
    reports_v1: '0.0',
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

  it('throws when null', () => {
    // Arrange
    const object = {value: null};
    const bindCheckExists = () => checkExists(object.value);

    // Act & Assert
    assert.throws(
      bindCheckExists,
      new Error('Expected non-null reference, but got null')
    );
  });

  it('throws when undefined', () => {
    // Arrange
    const object = {value: undefined};
    const bindCheckExists = () => checkExists(object.value);

    // Act & Assert
    assert.throws(
      bindCheckExists,
      new Error('Expected value to be defined, but got undefined')
    );
  });
});

describe('getAllNamespaces', () => {
  it('works', () => {
    const result = getAllNamespaces({
      methods: {
        firstMethod: {
          id: 'firstNamespace.firstMethod',
        },
        secondMethod: {
          id: 'secondNamespace.secondMethod',
        },
      },
    });

    assert.deepStrictEqual(result, ['firstNamespace', 'secondNamespace']);
  });

  it('throws when no dots in ID', () => {
    assert.throws(
      () =>
        getAllNamespaces({
          methods: {
            firstMethod: {
              id: 'firstNamespaceFirstMethod',
            },
          },
        }),
      new Error('Malformed method ID: firstNamespaceFirstMethod (no dots)')
    );
  });

  it('throws when namespace is empty', () => {
    assert.throws(
      () =>
        getAllNamespaces({
          methods: {
            firstMethod: {
              id: '.firstMethod',
            },
          },
        }),
      new Error("Can't get namespace from .firstMethod")
    );
  });

  it('throws when no id', () => {
    assert.throws(
      () =>
        getAllNamespaces({
          methods: {
            firstMethod: {
              description: 'no id :(',
            },
          },
        }),
      new Error('Method firstMethod has no ID')
    );
  });

  it('works deep', () => {
    const result = getAllNamespaces({
      methods: {
        a: {
          id: 'a.a',
        },
        b: {
          id: 'b.b',
        },
      },
      resources: {
        c: {
          methods: {
            d: {
              id: 'd.d',
            },
          },
          resources: {
            e: {
              methods: {
                f: {
                  id: 'f.f',
                },
              },
            },
          },
        },
      },
    });

    assert.deepStrictEqual(result, ['a', 'b', 'd', 'f']);
  });
});

describe('getPackageName', () => {
  it('works when id exists', () => {
    assert.strictEqual(
      getPackageName({id: 'something'}),
      'gapi.client.something'
    );
  });

  it('replaces ":" with "-"', () => {
    assert.strictEqual(getPackageName({id: 'some:v1'}), 'gapi.client.some-v1');
  });

  it('transforms "gamesConfiguration" to "games_configuration"', () => {
    assert.strictEqual(getPackageName({id: 'some:v1'}), 'gapi.client.some-v1');
  });

  it('throws when id does not exist', () => {
    assert.throws(
      () => getPackageName({description: 'oops'}),
      new Error('Expected value to be defined, but got undefined')
    );
  });

  it('throws when id is null', () => {
    assert.throws(
      () => getPackageName({id: null as unknown as string}),
      new Error('Expected non-null reference, but got null')
    );
  });

  const originalConsoleError = console.error; // TODO: properly mock/spy
  console.error = () => {};
  ['oh!no', 'oh~no', 'oh(no)', 'oh*no'].map(id => {
    it(`throws when id is weird: "${id}"`, () => {
      assert.throws(
        () => getPackageName({id}),
        new Error(`"gapi.client.${id}" is not a valid npm package name`)
      );
    });
  });
  console.error = originalConsoleError;
});

describe.skip('ensureDirectoryExists', () => {
  // TODO
});

describe.skip('getRevision', () => {
  // TODO
});

describe('camelCaseToSnakeCase', () => {
  [
    ['StackOverflow', 'stack_overflow'],
    ['camelCase', 'camel_case'],
    ['alllowercase', 'alllowercase'], // cspell:words alllowercase
    ['ALLCAPITALLETTERS', 'allcapitalletters'], // cspell:words allcapitalletters
    ['CustomXMLParser', 'custom_xml_parser'],
    ['APIFinder', 'api_finder'],
    ['JSONResponseData', 'json_response_data'],
    ['Person20Address', 'person20_address'],
    ['UserAPI20Endpoint', 'user_api20_endpoint'],
  ].map(([from, to]) => {
    it(`transforms "${from}" to "${to}"`, () => {
      assert.strictEqual(camelCaseToSnakeCase(from), to);
    });
  });
});
