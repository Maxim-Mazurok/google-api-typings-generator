import {describe, expect, it, vi, beforeEach, afterEach} from 'vitest';
import {
  base32Decode,
  generateTotp,
  npmApiLogin,
} from '../src/npm-trusted-publishing.js';

describe('base32Decode', () => {
  it('decodes the RFC 6238 test secret correctly', () => {
    // cspell:disable-next-line
    const result = base32Decode('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');
    expect(result.toString('utf8')).toBe('12345678901234567890');
  });

  it('decodes a short known value', () => {
    // "f" = 0x66, base32 encoded as "MY"
    const result = base32Decode('MY');
    expect(result).toEqual(Buffer.from([0x66]));
  });

  it('handles lowercase input', () => {
    // cspell:disable-next-line
    const result = base32Decode('gezdgnbvgy3tqojqgezdgnbvgy3tqojq');
    expect(result.toString('utf8')).toBe('12345678901234567890');
  });

  it('handles padding characters', () => {
    // cspell:disable-next-line
    const result = base32Decode('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ====');
    expect(result.toString('utf8')).toBe('12345678901234567890');
  });

  it('handles whitespace', () => {
    // cspell:disable-next-line
    const result = base32Decode('GEZD GNBV GY3T QOJQ GEZD GNBV GY3T QOJQ');
    expect(result.toString('utf8')).toBe('12345678901234567890');
  });

  it('throws on invalid characters', () => {
    expect(() => base32Decode('INVALID!')).toThrow(
      'Invalid base32 character: !',
    );
  });
});

describe('generateTotp', () => {
  it('generates a 6-digit string', () => {
    // cspell:disable-next-line
    const secret = 'JBSWY3DPEHPK3PXP';
    const otp = generateTotp(secret);
    expect(otp).toMatch(/^\d{6}$/);
  });

  it('generates consistent output for the same time window', () => {
    // cspell:disable-next-line
    const secret = 'JBSWY3DPEHPK3PXP';
    const firstOtp = generateTotp(secret);
    const secondOtp = generateTotp(secret);
    // Within the same 30-second window, should produce the same code
    expect(firstOtp).toBe(secondOtp);
  });

  it('pads short codes with leading zeros', () => {
    // cspell:disable-next-line
    const secret = 'JBSWY3DPEHPK3PXP';
    const otp = generateTotp(secret);
    expect(otp.length).toBe(6);
  });

  it('generates correct OTP for RFC 6238 test vector', () => {
    // RFC 6238 test vector: time = 59, secret = "12345678901234567890" (ASCII)
    // cspell:disable-next-line
    const secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

    // Mock Date.now to return a specific time
    const originalDateNow = Date.now;
    Date.now = () => 59 * 1_000; // t=59s, counter = floor(59/30) = 1

    try {
      const otp = generateTotp(secret);
      // At counter=1, the expected OTP for SHA1 is '287082'
      expect(otp).toBe('287082');
    } finally {
      Date.now = originalDateNow;
    }
  });
});

describe('npmApiLogin', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns a token on successful login', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ok: true, token: 'npm_test_token_123'}),
    });

    const token = await npmApiLogin('test-user', 'test-password', '123456'); // cspell:words test-user test-password
    expect(token).toBe('npm_test_token_123');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/-/user/org.couchdb.user:test-user',
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'npm-otp': '123456',
        }),
      }),
    );
  });

  it('throws on failed login', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve('Unauthorized'),
    });

    await expect(
      npmApiLogin('test-user', 'bad-password', '123456'),
    ).rejects.toThrow('npm API login failed (401): Unauthorized');
  });

  it('throws when no token in response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ok: true}),
    });

    await expect(
      npmApiLogin('test-user', 'test-password', '123456'),
    ).rejects.toThrow('npm API login succeeded but no token was returned');
  });
});
