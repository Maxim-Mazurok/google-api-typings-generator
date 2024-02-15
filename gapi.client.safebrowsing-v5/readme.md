# TypeScript typings for Safe Browsing API v5

Enables client applications to check web resources (most commonly URLs) against Google-generated lists of unsafe web resources. The Safe Browsing APIs are for non-commercial use only. If you need to use APIs to detect malicious URLs for commercial purposes – meaning “for sale or revenue-generating purposes” – please refer to the Web Risk API.
For detailed description please check [documentation](https://developers.google.com/safe-browsing/).

## Installing

Install typings for Safe Browsing API:

```
npm install @types/gapi.client.safebrowsing-v5 --save-dev
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
  'https://safebrowsing.googleapis.com/$discovery/rest?version=v5',
  () => {
    // now we can use:
    // gapi.client.safebrowsing
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('safebrowsing', 'v5', () => {
  // now we can use:
  // gapi.client.safebrowsing
});
```

After that you can use Safe Browsing API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Search for full hashes matching the specified prefixes. This is a custom method as described by guidance at https://google.aip.dev/136
*/
await gapi.client.safebrowsing.hashes.search({});
```
