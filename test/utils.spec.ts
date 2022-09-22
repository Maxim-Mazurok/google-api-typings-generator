import _ from 'lodash';
import {
  camelCaseToSnakeCase,
  checkExists,
  getAllNamespaces,
  getApiName,
  getPackageName,
  getResourceTypeName,
  parseVersionLegacy,
  parseVersion,
  sleep,
  isLatestOrPreferredVersion,
  getPackageNameLegacy,
} from '../src/utils.js';
import {
  DiscoveryItem,
  RestDescriptionExtended,
  restDescriptionExtendedToDiscoveryItem,
} from '../src/discovery.js';

describe('parseVersionLegacy', () => {
  const expectations = {
    v1: {major: 1, minor: 0},
    v7: {major: 7, minor: 0},
    v12: {major: 12, minor: 0},
    'v1.2': {major: 1, minor: 2},
    'v1.2beta3': {major: 1, minor: 2},
    vm_beta: {major: 0, minor: 0},
    invalid: {major: 0, minor: 0},
  };

  _.forEach(expectations, (expected, given) => {
    it(`should parse: ${given}`, () => {
      expect(parseVersionLegacy(given)).toStrictEqual(expected);
    });
  });
});

describe('isLatestOrPreferredVersion', () => {
  [true, false].map(isPreferred =>
    it(`works for preferred=${isPreferred}`, () => {
      // arrange
      const restDescriptionExtended: RestDescriptionExtended = {
        discoveryItem: {
          preferred: isPreferred,
        },
        restDescription: {},
        restDescriptionSource: new URL('http://x.com'),
      };
      const discoveryItems: DiscoveryItem[] = [];

      // act
      const result = isLatestOrPreferredVersion(
        restDescriptionExtended,
        discoveryItems
      );

      // assert
      expect(result).toBe(isPreferred);
    })
  );
  it('works for extra when only one has a given name', () => {
    // arrange
    const restDescriptionExtended: RestDescriptionExtended = {
      restDescription: {name: 'my-api'},
      restDescriptionSource: new URL('http://x.com'),
    };
    restDescriptionExtended.discoveryItem =
      restDescriptionExtendedToDiscoveryItem(restDescriptionExtended);
    const discoveryItems: DiscoveryItem[] = [
      {
        name: 'another-api',
      },
      {...restDescriptionExtended.discoveryItem},
      {
        name: 'yet-another-api',
      },
    ];

    // act
    const result = isLatestOrPreferredVersion(
      restDescriptionExtended,
      discoveryItems
    );

    // assert
    expect(result).toBe(true);
  });
  it('works for extra when larger minor', () => {
    // arrange
    const name = 'my-api';
    const restDescriptionExtended: RestDescriptionExtended = {
      restDescription: {name, version: 'v1.3'},
      restDescriptionSource: new URL('http://x.com'),
    };
    restDescriptionExtended.discoveryItem =
      restDescriptionExtendedToDiscoveryItem(restDescriptionExtended);
    const discoveryItems: DiscoveryItem[] = [
      {
        name,
        version: 'v1.2',
      },
      {...restDescriptionExtended.discoveryItem},
      {
        name,
        version: 'v1.1',
      },
    ];

    // act
    const result = isLatestOrPreferredVersion(
      restDescriptionExtended,
      discoveryItems
    );

    // assert
    expect(result).toBe(true);
  });
  it('works for extra when larger major', () => {
    // arrange
    const name = 'my-api';
    const restDescriptionExtended: RestDescriptionExtended = {
      restDescription: {name, version: 'v12'},
      restDescriptionSource: new URL('http://x.com'),
    };
    restDescriptionExtended.discoveryItem =
      restDescriptionExtendedToDiscoveryItem(restDescriptionExtended);
    const discoveryItems: DiscoveryItem[] = [
      {
        name,
        version: 'v7',
      },
      {...restDescriptionExtended.discoveryItem},
      {
        name,
        version: 'v11',
      },
    ];

    // act
    const result = isLatestOrPreferredVersion(
      restDescriptionExtended,
      discoveryItems
    );

    // assert
    expect(result).toBe(true);
  });
  it('works for extra when smaller minor', () => {
    // arrange
    const name = 'my-api';
    const restDescriptionExtended: RestDescriptionExtended = {
      restDescription: {name, version: 'v1.2'},
      restDescriptionSource: new URL('http://x.com'),
    };
    restDescriptionExtended.discoveryItem =
      restDescriptionExtendedToDiscoveryItem(restDescriptionExtended);
    const discoveryItems: DiscoveryItem[] = [
      {
        name,
        version: 'v1.1',
      },
      {...restDescriptionExtended.discoveryItem},
      {
        name,
        version: 'v1.3',
      },
    ];

    // act
    const result = isLatestOrPreferredVersion(
      restDescriptionExtended,
      discoveryItems
    );

    // assert
    expect(result).toBe(false);
  });
});

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
      expect(parseVersion(given)).toBe(expected);
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
      expect(getResourceTypeName(given)).toBe(expected);
    });
  });
});

describe('sleep', () => {
  it('about 1s', () => {
    const start = process.hrtime.bigint();
    sleep(1);
    const end = process.hrtime.bigint();
    const sleptForNanoseconds = end - start;
    expect(sleptForNanoseconds).toBeGreaterThan(900000000); // more than 0.5s
    expect(sleptForNanoseconds).toBeLessThan(2000000000); // less than 2s
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
    expect(result).toBe(value);
  });

  it('throws when null', () => {
    // Arrange
    const object = {value: null};
    const bindCheckExists = () => checkExists(object.value);

    // Act & Assert
    expect(bindCheckExists).toThrow(
      new Error('Expected non-null reference, but got null')
    );
  });

  it('throws when undefined', () => {
    // Arrange
    const object = {value: undefined};
    const bindCheckExists = () => checkExists(object.value);

    // Act & Assert
    expect(bindCheckExists).toThrow(
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

    expect(result).toStrictEqual(['firstNamespace', 'secondNamespace']);
  });

  it('throws when no dots in ID', () => {
    expect(() =>
      getAllNamespaces({
        methods: {
          firstMethod: {
            id: 'firstNamespaceFirstMethod',
          },
        },
      })
    ).toThrow(
      new Error('Malformed method ID: firstNamespaceFirstMethod (no dots)')
    );
  });

  it('throws when namespace is empty', () => {
    expect(() =>
      getAllNamespaces({
        methods: {
          firstMethod: {
            id: '.firstMethod',
          },
        },
      })
    ).toThrow(new Error("Can't get namespace from .firstMethod"));
  });

  it('throws when no id', () => {
    expect(() =>
      getAllNamespaces({
        methods: {
          firstMethod: {
            description: 'no id :(',
          },
        },
      })
    ).toThrow(new Error('Method firstMethod has no ID'));
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

    expect(result).toStrictEqual(['a', 'b', 'd', 'f']);
  });
});

describe('getPackageName', () => {
  it('works when id exists', () => {
    expect(getPackageName({id: 'something'})).toBe('gapi.client.something');
  });

  it('replaces ":" with "-"', () => {
    expect(getPackageName({id: 'some:v1'})).toBe('gapi.client.some-v1');
  });

  it('transforms "gamesConfiguration" to "games_configuration"', () => {
    expect(getPackageName({id: 'some:v1'})).toBe('gapi.client.some-v1');
  });

  it('throws when id does not exist', () => {
    expect(() => getPackageName({description: 'oops'})).toThrow(
      new Error('Expected value to be defined, but got undefined')
    );
  });

  it('throws when id is null', () => {
    expect(() => getPackageName({id: null as unknown as string})).toThrow(
      new Error('Expected non-null reference, but got null')
    );
  });

  ['oh!no', 'oh~no', 'oh(no)', 'oh*no'].map(id => {
    it(`throws when id is weird: "${id}"`, () => {
      const originalConsoleError = console.error; // TODO: properly mock/spy
      console.error = () => {};
      expect(() => getPackageName({id})).toThrow(
        new Error(`"gapi.client.${id}" is not a valid npm package name`)
      );
      console.error = originalConsoleError;
    });
  });
});

describe('getPackageNameLegacy', () => {
  it('works', () => {
    expect(getPackageNameLegacy({name: 'test'})).toBe('gapi.client.test');
    expect(getPackageNameLegacy({name: 'youtubeAnalytics'})).toBe(
      // cspell:words youtubeanalytics
      'gapi.client.youtubeanalytics'
    );
  });
});

describe('getApiName', () => {
  it('works when id exists', () => {
    expect(getApiName({id: 'something'})).toBe('something');
  });

  it('replaces ":" with "-"', () => {
    expect(getApiName({id: 'some:v1'})).toBe('some-v1');
  });

  it('transforms "gamesConfiguration" to "games_configuration"', () => {
    expect(getApiName({id: 'some:v1'})).toBe('some-v1');
  });

  it('throws when id does not exist', () => {
    expect(() => getApiName({description: 'oops'})).toThrow(
      new Error('Expected value to be defined, but got undefined')
    );
  });

  it('throws when id is null', () => {
    expect(() => getApiName({id: null as unknown as string})).toThrow(
      new Error('Expected non-null reference, but got null')
    );
  });
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
      expect(camelCaseToSnakeCase(from)).toBe(to);
    });
  });
});
