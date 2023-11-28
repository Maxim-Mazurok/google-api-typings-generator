# TypeScript typings for Payments Reseller Subscription API v1


For detailed description please check [documentation](https://developers.google.com/payments/reseller/subscription/).

## Installing

Install typings for Payments Reseller Subscription API:

```
npm install @types/gapi.client.paymentsresellersubscription-v1 --save-dev
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
gapi.client.load('https://paymentsresellersubscription.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.paymentsresellersubscription
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('paymentsresellersubscription', 'v1', () => {
  // now we can use:
  // gapi.client.paymentsresellersubscription
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Associate you with your personal info on Google
      'openid',
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

After that you can use Payments Reseller Subscription API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
