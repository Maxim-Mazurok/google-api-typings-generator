# TypeScript typings for Google Search Console API v1

The Search Console API provides access to both Search Console data (verified users only) and to public information on an URL basis (anyone)
For detailed description please check [documentation](https://developers.google.com/webmaster-tools/search-console-api/).

## Installing

Install typings for Google Search Console API:

```
npm install @types/gapi.client.searchconsole@v1 --save-dev
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
gapi.client.load('searchconsole', 'v1', () => {
  // now we can use gapi.client.searchconsole
  // ...
});
```



After that you can use Google Search Console API resources:

```typescript
```
