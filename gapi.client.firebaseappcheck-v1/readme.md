# TypeScript typings for Firebase App Check API v1

Firebase App Check works alongside other Firebase services to help protect your backend resources from abuse, such as billing fraud or phishing.
For detailed description please check [documentation](https://firebase.google.com/docs/app-check).

## Installing

Install typings for Firebase App Check API:

```
npm install @types/gapi.client.firebaseappcheck-v1 --save-dev
```

## Usage

You need to initialize Google API client in your code:

```typescript
gapi.load('client', () => {
  // now we can use gapi.client
  // ...
});
```

Then load api client wrapper:

```typescript
gapi.client.load(
  'https://firebaseappcheck.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.firebaseappcheck
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebaseappcheck', 'v1', () => {
  // now we can use:
  // gapi.client.firebaseappcheck
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View and administer all your Firebase data and settings
    'https://www.googleapis.com/auth/firebase',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  },
);
```

After that you can use Firebase App Check API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Returns a public JWK set as specified by [RFC 7517](https://tools.ietf.org/html/rfc7517) that can be used to verify App Check tokens. Exactly one of the public keys in the returned set will successfully validate any App Check token that is currently valid.
*/
await gapi.client.firebaseappcheck.jwks.get({name: 'name'});

/*
Accepts an App Attest assertion and an artifact previously obtained from ExchangeAppAttestAttestation and verifies those with Apple. If valid, returns an AppCheckToken.
*/
await gapi.client.firebaseappcheck.oauthClients.exchangeAppAttestAssertion({
  app: 'app',
});

/*
Accepts an App Attest CBOR attestation and verifies it with Apple using your preconfigured team and bundle IDs. If valid, returns an attestation artifact that can later be exchanged for an AppCheckToken using ExchangeAppAttestAssertion. For convenience and performance, this method's response object will also contain an AppCheckToken (if the verification is successful).
*/
await gapi.client.firebaseappcheck.oauthClients.exchangeAppAttestAttestation({
  app: 'app',
});

/*
Validates a debug token secret that you have previously created using CreateDebugToken. If valid, returns an AppCheckToken. Note that a restrictive quota is enforced on this method to prevent accidental exposure of the app to abuse.
*/
await gapi.client.firebaseappcheck.oauthClients.exchangeDebugToken({
  app: 'app',
});

/*
Generates a challenge that protects the integrity of an immediately following call to ExchangeAppAttestAttestation or ExchangeAppAttestAssertion. A challenge should not be reused for multiple calls.
*/
await gapi.client.firebaseappcheck.oauthClients.generateAppAttestChallenge({
  app: 'app',
});
```
