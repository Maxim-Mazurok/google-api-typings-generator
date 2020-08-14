# TypeScript typings for Cloud Datastore API v1

Accesses the schemaless NoSQL database to provide fully managed, robust, scalable storage for your application. 
For detailed description please check [documentation](https://cloud.google.com/datastore/).

## Installing

Install typings for Cloud Datastore API:

```
npm install @types/gapi.client.datastore@v1 --save-dev
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
gapi.client.load('datastore', 'v1', () => {
  // now we can use gapi.client.datastore
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
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

After that you can use Cloud Datastore API resources:

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
Exports a copy of all or a subset of entities from Google Cloud Datastore to another storage system, such as Google Cloud Storage. Recent updates to entities may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage.
*/
await gapi.client.datastore.projects.export({ projectId: "projectId",  });

/*
Imports entities into Google Cloud Datastore. Existing entities with the same key are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportEntities operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Datastore.
*/
await gapi.client.datastore.projects.import({ projectId: "projectId",  });

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
