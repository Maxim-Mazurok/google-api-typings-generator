# TypeScript typings for Google Play Grouping API v1alpha1

playgrouping.googleapis.com API.
For detailed description please check [documentation](https://cloud.google.com/playgrouping/).

## Installing

Install typings for Google Play Grouping API:

```
npm install @types/gapi.client.playgrouping-v1alpha1 --save-dev
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
  'https://playgrouping.googleapis.com/$discovery/rest?version=v1alpha1',
  () => {
    // now we can use:
    // gapi.client.playgrouping
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('playgrouping', 'v1alpha1', () => {
  // now we can use:
  // gapi.client.playgrouping
});
```

After that you can use Google Play Grouping API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
