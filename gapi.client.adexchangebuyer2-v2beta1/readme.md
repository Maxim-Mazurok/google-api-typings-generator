# TypeScript typings for Ad Exchange Buyer API II v2beta1

Accesses the latest features for managing Authorized Buyers accounts, Real-Time Bidding configurations and auction metrics, and Marketplace programmatic deals.
For detailed description please check [documentation](https://developers.google.com/authorized-buyers/apis/reference/rest/).

## Installing

Install typings for Ad Exchange Buyer API II:

```
npm install @types/gapi.client.adexchangebuyer2-v2beta1 --save-dev
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
  'https://adexchangebuyer.googleapis.com/$discovery/rest?version=v2beta1',
  () => {
    // now we can use:
    // gapi.client.adexchangebuyer2
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('adexchangebuyer2', 'v2beta1', () => {
  // now we can use:
  // gapi.client.adexchangebuyer2
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Manage your Ad Exchange buyer account configuration
    'https://www.googleapis.com/auth/adexchange.buyer',
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

After that you can use Ad Exchange Buyer API II resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
