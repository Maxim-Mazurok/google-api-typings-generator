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
Creates a feed in a parent project/folder/organization to listen to its asset updates.
*/
await gapi.client.cloudasset.feeds.create({ parent: "parent",  });

/*
Deletes an asset feed.
*/
await gapi.client.cloudasset.feeds.delete({ name: "name",  });

/*
Gets details about an asset feed.
*/
await gapi.client.cloudasset.feeds.get({ name: "name",  });

/*
Lists all asset feeds in a parent project/folder/organization.
*/
await gapi.client.cloudasset.feeds.list({ parent: "parent",  });

/*
Updates an asset feed configuration.
*/
await gapi.client.cloudasset.feeds.patch({ name: "name",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudasset.operations.get({ name: "name",  });

/*
Batch gets the update history of assets that overlap a time window. For IAM_POLICY content, this API outputs history when the asset and its attached IAM POLICY both exist. This can create gaps in the output history. Otherwise, this API outputs history with asset in both non-delete or deleted status. If a specified asset does not exist, this API returns an INVALID_ARGUMENT error.
*/
await gapi.client.cloudasset.v1.batchGetAssetsHistory({ parent: "parent",  });

/*
Exports assets with time and resource types to a given Cloud Storage location/BigQuery table. For Cloud Storage location destinations, the output format is newline-delimited JSON. Each line represents a google.cloud.asset.v1.Asset in the JSON format; for BigQuery table destinations, the output table stores the fields in asset proto as columns. This API implements the google.longrunning.Operation API , which allows you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes.
*/
await gapi.client.cloudasset.v1.exportAssets({ parent: "parent",  });

/*
Searches all IAM policies within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllIamPolicies` permission on the desired scope, otherwise the request will be rejected.
*/
await gapi.client.cloudasset.v1.searchAllIamPolicies({ scope: "scope",  });

/*
Searches all Cloud resources within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllResources` permission on the desired scope, otherwise the request will be rejected.
*/
await gapi.client.cloudasset.v1.searchAllResources({ scope: "scope",  });
```
