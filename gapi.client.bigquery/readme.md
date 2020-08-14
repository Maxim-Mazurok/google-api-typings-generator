# TypeScript typings for BigQuery API v2

A data platform for customers to create, manage, share and query data.
For detailed description please check [documentation](https://cloud.google.com/bigquery/).

## Installing

Install typings for BigQuery API:

```
npm install @types/gapi.client.bigquery@v2 --save-dev
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
gapi.client.load('bigquery', 'v2', () => {
  // now we can use gapi.client.bigquery
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data in Google BigQuery
      'https://www.googleapis.com/auth/bigquery',

      // Insert data into Google BigQuery
      'https://www.googleapis.com/auth/bigquery.insertdata',

      // View your data in Google BigQuery
      'https://www.googleapis.com/auth/bigquery.readonly',

      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform.read-only',

      // Manage your data and permissions in Google Cloud Storage
      'https://www.googleapis.com/auth/devstorage.full_control',

      // View your data in Google Cloud Storage
      'https://www.googleapis.com/auth/devstorage.read_only',

      // Manage your data in Google Cloud Storage
      'https://www.googleapis.com/auth/devstorage.read_write',
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

After that you can use BigQuery API resources:

```typescript

/*
Deletes the dataset specified by the datasetId value. Before you can delete a dataset, you must delete all its tables, either manually or by specifying deleteContents. Immediately after deletion, you can create another dataset with the same name.
*/
await gapi.client.bigquery.datasets.delete({ datasetId: "datasetId", projectId: "projectId",  });

/*
Returns the dataset specified by datasetID.
*/
await gapi.client.bigquery.datasets.get({ datasetId: "datasetId", projectId: "projectId",  });

/*
Creates a new empty dataset.
*/
await gapi.client.bigquery.datasets.insert({ projectId: "projectId",  });

/*
Lists all datasets in the specified project to which you have been granted the READER dataset role.
*/
await gapi.client.bigquery.datasets.list({ projectId: "projectId",  });

/*
Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. This method supports patch semantics.
*/
await gapi.client.bigquery.datasets.patch({ datasetId: "datasetId", projectId: "projectId",  });

/*
Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource.
*/
await gapi.client.bigquery.datasets.update({ datasetId: "datasetId", projectId: "projectId",  });

/*
Requests that a job be cancelled. This call will return immediately, and the client will need to poll for the job status to see if the cancel completed successfully. Cancelled jobs may still incur costs.
*/
await gapi.client.bigquery.jobs.cancel({ jobId: "jobId", projectId: "projectId",  });

/*
Returns information about a specific job. Job information is available for a six month period after creation. Requires that you're the person who ran the job, or have the Is Owner project role.
*/
await gapi.client.bigquery.jobs.get({ jobId: "jobId", projectId: "projectId",  });

/*
Retrieves the results of a query job.
*/
await gapi.client.bigquery.jobs.getQueryResults({ jobId: "jobId", projectId: "projectId",  });

/*
Starts a new asynchronous job. Requires the Can View project role.
*/
await gapi.client.bigquery.jobs.insert({ projectId: "projectId",  });

/*
Lists all jobs that you started in the specified project. Job information is available for a six month period after creation. The job list is sorted in reverse chronological order, by job creation time. Requires the Can View project role, or the Is Owner project role if you set the allUsers property.
*/
await gapi.client.bigquery.jobs.list({ projectId: "projectId",  });

/*
Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout.
*/
await gapi.client.bigquery.jobs.query({ projectId: "projectId",  });

/*
Deletes the model specified by modelId from the dataset.
*/
await gapi.client.bigquery.models.delete({ datasetId: "datasetId", modelId: "modelId", projectId: "projectId",  });

/*
Gets the specified model resource by model ID.
*/
await gapi.client.bigquery.models.get({ datasetId: "datasetId", modelId: "modelId", projectId: "projectId",  });

/*
Lists all models in the specified dataset. Requires the READER dataset role.
*/
await gapi.client.bigquery.models.list({ datasetId: "datasetId", projectId: "projectId",  });

/*
Patch specific fields in the specified model.
*/
await gapi.client.bigquery.models.patch({ datasetId: "datasetId", modelId: "modelId", projectId: "projectId",  });

/*
Returns the email address of the service account for your project used for interactions with Google Cloud KMS.
*/
await gapi.client.bigquery.projects.getServiceAccount({ projectId: "projectId",  });

/*
Lists all projects to which you have been granted any project role.
*/
await gapi.client.bigquery.projects.list({  });

/*
Deletes the routine specified by routineId from the dataset.
*/
await gapi.client.bigquery.routines.delete({ datasetId: "datasetId", projectId: "projectId", routineId: "routineId",  });

/*
Gets the specified routine resource by routine ID.
*/
await gapi.client.bigquery.routines.get({ datasetId: "datasetId", projectId: "projectId", routineId: "routineId",  });

/*
Creates a new routine in the dataset.
*/
await gapi.client.bigquery.routines.insert({ datasetId: "datasetId", projectId: "projectId",  });

/*
Lists all routines in the specified dataset. Requires the READER dataset role.
*/
await gapi.client.bigquery.routines.list({ datasetId: "datasetId", projectId: "projectId",  });

/*
Updates information in an existing routine. The update method replaces the entire Routine resource.
*/
await gapi.client.bigquery.routines.update({ datasetId: "datasetId", projectId: "projectId", routineId: "routineId",  });

/*
Streams data into BigQuery one record at a time without needing to run a load job. Requires the WRITER dataset role.
*/
await gapi.client.bigquery.tabledata.insertAll({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  });

/*
Retrieves table data from a specified set of rows. Requires the READER dataset role.
*/
await gapi.client.bigquery.tabledata.list({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  });

/*
Deletes the table specified by tableId from the dataset. If the table contains data, all the data will be deleted.
*/
await gapi.client.bigquery.tables.delete({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  });

/*
Gets the specified table resource by table ID. This method does not return the data in the table, it only returns the table resource, which describes the structure of this table.
*/
await gapi.client.bigquery.tables.get({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  });

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.bigquery.tables.getIamPolicy({ resource: "resource",  });

/*
Creates a new, empty table in the dataset.
*/
await gapi.client.bigquery.tables.insert({ datasetId: "datasetId", projectId: "projectId",  });

/*
Lists all tables in the specified dataset. Requires the READER dataset role.
*/
await gapi.client.bigquery.tables.list({ datasetId: "datasetId", projectId: "projectId",  });

/*
Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource. This method supports patch semantics.
*/
await gapi.client.bigquery.tables.patch({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
*/
await gapi.client.bigquery.tables.setIamPolicy({ resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
*/
await gapi.client.bigquery.tables.testIamPermissions({ resource: "resource",  });

/*
Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource.
*/
await gapi.client.bigquery.tables.update({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  });
```
