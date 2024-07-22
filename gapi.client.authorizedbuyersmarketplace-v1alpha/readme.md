# TypeScript typings for Authorized Buyers Marketplace API v1alpha

The Authorized Buyers Marketplace API lets buyers programmatically discover inventory; propose, retrieve and negotiate deals with publishers.
For detailed description please check [documentation](https://developers.google.com/authorized-buyers/apis/marketplace/reference/rest/).

## Installing

Install typings for Authorized Buyers Marketplace API:

```
npm install @types/gapi.client.authorizedbuyersmarketplace-v1alpha --save-dev
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
  'https://authorizedbuyersmarketplace.googleapis.com/$discovery/rest?version=v1alpha',
  () => {
    // now we can use:
    // gapi.client.authorizedbuyersmarketplace
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('authorizedbuyersmarketplace', 'v1alpha', () => {
  // now we can use:
  // gapi.client.authorizedbuyersmarketplace
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, create, edit, and delete your Authorized Buyers Marketplace entities.
    'https://www.googleapis.com/auth/authorized-buyers-marketplace',
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
  }
);
```

After that you can use Authorized Buyers Marketplace API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
