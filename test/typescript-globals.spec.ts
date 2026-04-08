import {describe, expect, it} from 'vitest';
import {extractTypescriptGlobalTypeNames} from '../src/typescript-globals.js';

describe('extractTypescriptGlobalTypeNames', () => {
  it('includes known global types that conflict with Google API schemas', () => {
    const globalTypeNames = extractTypescriptGlobalTypeNames();

    // These are the types we've seen Google APIs actually shadow
    // (or could realistically shadow), and that the generator needs
    // workarounds for:
    expect(globalTypeNames.has('Array')).toBe(true);
    expect(globalTypeNames.has('Record')).toBe(true);
    expect(globalTypeNames.has('Request')).toBe(true);
    expect(globalTypeNames.has('Promise')).toBe(true);
    expect(globalTypeNames.has('Error')).toBe(true);
    expect(globalTypeNames.has('Event')).toBe(true);
    expect(globalTypeNames.has('Node')).toBe(true);
    expect(globalTypeNames.has('Response')).toBe(true);
    expect(globalTypeNames.has('URL')).toBe(true);
  });

  it('excludes TypeScript compiler API types (only lib files)', () => {
    const globalTypeNames = extractTypescriptGlobalTypeNames();

    // These come from TypeScript's own index.d.ts, not lib files
    expect(globalTypeNames.has('BlockStatement')).toBe(false);
    expect(globalTypeNames.has('CachePolicy')).toBe(false);
    expect(globalTypeNames.has('ChainExpression')).toBe(false);
  });

  it('returns a reasonable number of types', () => {
    const globalTypeNames = extractTypescriptGlobalTypeNames();

    // Should have a substantial number of types from all lib files
    // but not an unreasonable amount (would suggest we're picking up
    // non-lib files like the TS compiler API)
    expect(globalTypeNames.size).toBeGreaterThan(500);
    expect(globalTypeNames.size).toBeLessThan(3000);
  });
});
