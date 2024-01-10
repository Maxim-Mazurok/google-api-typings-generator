# TypeScript typings for Cloud Bigtable Admin API v2

Administer your Cloud Bigtable tables and instances.
For detailed description please check [documentation](https://cloud.google.com/bigtable/).

## Installing

Install typings for Cloud Bigtable Admin API:

```
npm install @types/gapi.client.bigtableadmin-v2 --save-dev
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
  'https://bigtableadmin.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.bigtableadmin
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('bigtableadmin', 'v2', () => {
  // now we can use:
  // gapi.client.bigtableadmin
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Administer your Cloud Bigtable tables and clusters
    'https://www.googleapis.com/auth/bigtable.admin',

    // Administer your Cloud Bigtable clusters
    'https://www.googleapis.com/auth/bigtable.admin.cluster',

    // Administer your Cloud Bigtable clusters
    'https://www.googleapis.com/auth/bigtable.admin.instance',

    // Administer your Cloud Bigtable tables
    'https://www.googleapis.com/auth/bigtable.admin.table',

    // Administer your Cloud Bigtable tables and clusters
    'https://www.googleapis.com/auth/cloud-bigtable.admin',

    // Administer your Cloud Bigtable clusters
    'https://www.googleapis.com/auth/cloud-bigtable.admin.cluster',

    // Administer your Cloud Bigtable tables
    'https://www.googleapis.com/auth/cloud-bigtable.admin.table',

    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View your data across Google Cloud services and see the email address of your Google Account
    'https://www.googleapis.com/auth/cloud-platform.read-only',
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
  }
);
```

After that you can use Cloud Bigtable Admin API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.bigtableadmin.operations.get({name: 'name'});
```
