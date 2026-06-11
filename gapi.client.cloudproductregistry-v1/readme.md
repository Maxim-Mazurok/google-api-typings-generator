# TypeScript typings for Cloud Product Registry API v1

cloudproductregistry.googleapis.com API.
For detailed description please check [documentation](https://docs.cloud.google.com/product-registry).

## Installing

Install typings for Cloud Product Registry API:

```
npm install @types/gapi.client.cloudproductregistry-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.cloudproductregistry-v1"
    ]
  }
}
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
  'https://cloudproductregistry.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.cloudproductregistry
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudproductregistry', 'v1', () => {
  // now we can use:
  // gapi.client.cloudproductregistry
});
```

After that you can use Cloud Product Registry API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets details of a LogicalProduct.
*/
await gapi.client.cloudproductregistry.logicalProducts.get({name: 'name'});

/*
Lists LogicalProducts matching given criteria.
*/
await gapi.client.cloudproductregistry.logicalProducts.list({});

/*
Look up entities.
*/
await gapi.client.cloudproductregistry.logicalProducts.lookupEntity({
  lookupUri: 'lookupUri',
});

/*
Get details of a ProductSuite.
*/
await gapi.client.cloudproductregistry.productSuites.get({name: 'name'});

/*
Lists ProductSuites.
*/
await gapi.client.cloudproductregistry.productSuites.list({});

/*
Look up entities.
*/
await gapi.client.cloudproductregistry.productSuites.lookupEntity({
  lookupUri: 'lookupUri',
});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.cloudproductregistry-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
