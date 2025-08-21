# TypeScript typings for Tag Manager API v2

This API allows clients to access and modify container and tag configuration.
For detailed description please check [documentation](https://developers.google.com/tag-manager).

## Installing

Install typings for Tag Manager API:

```
npm install @types/gapi.client.tagmanager-v2 --save-dev
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
  'https://tagmanager.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.tagmanager
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('tagmanager', 'v2', () => {
  // now we can use:
  // gapi.client.tagmanager
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Delete your Google Tag Manager containers
    'https://www.googleapis.com/auth/tagmanager.delete.containers',

    // Manage your Google Tag Manager container and its subcomponents, excluding versioning and publishing
    'https://www.googleapis.com/auth/tagmanager.edit.containers',

    // Manage your Google Tag Manager container versions
    'https://www.googleapis.com/auth/tagmanager.edit.containerversions',

    // View and manage your Google Tag Manager accounts
    'https://www.googleapis.com/auth/tagmanager.manage.accounts',

    // Manage user permissions of your Google Tag Manager account and container
    'https://www.googleapis.com/auth/tagmanager.manage.users',

    // Publish your Google Tag Manager container versions
    'https://www.googleapis.com/auth/tagmanager.publish',

    // View your Google Tag Manager container and its subcomponents
    'https://www.googleapis.com/auth/tagmanager.readonly',
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

After that you can use Tag Manager API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets a GTM Account.
*/
await gapi.client.tagmanager.accounts.get({path: 'path'});

/*
Lists all GTM Accounts that a user has access to.
*/
await gapi.client.tagmanager.accounts.list({});

/*
Updates a GTM Account.
*/
await gapi.client.tagmanager.accounts.update({path: 'path'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.tagmanager-v2#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
