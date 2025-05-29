# TypeScript typings for Gmail Postmaster Tools API v1

The Postmaster Tools API is a RESTful API that provides programmatic access to email traffic metrics (like spam reports, delivery errors etc) otherwise available through the Gmail Postmaster Tools UI currently.
For detailed description please check [documentation](https://developers.google.com/workspace/gmail/postmaster).

## Installing

Install typings for Gmail Postmaster Tools API:

```
npm install @types/gapi.client.gmailpostmastertools-v1 --save-dev
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
  'https://gmailpostmastertools.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.gmailpostmastertools
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('gmailpostmastertools', 'v1', () => {
  // now we can use:
  // gapi.client.gmailpostmastertools
});
```

After that you can use Gmail Postmaster Tools API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets a specific domain registered by the client. Returns NOT_FOUND if the domain does not exist.
*/
await gapi.client.gmailpostmastertools.domains.get({name: 'name'});

/*
Lists the domains that have been registered by the client. The order of domains in the response is unspecified and non-deterministic. Newly created domains will not necessarily be added to the end of this list.
*/
await gapi.client.gmailpostmastertools.domains.list({});
```
