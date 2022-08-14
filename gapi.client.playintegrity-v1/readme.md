# TypeScript typings for Google Play Integrity API v1

Play Integrity
For detailed description please check [documentation](https://developer.android.com/google/play/integrity).

## Installing

Install typings for Google Play Integrity API:

```
npm install @types/gapi.client.playintegrity-v1 --save-dev
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
gapi.client.load('https://playintegrity.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.playintegrity
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('playintegrity', 'v1', () => {
  // now we can use:
  // gapi.client.playintegrity
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Private Service: https://www.googleapis.com/auth/playintegrity
      'https://www.googleapis.com/auth/playintegrity',
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

After that you can use Google Play Integrity API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Decodes the integrity token and returns the token payload.
*/
await gapi.client.playintegrity.decodeIntegrityToken({ packageName: "packageName",  });
```
