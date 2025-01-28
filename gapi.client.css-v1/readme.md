# TypeScript typings for CSS API v1

Programmatically manage your Comparison Shopping Service (CSS) account data at scale.
For detailed description please check [documentation](https://developers.google.com/comparison-shopping-services/api/overview).

## Installing

Install typings for CSS API:

```
npm install @types/gapi.client.css-v1 --save-dev
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
  'https://css.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.css
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('css', 'v1', () => {
  // now we can use:
  // gapi.client.css
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Manage your product listings and accounts for Google Shopping
    'https://www.googleapis.com/auth/content',
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

After that you can use CSS API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Retrieves a single CSS/MC account by ID.
*/
await gapi.client.css.accounts.get({name: 'name'});

/*
Lists all the accounts under the specified CSS account ID, and optionally filters by label ID and account name.
*/
await gapi.client.css.accounts.listChildAccounts({parent: 'parent'});

/*
Updates labels assigned to CSS/MC accounts by a CSS domain.
*/
await gapi.client.css.accounts.updateLabels({name: 'name'});
```
