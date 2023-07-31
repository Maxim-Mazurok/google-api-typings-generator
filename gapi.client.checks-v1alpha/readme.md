# TypeScript typings for Checks API v1alpha

The Checks API contains powerful and easy-to-use privacy and compliance APIs that interact with the Checks product and its underlying technology.
For detailed description please check [documentation](https://developers.google.com/checks).

## Installing

Install typings for Checks API:

```
npm install @types/gapi.client.checks-v1alpha --save-dev
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
gapi.client.load('https://checks.googleapis.com/$discovery/rest?version=v1alpha', () => {
  // now we can use:
  // gapi.client.checks
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('checks', 'v1alpha', () => {
  // now we can use:
  // gapi.client.checks
});
```



After that you can use Checks API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Analyzes the privacy policy of the given policy URL or content.
*/
await gapi.client.checks.privacypolicy.analyze({  });
```
