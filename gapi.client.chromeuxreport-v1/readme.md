# TypeScript typings for Chrome UX Report API v1

The Chrome UX Report API lets you view real user experience data for millions of websites. 
For detailed description please check [documentation](https://developers.google.com/web/tools/chrome-user-experience-report/api/reference).

## Installing

Install typings for Chrome UX Report API:

```
npm install @types/gapi.client.chromeuxreport-v1 --save-dev
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
gapi.client.load('https://chromeuxreport.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.chromeuxreport
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('chromeuxreport', 'v1', () => {
  // now we can use:
  // gapi.client.chromeuxreport
});
```



After that you can use Chrome UX Report API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Queries the Chrome User Experience for a single `record` for a given site. Returns a `record` that contains one or more `metrics` corresponding to performance data about the requested site.
*/
await gapi.client.chromeuxreport.records.queryRecord({  });
```
