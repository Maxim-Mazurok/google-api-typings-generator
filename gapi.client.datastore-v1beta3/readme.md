# TypeScript typings for Cloud Datastore API v1beta3

Accesses the schemaless NoSQL database to provide fully managed, robust, scalable storage for your application. 
For detailed description please check [documentation](https://cloud.google.com/datastore/).

## Installing

Install typings for Cloud Datastore API:

```
npm install @types/gapi.client.datastore-v1beta3 --save-dev
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
gapi.client.load('https://datastore.googleapis.com/$discovery/rest?version=v1beta3', () => {
  // now we can use:
  // gapi.client.datastore
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('datastore', 'v1beta3', () => {
  // now we can use:
  // gapi.client.datastore
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and manage your Google Cloud Datastore data
      'https://www.googleapis.com/auth/datastore',
    ],
    immediate = true;
// ...

gapi.auth.authorize(
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Cloud Datastore API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Allocates IDs for the given keys, which is useful for referencing an entity before it is inserted.
*/
await gapi.client.datastore.projects.allocateIds({ projectId: "projectId",  });

/*
Begins a new transaction.
*/
await gapi.client.datastore.projects.beginTransaction({ projectId: "projectId",  });

/*
Commits a transaction, optionally creating, deleting or modifying some entities.
*/
await gapi.client.datastore.projects.commit({ projectId: "projectId",  });

/*
Looks up entities by key.
*/
await gapi.client.datastore.projects.lookup({ projectId: "projectId",  });

/*
Prevents the supplied keys' IDs from being auto-allocated by Cloud Datastore.
*/
await gapi.client.datastore.projects.reserveIds({ projectId: "projectId",  });

/*
Rolls back a transaction.
*/
await gapi.client.datastore.projects.rollback({ projectId: "projectId",  });

/*
Queries for entities.
*/
await gapi.client.datastore.projects.runQuery({ projectId: "projectId",  });
```
