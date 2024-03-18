import nock from 'nock';
import {getGoogleAdsRestDescription, startingVersion} from '../src/extra-apis';

describe('discovery', () => {
  it('getGoogleAdsRestDescription works', async () => {
    // Arrange
    nock('https://googleads.googleapis.com')
      .get('/$discovery/rest')
      .query({version: `v${startingVersion}`})
      .reply(404)

      .get('/$discovery/rest')
      .query({version: `v${startingVersion + 1}`})
      .reply(200, {
        description: `testing v${startingVersion + 1}`,
      })

      .get('/$discovery/rest')
      .query({version: `v${startingVersion + 2}`})
      .reply(200, {
        description: `testing v${startingVersion + 2}`,
      })

      .get('/$discovery/rest')
      .query({version: `v${startingVersion + 3}`})
      .reply(404);

    // Act
    const generator = getGoogleAdsRestDescription();
    const item1 = await generator.next();
    const item2 = await generator.next();
    const item3 = await generator.next();

    // Assert
    expect(item1).toStrictEqual({
      done: false,
      value: {
        restDescriptionSource: new URL(
          `https://googleads.googleapis.com/$discovery/rest?version=v${
            startingVersion + 1
          }`
        ),
        restDescription: {
          description: `testing v${startingVersion + 1}`,
        },
      },
    });
    expect(item2).toStrictEqual({
      done: false,
      value: {
        restDescriptionSource: new URL(
          `https://googleads.googleapis.com/$discovery/rest?version=v${
            startingVersion + 2
          }`
        ),
        restDescription: {
          description: `testing v${startingVersion + 2}`,
        },
      },
    });
    expect(item3).toStrictEqual({done: true, value: undefined});
  });

  it('getGoogleAdsRestDescription stops looking after a while', async () => {
    // Arrange
    nock('https://googleads.googleapis.com')
      .get('/$discovery/rest')
      .query({version: /v\d+/})
      .reply(404)
      .persist();

    // Act
    const generator = getGoogleAdsRestDescription();
    const testFunction = async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await generator.next();
      }
    };

    // Assert
    await expect(testFunction()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"We tried to fetch Google Ads Rest Descriptions for v${startingVersion} to v${
        startingVersion + 50
      } and all returned 404. This is suspicious..."`
    );
  });
});
