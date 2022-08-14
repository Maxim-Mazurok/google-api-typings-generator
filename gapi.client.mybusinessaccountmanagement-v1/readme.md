# TypeScript typings for My Business Account Management API v1

The My Business Account Management API provides an interface for managing access to a location on Google.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Account Management API:

```
npm install @types/gapi.client.mybusinessaccountmanagement-v1 --save-dev
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
gapi.client.load('https://mybusinessaccountmanagement.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.mybusinessaccountmanagement
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('mybusinessaccountmanagement', 'v1', () => {
  // now we can use:
  // gapi.client.mybusinessaccountmanagement
});
```



After that you can use My Business Account Management API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Creates an account with the specified name and type under the given parent. - Personal accounts and Organizations cannot be created. - User Groups cannot be created with a Personal account as primary owner. - Location Groups cannot be created with a primary owner of a Personal account if the Personal account is in an Organization. - Location Groups cannot own Location Groups.
*/
await gapi.client.mybusinessaccountmanagement.accounts.create({  });

/*
Gets the specified account. Returns `NOT_FOUND` if the account does not exist or if the caller does not have access rights to it.
*/
await gapi.client.mybusinessaccountmanagement.accounts.get({ name: "name",  });

/*
Lists all of the accounts for the authenticated user. This includes all accounts that the user owns, as well as any accounts for which the user has management rights.
*/
await gapi.client.mybusinessaccountmanagement.accounts.list({  });

/*
Updates the specified business account. Personal accounts cannot be updated using this method.
*/
await gapi.client.mybusinessaccountmanagement.accounts.patch({ name: "name",  });

/*
Moves a location from an account that the user owns to another account that the same user administers. The user must be an owner of the account the location is currently associated with and must also be at least a manager of the destination account.
*/
await gapi.client.mybusinessaccountmanagement.locations.transfer({ name: "name",  });
```
