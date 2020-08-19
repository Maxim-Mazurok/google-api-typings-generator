import assert from 'assert';
import {supportedApis} from '../bin/auto-update/config';
import {excludedApis} from '../src/app';

describe('Config validation', () => {
  it('Excluded and supported APIs should not intersect', () => {
    const intersect = supportedApis.some(supportedApi =>
      excludedApis.includes(supportedApi)
    );
    assert.strictEqual(intersect, false);
  });
});
