# TypeScript typings for Storage Transfer API v1

Transfers data from external data sources to a Google Cloud Storage bucket or between Google Cloud Storage buckets.
For detailed description please check [documentation](https://cloud.google.com/storage-transfer/docs).

## Installing

Install typings for Storage Transfer API:

```
npm install @types/gapi.client.storagetransfer-v1 --save-dev
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
  'https://storagetransfer.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.storagetransfer
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('storagetransfer', 'v1', () => {
  // now we can use:
  // gapi.client.storagetransfer
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',
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

After that you can use Storage Transfer API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Returns the Google service account that is used by Storage Transfer Service to access buckets in the project where transfers run or in other projects. Each Google service account is associated with one Google Cloud project. Users should add this service account to the Google Cloud Storage bucket ACLs to grant access to Storage Transfer Service. This service account is created and owned by Storage Transfer Service and can only be used by Storage Transfer Service.
*/
await gapi.client.storagetransfer.googleServiceAccounts.get({
  projectId: 'projectId',
});

/*
Creates a transfer job that runs periodically.
*/
await gapi.client.storagetransfer.transferJobs.create({});

/*
Deletes a transfer job. Deleting a transfer job sets its status to DELETED.
*/
await gapi.client.storagetransfer.transferJobs.delete({
  jobName: 'jobName',
  projectId: 'projectId',
});

/*
Gets a transfer job.
*/
await gapi.client.storagetransfer.transferJobs.get({
  jobName: 'jobName',
  projectId: 'projectId',
});

/*
Lists transfer jobs.
*/
await gapi.client.storagetransfer.transferJobs.list({filter: 'filter'});

/*
Updates a transfer job. Updating a job's transfer spec does not affect transfer operations that are running already. **Note:** The job's status field can be modified using this RPC (for example, to set a job's status to DELETED, DISABLED, or ENABLED).
*/
await gapi.client.storagetransfer.transferJobs.patch({jobName: 'jobName'});

/*
Starts a new operation for the specified transfer job. A `TransferJob` has a maximum of one active `TransferOperation`. If this method is called while a `TransferOperation` is active, an error is returned.
*/
await gapi.client.storagetransfer.transferJobs.run({jobName: 'jobName'});

/*
Cancels a transfer. Use the transferOperations.get method to check if the cancellation succeeded or if the operation completed despite the `cancel` request. When you cancel an operation, the currently running transfer is interrupted. For recurring transfer jobs, the next instance of the transfer job will still run. For example, if your job is configured to run every day at 1pm and you cancel Monday's operation at 1:05pm, Monday's transfer will stop. However, a transfer job will still be attempted on Tuesday. This applies only to currently running operations. If an operation is not currently running, `cancel` does nothing. *Caution:* Canceling a transfer job can leave your data in an unknown state. We recommend that you restore the state at both the destination and the source after the `cancel` request completes so that your data is in a consistent state. When you cancel a job, the next job computes a delta of files and may repair any inconsistent state. For instance, if you run a job every day, and today's job found 10 new files and transferred five files before you canceled the job, tomorrow's transfer operation will compute a new delta with the five files that were not copied today plus any new files discovered tomorrow.
*/
await gapi.client.storagetransfer.transferOperations.cancel({name: 'name'});

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.storagetransfer.transferOperations.get({name: 'name'});

/*
Lists transfer operations. Operations are ordered by their creation time in reverse chronological order.
*/
await gapi.client.storagetransfer.transferOperations.list({
  filter: 'filter',
  name: 'name',
});

/*
Pauses a transfer operation.
*/
await gapi.client.storagetransfer.transferOperations.pause({name: 'name'});

/*
Resumes a transfer operation that is paused.
*/
await gapi.client.storagetransfer.transferOperations.resume({name: 'name'});
```