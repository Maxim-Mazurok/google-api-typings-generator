# TypeScript typings for My Business Q&A API v1

The My Business Q&A API allows questions and answers to be posted for specific listings.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Q&A API:

```
npm install @types/gapi.client.mybusinessqanda-v1 --save-dev
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
gapi.client.load('https://mybusinessqanda.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.mybusinessqanda
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('mybusinessqanda', 'v1', () => {
  // now we can use:
  // gapi.client.mybusinessqanda
});
```



After that you can use My Business Q&A API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
