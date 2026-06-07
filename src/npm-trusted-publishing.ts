import {createHmac} from 'node:crypto';

const NPM_REGISTRY_URL = 'https://registry.npmjs.org';

// === TOTP Generation (RFC 6238 / RFC 4226) === // cspell:words TOTP

export function base32Decode(encoded: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleanedInput = encoded.replace(/[\s=]+/g, '').toUpperCase();

  let bits = '';
  for (const character of cleanedInput) {
    const index = alphabet.indexOf(character);
    if (index === -1) {
      throw new Error(`Invalid base32 character: ${character}`);
    }
    bits += index.toString(2).padStart(5, '0');
  }

  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2));
  }

  return Buffer.from(bytes);
}

export function generateTotp(secret: string, period = 30, digits = 6): string {
  const key = base32Decode(secret);
  const counter = Math.floor(Date.now() / 1_000 / period);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));

  const hmac = createHmac('sha1', key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    (((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)) %
    10 ** digits;

  return code.toString().padStart(digits, '0');
}

// === npm Registry API ===

export async function npmApiLogin(
  username: string,
  password: string,
  otp: string,
): Promise<string> {
  const url = `${NPM_REGISTRY_URL}/-/user/org.couchdb.user:${encodeURIComponent(username)}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'npm-otp': otp,
    },
    body: JSON.stringify({
      _id: `org.couchdb.user:${username}`,
      name: username,
      password,
      type: 'user',
      roles: [],
      date: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`npm API login failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as {ok: boolean; token: string};
  if (!data.token) {
    throw new Error('npm API login succeeded but no token was returned');
  }

  return data.token;
}

// === Trusted Publishing Configuration ===

interface TrustConfig {
  id: string;
  type: string;
  claims: {
    repository: string;
    workflow_ref: {file: string};
    environment: string | null;
  };
}

export class NpmPackageNotFoundError extends Error {
  constructor(packageName: string, status: number, responseBody: string) {
    super(
      `Package ${packageName} does not exist in npm yet (${status}): ${responseBody}`,
    );
    this.name = 'NpmPackageNotFoundError';
  }
}

export const isNpmPackageNotFoundError = (
  error: unknown,
): error is NpmPackageNotFoundError =>
  error instanceof Error && error.name === 'NpmPackageNotFoundError';

async function getTrustConfigs(
  packageName: string,
  token: string,
  otp: string,
): Promise<TrustConfig[]> {
  const encodedName = encodeURIComponent(packageName);
  const url = `${NPM_REGISTRY_URL}/-/package/${encodedName}/trust`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'npm-otp': otp,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    if (response.status === 404) {
      throw new NpmPackageNotFoundError(packageName, response.status, text);
    }
    throw new Error(
      `Failed to get trust configs for ${packageName} (${response.status}): ${text}`,
    );
  }

  return (await response.json()) as TrustConfig[];
}

async function deleteTrustConfig(
  packageName: string,
  trustId: string,
  token: string,
  otp: string,
): Promise<void> {
  const encodedName = encodeURIComponent(packageName);
  const url = `${NPM_REGISTRY_URL}/-/package/${encodedName}/trust/${trustId}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'npm-otp': otp,
    },
  });

  if (response.status !== 204) {
    const text = await response.text();
    throw new Error(
      `Failed to delete trust config ${trustId} for ${packageName} (${response.status}): ${text}`,
    );
  }
}

async function createTrustConfig(
  packageName: string,
  repository: string,
  workflowFile: string,
  token: string,
  totpSecret: string,
): Promise<void> {
  const encodedName = encodeURIComponent(packageName);
  const url = `${NPM_REGISTRY_URL}/-/package/${encodedName}/trust`;
  const body = JSON.stringify([
    {
      type: 'github',
      claims: {
        repository,
        workflow_ref: {file: workflowFile},
      },
    },
  ]);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'npm-otp': generateTotp(totpSecret),
    },
    body,
  });

  if (response.status === 201) {
    return;
  }

  if (response.status === 409) {
    // Already exists — delete and recreate
    const configs = await getTrustConfigs(
      packageName,
      token,
      generateTotp(totpSecret),
    );
    if (configs.length > 0) {
      await deleteTrustConfig(
        packageName,
        configs[0].id,
        token,
        generateTotp(totpSecret),
      );
      const retryResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'npm-otp': generateTotp(totpSecret),
        },
        body,
      });
      if (retryResponse.status !== 201) {
        const text = await retryResponse.text();
        throw new Error(
          `Failed to recreate trust config for ${packageName} (${retryResponse.status}): ${text}`,
        );
      }
      return;
    }
  }

  const text = await response.text();
  throw new Error(
    `Failed to create trust config for ${packageName} (${response.status}): ${text}`,
  );
}

/**
 * Ensures that a package has trusted publishing configured for the given
 * GitHub repository and workflow file.
 *
 * Uses a pre-obtained npm classic token (from npmApiLogin) for API calls.
 */
export async function ensureTrustedPublishing(
  packageName: string,
  repository: string,
  workflowFile: string,
  token: string,
  totpSecret: string,
): Promise<void> {
  const checkOtp = generateTotp(totpSecret);
  const configs = await getTrustConfigs(packageName, token, checkOtp);

  const alreadyConfigured = configs.some(
    config =>
      config.type === 'github' &&
      config.claims.repository === repository &&
      config.claims.workflow_ref.file === workflowFile,
  );

  if (alreadyConfigured) {
    console.log(`Trusted publishing already configured for ${packageName}`);
    return;
  }

  console.log(`Configuring trusted publishing for ${packageName}...`);
  await createTrustConfig(
    packageName,
    repository,
    workflowFile,
    token,
    totpSecret,
  );
  console.log(`Trusted publishing configured for ${packageName}`);
}
