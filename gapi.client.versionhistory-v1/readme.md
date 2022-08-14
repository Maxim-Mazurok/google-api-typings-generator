# TypeScript typings for Version History API v1

Version History API - Prod
For detailed description please check [documentation](https://developers.chrome.com/versionhistory).

## Installing

Install typings for Version History API:

```
npm install @types/gapi.client.versionhistory-v1 --save-dev
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
gapi.client.load('https://versionhistory.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.versionhistory
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('versionhistory', 'v1', () => {
  // now we can use:
  // gapi.client.versionhistory
});
```



After that you can use Version History API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns list of platforms that are available for a given product. The resource "product" has no resource name in its name.
*/
await gapi.client.versionhistory.platforms.list({ parent: "parent",  });
```
