import {supportedApis} from '../bin/auto-publish/config.js';
import {excludedRestDescriptionIds} from '../src/app.js';

describe('Config validation', () => {
  it('Excluded and supported APIs should not overlap', () => {
    const overlap = supportedApis.some(supportedApi =>
      excludedRestDescriptionIds.includes(supportedApi)
    );
    expect(overlap).toBe(false);
  });
});
