# TypeScript typings for Chrome Verified Access API v1

API for Verified Access chrome extension to provide credential verification for chrome devices connecting to an enterprise network
For detailed description please check [documentation](https://developers.google.com/chrome/verified-access).

## Installing

Install typings for Chrome Verified Access API:

```
npm install @types/gapi.client.verifiedaccess-v1 --save-dev
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
gapi.client.load('https://verifiedaccess.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.verifiedaccess
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('verifiedaccess', 'v1', () => {
  // now we can use:
  // gapi.client.verifiedaccess
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Verify your enterprise credentials
      'https://www.googleapis.com/auth/verifiedaccess',
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

After that you can use Chrome Verified Access API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
CreateChallenge API
*/
await gapi.client.verifiedaccess.challenge.create({  });

/*
VerifyChallengeResponse API
*/
await gapi.client.verifiedaccess.challenge.verify({  });
```
