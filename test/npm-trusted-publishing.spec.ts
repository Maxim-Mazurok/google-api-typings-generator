import {describe, expect, it, vi, beforeEach, afterEach} from 'vitest';
import {
  base32Decode,
  generateTotp,
  npmApiLogin,
  ensureTrustedPublishing,
  isNpmPackageNotFoundError,
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

describe('ensureTrustedPublishing', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('skips configuration when trust already exists', async () => {
    // cspell:disable-next-line
    const totpSecret = 'JBSWY3DPEHPK3PXP';
    const existingConfig = [
      {
        id: 'trust-123',
        type: 'github',
        claims: {
          repository: 'owner/repo',
          workflow_ref: {file: 'publish.yml'},
          environment: null,
        },
      },
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(existingConfig),
    });

    await ensureTrustedPublishing(
      '@scope/package',
      'owner/repo',
      'publish.yml',
      'fake-token',
      totpSecret,
    );

    // Should only have called GET (trust check), no POST
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/-/package/%40scope%2Fpackage/trust',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer fake-token',
        }),
      }),
    );
  });

  it('creates trust config when none exists', async () => {
    // cspell:disable-next-line
    const totpSecret = 'JBSWY3DPEHPK3PXP';

    globalThis.fetch = vi
      .fn()
      // First call: GET trust configs returns empty array
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      })
      // Second call: POST trust config returns 201
      .mockResolvedValueOnce({
        status: 201,
      });

    await ensureTrustedPublishing(
      '@scope/package',
      'owner/repo',
      'publish.yml',
      'fake-token',
      totpSecret,
    );

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);

    // Verify POST was called with correct body
    const postCall = vi.mocked(globalThis.fetch).mock.calls[1];
    expect(postCall[0]).toBe(
      'https://registry.npmjs.org/-/package/%40scope%2Fpackage/trust',
    );
    const postOptions = postCall[1] as RequestInit;
    expect(postOptions.method).toBe('POST');
    expect(JSON.parse(postOptions.body as string)).toEqual([
      {
        type: 'github',
        claims: {
          repository: 'owner/repo',
          workflow_ref: {file: 'publish.yml'},
        },
        permissions: ['createPackage'],
      },
    ]);
  });

  it('handles 409 conflict by deleting and recreating', async () => {
    // cspell:disable-next-line
    const totpSecret = 'JBSWY3DPEHPK3PXP';
    const existingMismatchConfig = [
      {
        id: 'trust-old',
        type: 'github',
        claims: {
          repository: 'owner/repo',
          workflow_ref: {file: 'old-workflow.yml'},
          environment: null,
        },
      },
    ];

    globalThis.fetch = vi
      .fn()
      // 1. GET trust configs - returns config with different workflow
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(existingMismatchConfig),
      })
      // 2. POST trust config - returns 409 (conflict)
      .mockResolvedValueOnce({
        status: 409,
      })
      // 3. GET trust configs (from 409 handler)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(existingMismatchConfig),
      })
      // 4. DELETE old trust config
      .mockResolvedValueOnce({
        status: 204,
      })
      // 5. POST recreate trust config
      .mockResolvedValueOnce({
        status: 201,
      });

    await ensureTrustedPublishing(
      '@scope/package',
      'owner/repo',
      'publish.yml',
      'fake-token',
      totpSecret,
    );

    expect(globalThis.fetch).toHaveBeenCalledTimes(5);

    // Verify DELETE was called
    const deleteCall = vi.mocked(globalThis.fetch).mock.calls[3];
    expect(deleteCall[0]).toBe(
      'https://registry.npmjs.org/-/package/%40scope%2Fpackage/trust/trust-old',
    );
    expect((deleteCall[1] as RequestInit).method).toBe('DELETE');
  });

  it('throws a typed error when the package does not exist yet', async () => {
    // cspell:disable-next-line
    const totpSecret = 'JBSWY3DPEHPK3PXP';

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: () => Promise.resolve('{"message":"Package not found"}'),
    });

    let thrownError: unknown;
    try {
      await ensureTrustedPublishing(
        '@scope/package',
        'owner/repo',
        'publish.yml',
        'fake-token',
        totpSecret,
      );
    } catch (error) {
      thrownError = error;
    }

    expect(isNpmPackageNotFoundError(thrownError)).toBe(true);
    expect(thrownError).toMatchObject({
      name: 'NpmPackageNotFoundError',
    });
  });
});
