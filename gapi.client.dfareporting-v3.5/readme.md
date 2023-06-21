# TypeScript typings for Campaign Manager 360 API v3.5

Build applications to efficiently manage large or complex trafficking, reporting, and attribution workflows for Campaign Manager 360.
For detailed description please check [documentation](https://developers.google.com/doubleclick-advertisers/).

## Installing

Install typings for Campaign Manager 360 API:

```
npm install @types/gapi.client.dfareporting-v3.5 --save-dev
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
gapi.client.load('https://dfareporting.googleapis.com/$discovery/rest?version=v3.5', () => {
  // now we can use:
  // gapi.client.dfareporting
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('dfareporting', 'v3.5', () => {
  // now we can use:
  // gapi.client.dfareporting
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your DoubleClick Campaign Manager's (DCM) display ad campaigns
      'https://www.googleapis.com/auth/dfatrafficking',
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

After that you can use Campaign Manager 360 API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Inserts a new creative asset.
*/
await gapi.client.dfareporting.media.upload({ advertiserId: "advertiserId", profileId: "profileId",  });
```
