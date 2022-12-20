# TypeScript typings for Poly API v1

The Poly API provides read access to assets hosted on poly.google.com to all, and upload access to poly.google.com for whitelisted accounts. 
For detailed description please check [documentation](https://developers.google.com/poly/).

## Installing

Install typings for Poly API:

```
npm install @types/gapi.client.poly-v1 --save-dev
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
gapi.client.load('https://poly.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.poly
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('poly', 'v1', () => {
  // now we can use:
  // gapi.client.poly
});
```



After that you can use Poly API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns detailed information about an asset given its name. PRIVATE assets are returned only if the currently authenticated user (via OAuth token) is the author of the asset.
*/
await gapi.client.poly.assets.get({ name: "name",  });

/*
Lists all public, remixable assets. These are assets with an access level of PUBLIC and published under the CC-By license.
*/
await gapi.client.poly.assets.list({  });
```
