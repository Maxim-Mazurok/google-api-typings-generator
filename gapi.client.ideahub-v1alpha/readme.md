# TypeScript typings for Idea Hub API v1alpha

This is an invitation-only API.
For detailed description please check [documentation](https://console.cloud.google.com/apis/library/ideahub.googleapis.com).

## Installing

Install typings for Idea Hub API:

```
npm install @types/gapi.client.ideahub-v1alpha --save-dev
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
gapi.client.load('https://ideahub.googleapis.com/$discovery/rest?version=v1alpha', () => {
  // now we can use:
  // gapi.client.ideahub
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('ideahub', 'v1alpha', () => {
  // now we can use:
  // gapi.client.ideahub
});
```



After that you can use Idea Hub API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
List ideas for a given Creator and filter and sort options.
*/
await gapi.client.ideahub.ideas.list({  });
```
