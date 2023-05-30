# TypeScript typings for Firebase App Check API v1beta

Firebase App Check works alongside other Firebase services to help protect your backend resources from abuse, such as billing fraud or phishing.
For detailed description please check [documentation](https://firebase.google.com/docs/app-check).

## Installing

Install typings for Firebase App Check API:

```
npm install @types/gapi.client.firebaseappcheck-v1beta --save-dev
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
gapi.client.load('https://firebaseappcheck.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.firebaseappcheck
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebaseappcheck', 'v1beta', () => {
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Firebase App Check API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns a public JWK set as specified by [RFC 7517](https://tools.ietf.org/html/rfc7517) that can be used to verify App Check tokens. Exactly one of the public keys in the returned set will successfully validate any App Check token that is currently valid.
*/
await gapi.client.firebaseappcheck.jwks.get({ name: "name",  });

/*
Accepts an App Attest assertion and an artifact previously obtained from ExchangeAppAttestAttestation and verifies those with Apple. If valid, returns an AppCheckToken.
*/
await gapi.client.firebaseappcheck.oauthClients.exchangeAppAttestAssertion({ app: "app",  });

/*
Accepts an App Attest CBOR attestation and verifies it with Apple using your preconfigured team and bundle IDs. If valid, returns an attestation artifact that can later be exchanged for an AppCheckToken using ExchangeAppAttestAssertion. For convenience and performance, this method's response object will also contain an AppCheckToken (if the verification is successful).
*/
await gapi.client.firebaseappcheck.oauthClients.exchangeAppAttestAttestation({ app: "app",  });

/*
Generates a challenge that protects the integrity of an immediately following call to ExchangeAppAttestAttestation or ExchangeAppAttestAssertion. A challenge should not be reused for multiple calls.
*/
await gapi.client.firebaseappcheck.oauthClients.generateAppAttestChallenge({ app: "app",  });

/*
Verifies the given App Check token and returns token usage signals that callers may act upon. This method currently only supports App Check tokens exchanged from the following attestation providers: * Play Integrity API * App Attest * DeviceCheck (`DCDevice` tokens) * reCAPTCHA Enterprise * reCAPTCHA v3 * Custom providers App Check tokens exchanged from debug secrets are also supported. Calling this method on an otherwise valid App Check token with an unsupported provider will cause an HTTP 400 error to be returned. Returns whether this token was already consumed before this call. If this is the first time this method has seen the given App Check token, the field `already_consumed` in the response will be absent. The given token will then be marked as `already_consumed` (set to `true`) for all future invocations of this method for that token. Note that if the given App Check token is invalid, an HTTP 403 error is returned instead of a response object, regardless whether the token was already consumed. Currently, when evaluating whether an App Check token was already consumed, only calls to this exact method are counted. Use of the App Check token elsewhere will not mark the token as being already consumed. The caller must have the [`firebaseappcheck.appCheckTokens.verify`](https://firebase.google.com/docs/projects/iam/permissions#app-check) permission to call this method. This permission is part of the [Firebase App Check Token Verifier role](https://firebase.google.com/docs/projects/iam/roles-predefined-product#app-check).
*/
await gapi.client.firebaseappcheck.projects.verifyAppCheckToken({ project: "project",  });
```
