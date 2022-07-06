import assert from 'assert';
import nock from 'nock';
import {getGoogleAdsRestDescription} from '../src/extra-apis.js';

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
    const generator = getGoogleAdsRestDescription();
    const item1 = await generator.next();
    const item2 = await generator.next();
    const item3 = await generator.next();

    // Assert
    assert.deepStrictEqual(item1, {
      done: false,
      value: {
        restDescriptionSource: new URL(
          'https://googleads.googleapis.com/$discovery/rest?version=v4'
        ),
        restDescription: {
          description: 'testing v4',
        },
      },
    });
    assert.deepStrictEqual(item2, {
      done: false,
      value: {
        restDescriptionSource: new URL(
          'https://googleads.googleapis.com/$discovery/rest?version=v5'
        ),
        restDescription: {
          description: 'testing v5',
        },
      },
    });
    assert.deepStrictEqual(item3, {done: true, value: undefined});
  });
});
