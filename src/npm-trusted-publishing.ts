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
