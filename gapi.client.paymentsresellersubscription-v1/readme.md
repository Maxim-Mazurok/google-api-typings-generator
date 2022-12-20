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



After that you can use Payments Reseller Subscription API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
