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
gapi.load("client", () => { 
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

gapi.auth.authorize({ client_id: client_id, scope: scope, immediate: immediate }, authResult => {
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
await gapi.client.datasets.delete({ projectId: "projectId", datasetId: "datasetId",  }); 
    
/* 
Returns the dataset specified by datasetID.  
*/
await gapi.client.datasets.get({ datasetId: "datasetId", projectId: "projectId",  }); 
    
/* 
Creates a new empty dataset.  
*/
await gapi.client.datasets.insert({ projectId: "projectId",  }); 
    
/* 
Lists all datasets in the specified project to which you have been granted the READER dataset role.  
*/
await gapi.client.datasets.list({ projectId: "projectId",  }); 
    
/* 
Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. This method supports patch semantics.  
*/
await gapi.client.datasets.patch({ projectId: "projectId", datasetId: "datasetId",  }); 
    
/* 
Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource.  
*/
await gapi.client.datasets.update({ projectId: "projectId", datasetId: "datasetId",  }); 
    
/* 
Requests that a job be cancelled. This call will return immediately, and the client will need to poll for the job status to see if the cancel completed successfully. Cancelled jobs may still incur costs.  
*/
await gapi.client.jobs.cancel({ jobId: "jobId", projectId: "projectId",  }); 
    
/* 
Returns information about a specific job. Job information is available for a six month period after creation. Requires that you're the person who ran the job, or have the Is Owner project role.  
*/
await gapi.client.jobs.get({ jobId: "jobId", projectId: "projectId",  }); 
    
/* 
Retrieves the results of a query job.  
*/
await gapi.client.jobs.getQueryResults({ jobId: "jobId", projectId: "projectId",  }); 
    
/* 
Starts a new asynchronous job. Requires the Can View project role.  
*/
await gapi.client.jobs.insert({ projectId: "projectId",  }); 
    
/* 
Lists all jobs that you started in the specified project. Job information is available for a six month period after creation. The job list is sorted in reverse chronological order, by job creation time. Requires the Can View project role, or the Is Owner project role if you set the allUsers property.  
*/
await gapi.client.jobs.list({ projectId: "projectId",  }); 
    
/* 
Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout.  
*/
await gapi.client.jobs.query({ projectId: "projectId",  }); 
    
/* 
Deletes the model specified by modelId from the dataset.  
*/
await gapi.client.models.delete({ projectId: "projectId", datasetId: "datasetId", modelId: "modelId",  }); 
    
/* 
Gets the specified model resource by model ID.  
*/
await gapi.client.models.get({ projectId: "projectId", datasetId: "datasetId", modelId: "modelId",  }); 
    
/* 
Lists all models in the specified dataset. Requires the READER dataset
role.  
*/
await gapi.client.models.list({ datasetId: "datasetId", projectId: "projectId",  }); 
    
/* 
Patch specific fields in the specified model.  
*/
await gapi.client.models.patch({ projectId: "projectId", datasetId: "datasetId", modelId: "modelId",  }); 
    
/* 
Returns the email address of the service account for your project used for interactions with Google Cloud KMS.  
*/
await gapi.client.projects.getServiceAccount({ projectId: "projectId",  }); 
    
/* 
Lists all projects to which you have been granted any project role.  
*/
await gapi.client.projects.list({  }); 
    
/* 
Deletes the routine specified by routineId from the dataset.  
*/
await gapi.client.routines.delete({ projectId: "projectId", datasetId: "datasetId", routineId: "routineId",  }); 
    
/* 
Gets the specified routine resource by routine ID.  
*/
await gapi.client.routines.get({ projectId: "projectId", datasetId: "datasetId", routineId: "routineId",  }); 
    
/* 
Creates a new routine in the dataset.  
*/
await gapi.client.routines.insert({ projectId: "projectId", datasetId: "datasetId",  }); 
    
/* 
Lists all routines in the specified dataset. Requires the READER dataset
role.  
*/
await gapi.client.routines.list({ datasetId: "datasetId", projectId: "projectId",  }); 
    
/* 
Updates information in an existing routine. The update method replaces the
entire Routine resource.  
*/
await gapi.client.routines.update({ projectId: "projectId", datasetId: "datasetId", routineId: "routineId",  }); 
    
/* 
Streams data into BigQuery one record at a time without needing to run a load job. Requires the WRITER dataset role.  
*/
await gapi.client.tabledata.insertAll({ projectId: "projectId", datasetId: "datasetId", tableId: "tableId",  }); 
    
/* 
Retrieves table data from a specified set of rows. Requires the READER dataset role.  
*/
await gapi.client.tabledata.list({ datasetId: "datasetId", projectId: "projectId", tableId: "tableId",  }); 
    
/* 
Deletes the table specified by tableId from the dataset. If the table contains data, all the data will be deleted.  
*/
await gapi.client.tables.delete({ datasetId: "datasetId", tableId: "tableId", projectId: "projectId",  }); 
    
/* 
Gets the specified table resource by table ID. This method does not return the data in the table, it only returns the table resource, which describes the structure of this table.  
*/
await gapi.client.tables.get({ datasetId: "datasetId", tableId: "tableId", projectId: "projectId",  }); 
    
/* 
Creates a new, empty table in the dataset.  
*/
await gapi.client.tables.insert({ datasetId: "datasetId", projectId: "projectId",  }); 
    
/* 
Lists all tables in the specified dataset. Requires the READER dataset role.  
*/
await gapi.client.tables.list({ projectId: "projectId", datasetId: "datasetId",  }); 
    
/* 
Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource. This method supports patch semantics.  
*/
await gapi.client.tables.patch({ tableId: "tableId", projectId: "projectId", datasetId: "datasetId",  }); 
    
/* 
Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource.  
*/
await gapi.client.tables.update({ tableId: "tableId", projectId: "projectId", datasetId: "datasetId",  });
```
