# TypeScript typings for Agencies and Brands API v1

Agencies and brands API is an externally available HTTP API for ad agencies and brands to programmatically manage their deals and spending with Google Ad Manager publishers.
For detailed description please check [documentation](https://developers.google.com/authorized-buyers/agencies-and-brands/get-started/start).

## Installing

Install typings for Agencies and Brands API:

```
npm install @types/gapi.client.agenciesandbrands-v1 --save-dev
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
      "gapi.client.agenciesandbrands-v1"
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
  'https://agenciesandbrands.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.agenciesandbrands
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('agenciesandbrands', 'v1', () => {
  // now we can use:
  // gapi.client.agenciesandbrands
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View, create, edit, and delete data entities in your Agency account.
    'https://www.googleapis.com/auth/agencies-and-brands',
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

After that you can use Agencies and Brands API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.agenciesandbrands-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
