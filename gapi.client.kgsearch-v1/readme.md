# TypeScript typings for Knowledge Graph Search API v1

Searches the Google Knowledge Graph for entities.
For detailed description please check [documentation](https://developers.google.com/knowledge-graph/).

## Installing

Install typings for Knowledge Graph Search API:

```
npm install @types/gapi.client.kgsearch-v1 --save-dev
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
gapi.client.load('https://kgsearch.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.kgsearch
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('kgsearch', 'v1', () => {
  // now we can use:
  // gapi.client.kgsearch
});
```



After that you can use Knowledge Graph Search API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Searches Knowledge Graph for entities that match the constraints. A list of matched entities will be returned in response, which will be in JSON-LD format and compatible with http://schema.org
*/
await gapi.client.kgsearch.entities.search({  });
```
