# TypeScript typings for Poly API v1

The Poly API provides read access to assets hosted on <a href="https://poly.google.com">poly.google.com</a> to all, and upload access to <a href="https://poly.google.com">poly.google.com</a> for whitelisted accounts.

For detailed description please check [documentation](https://developers.google.com/poly/).

## Installing

Install typings for Poly API:

```
npm install @types/gapi.client.poly@v1 --save-dev
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
gapi.client.load('poly', 'v1', () => {
  // now we can use gapi.client.poly
  // ...
});
```



After that you can use Poly API resources:

```typescript

/*
Returns detailed information about an asset given its name.
PRIVATE assets are returned only if
 the currently authenticated user (via OAuth token) is the author of the
 asset.
*/
await gapi.client.assets.get({ name: "name",  });

/*
Lists all public, remixable assets. These are assets with an access level
of PUBLIC and published under the
CC-By license.
*/
await gapi.client.assets.list({  });
```
