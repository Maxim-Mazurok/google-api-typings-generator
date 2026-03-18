/**
 * Integration test for npm trusted publishing.
 *
 * This test verifies the npm API login against the real npm registry.
 * It requires real credentials and should be run manually, not in CI.
 *
 * Required environment variables:
 *   NPM_USERNAME - your npm username
 *   NPM_PASSWORD - your npm password
 *   NPM_TOTP_SECRET - your TOTP seed (base32) // cspell:words TOTP
 *
 * Usage:
 *   NPM_USERNAME=... NPM_PASSWORD=... NPM_TOTP_SECRET=... npx vitest --run test/npm-trusted-publishing.integration.spec.ts
 */

import {describe, expect, it} from 'vitest';
import {generateTotp, npmApiLogin} from '../src/npm-trusted-publishing.js';

const hasCredentials =
  process.env.NPM_USERNAME &&
  process.env.NPM_PASSWORD &&
  process.env.NPM_TOTP_SECRET;

describe.skipIf(!hasCredentials)('npm trusted publishing integration', () => {
  it('can login to npm and get a token', async () => {
    const otp = generateTotp(process.env.NPM_TOTP_SECRET!);
    const token = await npmApiLogin(
      process.env.NPM_USERNAME!,
      process.env.NPM_PASSWORD!,
      otp,
    );
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    console.log(
      'Login successful, got token starting with:',
      token.slice(0, 8),
    );
  });
});
