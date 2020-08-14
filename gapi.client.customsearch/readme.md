# TypeScript typings for Custom Search API v1

Searches over a website or collection of websites
For detailed description please check [documentation](https://developers.google.com/custom-search/v1/introduction).

## Installing

Install typings for Custom Search API:

```
npm install @types/gapi.client.customsearch@v1 --save-dev
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
gapi.client.load('customsearch', 'v1', () => {
  // now we can use gapi.client.customsearch
  // ...
});
```



After that you can use Custom Search API resources:

```typescript

/*
Returns metadata about the search performed, metadata about the engine used for the search, and the search results.
*/
await gapi.client.customsearch.cse.list({  });
```
