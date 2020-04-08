# TypeScript typings for Cloud Asset API v1

The cloud asset API manages the history and inventory of cloud resources.
For detailed description please check [documentation](https://cloud.google.com/asset-inventory/docs/quickstart).

## Installing

Install typings for Cloud Asset API:

```
npm install @types/gapi.client.cloudasset@v1 --save-dev
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
gapi.client.load('cloudasset', 'v1', () => {
  // now we can use gapi.client.cloudasset
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

After that you can use Cloud Asset API resources:

```typescript

/*
Creates a feed in a parent project/folder/organization to listen to its
asset updates.
*/
await gapi.client.feeds.create({ parent: "parent",  });

/*
Deletes an asset feed.
*/
await gapi.client.feeds.delete({ name: "name",  });

/*
Gets details about an asset feed.
*/
await gapi.client.feeds.get({ name: "name",  });

/*
Lists all asset feeds in a parent project/folder/organization.
*/
await gapi.client.feeds.list({ parent: "parent",  });

/*
Updates an asset feed configuration.
*/
await gapi.client.feeds.patch({ name: "name",  });

/*
Gets the latest state of a long-running operation.  Clients can use this
method to poll the operation result at intervals as recommended by the API
service.
*/
await gapi.client.operations.get({ name: "name",  });

/*
Batch gets the update history of assets that overlap a time window.
For RESOURCE content, this API outputs history with asset in both
non-delete or deleted status.
For IAM_POLICY content, this API outputs history when the asset and its
attached IAM POLICY both exist. This can create gaps in the output history.
If a specified asset does not exist, this API returns an INVALID_ARGUMENT
error.
*/
await gapi.client.v1.batchGetAssetsHistory({ parent: "parent",  });

/*
Exports assets with time and resource types to a given Cloud Storage
location. The output format is newline-delimited JSON.
This API implements the google.longrunning.Operation API allowing you
to keep track of the export.
*/
await gapi.client.v1.exportAssets({ parent: "parent",  });
```
