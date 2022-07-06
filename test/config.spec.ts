import assert from 'assert';
import {supportedApis} from '../bin/auto-publish/config.js';
import {excludedApis} from '../src/app.js';

describe('Config validation', () => {
  it('Excluded and supported APIs should not overlap', () => {
    const overlap = supportedApis.some(supportedApi =>
      excludedApis.includes(supportedApi)
    );
    assert.strictEqual(overlap, false);
  });
});
