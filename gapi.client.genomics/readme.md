# TypeScript typings for Genomics API v1

Uploads, processes, queries, and searches Genomics data in the cloud.
For detailed description please check [documentation](https://cloud.google.com/genomics).

## Installing

Install typings for Genomics API:

```
npm install @types/gapi.client.genomics@v1 --save-dev
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
gapi.client.load('genomics', 'v1', () => {
  // now we can use gapi.client.genomics
  // ...
});
```



After that you can use Genomics API resources:

```typescript
```
