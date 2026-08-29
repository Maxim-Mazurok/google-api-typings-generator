# TypeScript typings for Web Content Publisher API v1

webcontentpublisher.googleapis.com API, a service for web content publishers.
For detailed description please check [documentation](https://developers.google.com/news/subscribe).

## Installing

Install typings for Web Content Publisher API:

```
npm install @types/gapi.client.webcontentpublisher-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.webcontentpublisher-v1"
    ]
  }
}
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
  'https://webcontentpublisher.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.webcontentpublisher
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('webcontentpublisher', 'v1', () => {
  // now we can use:
  // gapi.client.webcontentpublisher
});
```

After that you can use Web Content Publisher API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Checks if a user is eligible for free article access.
*/
await gapi.client.webcontentpublisher.publications.checkFreeAccess({
  name: 'name',
});

/*
Returns user tokens mapped to their canonical domains for all publications the authenticated user is entitled to.
*/
await gapi.client.webcontentpublisher.users.generatePlatformSiteTokens({
  name: 'name',
});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.webcontentpublisher-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
