import _ from 'lodash';
import {
  camelCaseToSnakeCase,
  checkExists,
  getAllNamespaces,
  getApiName,
  getChangedTypes,
  getPackageNameFromRestDescription,
  getResourceTypeName,
  hasValueRecursive,
} from '../src/utils.js';

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
    expect(getPackageNameFromRestDescription({id: 'something'})).toBe(
      'gapi.client.something'
    );
  });

  it('replaces ":" with "-"', () => {
    expect(getPackageNameFromRestDescription({id: 'some:v1'})).toBe(
      'gapi.client.some-v1'
    );
  });

  it('transforms "gamesConfiguration" to "games_configuration"', () => {
    expect(getPackageNameFromRestDescription({id: 'some:v1'})).toBe(
      'gapi.client.some-v1'
    );
  });

  it('throws when id does not exist', () => {
    expect(() =>
      getPackageNameFromRestDescription({description: 'oops'})
    ).toThrow(new Error('Expected value to be defined, but got undefined'));
  });

  it('throws when id is null', () => {
    expect(() =>
      getPackageNameFromRestDescription({id: null as unknown as string})
    ).toThrow(new Error('Expected non-null reference, but got null'));
  });

  ['oh!no', 'oh~no', 'oh(no)', 'oh*no'].map(id => {
    it(`throws when id is weird: "${id}"`, () => {
      const originalConsoleError = console.error; // TODO: properly mock/spy
      console.error = () => {};
      expect(() => getPackageNameFromRestDescription({id})).toThrow(
        new Error(`"gapi.client.${id}" is not a valid npm package name`)
      );
      console.error = originalConsoleError;
    });
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

it.todo('ensureDirectoryExists');

it.todo('getRevision');

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

describe('hasValueRecursive', () => {
  it('works', () => {
    expect(
      hasValueRecursive(
        {
          some: {
            thing: [{one: 1}, {two: 2}, {three: 3}],
          },
        },
        3
      )
    ).toBe(true);
    expect(
      hasValueRecursive(
        {
          some: {
            thing: [{one: 1}, {two: 2}, {three: 3}],
          },
        },
        '3'
      )
    ).toBe(false);
  });
});

describe('getChangedTypes', () => {
  const currentlyPublishedSheetsRevision = 20230407;
  const getLatestVersion = (packageName: string) => {
    if (packageName === '@maxim_mazurok/gapi.client.sheets-v4') {
      return Promise.resolve(`0.0.${currentlyPublishedSheetsRevision}`);
    } else if (packageName === '@maxim_mazurok/gapi.client.docs-v1') {
      return Promise.resolve('0.0.20230228');
    } else if (packageName === '@maxim_mazurok/gapi.client.sheets-v5') {
      class PackageNotFoundError extends Error {
        name = 'PackageNotFoundError';
      }
      return Promise.reject(new PackageNotFoundError());
    }

    throw new Error(`Unexpected package name: ${packageName}`);
  };
  it('works', async () => {
    // Arrange

    const allTypes = [
      {name: 'gapi.client.docs-v1', revision: 20230408}, // newer than currently published
      {
        name: 'gapi.client.sheets-v4',
        revision: currentlyPublishedSheetsRevision,
      }, // same as currently published
      {name: 'gapi.client.sheets-v5', revision: 20230407}, // not yet published
    ];

    // Act
    const result = await getChangedTypes(allTypes, getLatestVersion);

    // Assert
    expect(result).toStrictEqual([
      'gapi.client.docs-v1',
      'gapi.client.sheets-v5',
    ]);
  });
});
