import assert from 'assert';
import {ProxySetting} from 'get-proxy-settings';
import nock from 'nock';
import {getGoogleAdsRestDescription} from '../src/extra-apis.js';

let proxy: ProxySetting | undefined;

describe('discovery', () => {
  it('getGoogleAdsRestDescription works', async () => {
    // Arrange
    nock('https://googleads.googleapis.com')
      .get('/$discovery/rest')
      .query({version: 'v4'})
      .reply(200, {
        description: 'testing v4',
      })

      .get('/$discovery/rest')
      .query({version: 'v5'})
      .reply(200, {
        description: 'testing v5',
      })

      .get('/$discovery/rest')
      .query({version: 'v6'})
      .reply(404);

    // Act
    const generator = getGoogleAdsRestDescription(proxy);
    const item1 = await generator.next();
    const item2 = await generator.next();
    const item3 = await generator.next();

    // Assert
    assert.deepStrictEqual(item1, {
      done: false,
      value: {
        description: 'testing v4',
        discoveryRestUrl:
          'https://googleads.googleapis.com/$discovery/rest?version=v4',
      },
    });
    assert.deepStrictEqual(item2, {
      done: false,
      value: {
        description: 'testing v5',
        discoveryRestUrl:
          'https://googleads.googleapis.com/$discovery/rest?version=v5',
      },
    });
    assert.deepStrictEqual(item3, {done: true, value: undefined});
  });
});
