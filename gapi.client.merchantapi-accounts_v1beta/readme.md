# TypeScript typings for Merchant API accounts_v1beta

Programmatically manage your Merchant Center Accounts.
For detailed description please check [documentation](https://developers.devsite.corp.google.com/merchant/api).

## Installing

Install typings for Merchant API:

```
npm install @types/gapi.client.merchantapi-accounts_v1beta --save-dev
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
  'https://merchantapi.googleapis.com/$discovery/rest?version=accounts_v1beta',
  () => {
    // now we can use:
    // gapi.client.merchantapi
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('merchantapi', 'accounts_v1beta', () => {
  // now we can use:
  // gapi.client.merchantapi
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

After that you can use Merchant API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Creates a standalone Merchant Center account with additional configuration. Adds the user that makes the request as an admin for the new account.
*/
await gapi.client.merchantapi.accounts.createAndConfigure({});

/*
Deletes the specified account regardless of its type: standalone, MCA or sub-account. Deleting an MCA leads to the deletion of all of its sub-accounts. Executing this method requires admin access. The deletion succeeds only if the account does not provide services to any other account and has no processed offers. You can use the `force` parameter to override this.
*/
await gapi.client.merchantapi.accounts.delete({name: 'name'});

/*
Retrieves an account from your Merchant Center account. After inserting, updating, or deleting an account, it may take several minutes before changes take effect.
*/
await gapi.client.merchantapi.accounts.get({name: 'name'});

/*
Lists accounts accessible to the calling user and matching the constraints of the request such as page size or filters. This is not just listing the sub-accounts of an MCA, but all accounts the calling user has access to including other MCAs, linked accounts, standalone accounts and so on. If no filter is provided, then it returns accounts the user is directly added to.
*/
await gapi.client.merchantapi.accounts.list({});

/*
List all sub-accounts for a given multi client account. This is a convenience wrapper for the more powerful `ListAccounts` method. This method will produce the same results as calling `ListsAccounts` with the following filter: `relationship(providerId={parent} AND service(type="ACCOUNT_AGGREGATION"))`
*/
await gapi.client.merchantapi.accounts.listSubaccounts({provider: 'provider'});

/*
Updates an account regardless of its type: standalone, MCA or sub-account. Executing this method requires admin access.
*/
await gapi.client.merchantapi.accounts.patch({name: 'name'});

/*
Accepts a `TermsOfService`. Executing this method requires admin access.
*/
await gapi.client.merchantapi.termsOfService.accept({name: 'name'});

/*
Retrieves the `TermsOfService` associated with the provided version.
*/
await gapi.client.merchantapi.termsOfService.get({name: 'name'});

/*
Retrieves the latest version of the `TermsOfService` for a given `kind` and `region_code`.
*/
await gapi.client.merchantapi.termsOfService.retrieveLatest({});
```
