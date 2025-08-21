# TypeScript typings for Fact Check Tools API v1alpha1

For detailed description please check [documentation](https://developers.google.com/fact-check/tools/api/).

## Installing

Install typings for Fact Check Tools API:

```
npm install @types/gapi.client.factchecktools-v1alpha1 --save-dev
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
  'https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1',
  () => {
    // now we can use:
    // gapi.client.factchecktools
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('factchecktools', 'v1alpha1', () => {
  // now we can use:
  // gapi.client.factchecktools
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Read, create, update, and delete your ClaimReview data.
    'https://www.googleapis.com/auth/factchecktools',
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

After that you can use Fact Check Tools API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Search through fact-checked claims using an image as the query.
*/
await gapi.client.factchecktools.claims.imageSearch({});

/*
Search through fact-checked claims.
*/
await gapi.client.factchecktools.claims.search({});

/*
Create `ClaimReview` markup on a page.
*/
await gapi.client.factchecktools.pages.create({});

/*
Delete all `ClaimReview` markup on a page.
*/
await gapi.client.factchecktools.pages.delete({name: 'name'});

/*
Get all `ClaimReview` markup on a page.
*/
await gapi.client.factchecktools.pages.get({name: 'name'});

/*
List the `ClaimReview` markup pages for a specific URL or for an organization.
*/
await gapi.client.factchecktools.pages.list({});

/*
Update for all `ClaimReview` markup on a page Note that this is a full update. To retain the existing `ClaimReview` markup on a page, first perform a Get operation, then modify the returned markup, and finally call Update with the entire `ClaimReview` markup as the body.
*/
await gapi.client.factchecktools.pages.update({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.factchecktools-v1alpha1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
