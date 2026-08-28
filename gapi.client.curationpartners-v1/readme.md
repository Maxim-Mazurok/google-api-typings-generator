# TypeScript typings for Curation Partners API v1

Curation partners API is an externally available HTTP API for curators to programmatically manage their data segments and curated packages used by ad agencies.
For detailed description please check [documentation](https://developers.google.com/authorized-buyers/curation/apis/guides/curationpartners/overview).

## Installing

Install typings for Curation Partners API:

```
npm install @types/gapi.client.curationpartners-v1 --save-dev
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
      "gapi.client.curationpartners-v1"
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
  'https://curationpartners.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.curationpartners
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('curationpartners', 'v1', () => {
  // now we can use:
  // gapi.client.curationpartners
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, create, edit, and delete data entities in your Curation account.
    'https://www.googleapis.com/auth/curation-partners',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  },
);
```

After that you can use Curation Partners API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Lists all media planner accounts that the caller has access to. For curators, this will return all media planners that have accepted curator terms. For other accounts, attempting to list media planners will return an error.
*/
await gapi.client.curationpartners.mediaPlanners.list({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.curationpartners-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
