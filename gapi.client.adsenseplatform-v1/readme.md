# TypeScript typings for AdSense Platform API v1

For detailed description please check [documentation](https://developers.google.com/adsense/platforms/).

## Installing

Install typings for AdSense Platform API:

```
npm install @types/gapi.client.adsenseplatform-v1 --save-dev
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
  'https://adsenseplatform.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.adsenseplatform
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('adsenseplatform', 'v1', () => {
  // now we can use:
  // gapi.client.adsenseplatform
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your AdSense data
    'https://www.googleapis.com/auth/adsense',

    // View your AdSense data
    'https://www.googleapis.com/auth/adsense.readonly',
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

After that you can use AdSense Platform API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
