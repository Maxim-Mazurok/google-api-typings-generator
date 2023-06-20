# TypeScript typings for Essential Contacts API v1


For detailed description please check [documentation](https://cloud.google.com/essentialcontacts/docs/).

## Installing

Install typings for Essential Contacts API:

```
npm install @types/gapi.client.essentialcontacts-v1 --save-dev
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
gapi.client.load('https://essentialcontacts.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.essentialcontacts
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('essentialcontacts', 'v1', () => {
  // now we can use:
  // gapi.client.essentialcontacts
});
```



After that you can use Essential Contacts API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
