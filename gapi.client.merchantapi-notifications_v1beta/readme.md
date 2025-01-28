# TypeScript typings for Merchant API notifications_v1beta

Programmatically manage your Merchant Center Accounts.
For detailed description please check [documentation](https://developers.devsite.corp.google.com/merchant/api).

## Installing

Install typings for Merchant API:

```
npm install @types/gapi.client.merchantapi-notifications_v1beta --save-dev
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
  'https://merchantapi.googleapis.com/$discovery/rest?version=notifications_v1beta',
  () => {
    // now we can use:
    // gapi.client.merchantapi
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('merchantapi', 'notifications_v1beta', () => {
  // now we can use:
  // gapi.client.merchantapi
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Manage your product listings and accounts for Google Shopping
    'https://www.googleapis.com/auth/content',
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

After that you can use Merchant API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
