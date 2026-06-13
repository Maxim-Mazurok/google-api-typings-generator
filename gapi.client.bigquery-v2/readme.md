# TypeScript typings for BigQuery API v2

A data platform for customers to create, manage, share and query data.
For detailed description please check [documentation](https://cloud.google.com/bigquery/).

## Installing

Install typings for BigQuery API:

```
npm install @types/gapi.client.bigquery-v2 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["gapi", "gapi.auth2", "gapi.client", "gapi.client.bigquery-v2"]
  }
}
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
  'https://bigquery.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.bigquery
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('bigquery', 'v2', () => {
  // now we can use:
  // gapi.client.bigquery
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your data in Google BigQuery and see the email address for your Google Account
    'https://www.googleapis.com/auth/bigquery',

    // Insert data into Google BigQuery
    'https://www.googleapis.com/auth/bigquery.insertdata',

    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View your data across Google Cloud services and see the email address of your Google Account
    'https://www.googleapis.com/auth/cloud-platform.read-only',

    // Manage your data and permissions in Cloud Storage and see the email address for your Google Account
    'https://www.googleapis.com/auth/devstorage.full_control',

    // View your data in Google Cloud Storage
    'https://www.googleapis.com/auth/devstorage.read_only',

    // Manage your data in Cloud Storage and see the email address of your Google Account
    'https://www.googleapis.com/auth/devstorage.read_write',
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

After that you can use BigQuery API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Deletes the dataset specified by the datasetId value. Before you can delete a dataset, you must delete all its tables, either manually or by specifying deleteContents. Immediately after deletion, you can create another dataset with the same name. # IAM Permissions Requires the `bigquery.datasets.delete` permission on the dataset.
*/
await gapi.client.bigquery.datasets.delete({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Returns the dataset specified by datasetID. # IAM Permissions Requires the `bigquery.datasets.get` permission on the dataset.
*/
await gapi.client.bigquery.datasets.get({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Creates a new empty dataset. # IAM Permissions Requires the `bigquery.datasets.create` permission on the project.
*/
await gapi.client.bigquery.datasets.insert({projectId: 'projectId'});

/*
Lists all datasets in the specified project to which the user has been granted the READER dataset role. # IAM Permissions Requires no specific IAM permission(s) to use this method. Results are filtered to only include datasets on which the caller has the `bigquery.datasets.get` permission.
*/
await gapi.client.bigquery.datasets.list({projectId: 'projectId'});

/*
Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. This method supports RFC5789 patch semantics. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.datasets.update` on the dataset. - `bigquery.datasets.get` on the dataset.
*/
await gapi.client.bigquery.datasets.patch({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Undeletes a dataset which is within time travel window based on datasetId. If a time is specified, the dataset version deleted at that time is undeleted, else the last live version is undeleted. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.datasets.create` on the project. - `bigquery.datasets.get` on the dataset.
*/
await gapi.client.bigquery.datasets.undelete({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. # IAM Permissions Requires the `bigquery.datasets.update` permission on the dataset.
*/
await gapi.client.bigquery.datasets.update({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Requests that a job be cancelled. This call will return immediately, and the client will need to poll for the job status to see if the cancel completed successfully. Cancelled jobs may still incur costs. # IAM Permissions Requires the `bigquery.jobs.update` permission on the job resource. If the user matches the creator of the job, the `bigquery.jobs.create` permission on the project is required instead.
*/
await gapi.client.bigquery.jobs.cancel({
  jobId: 'jobId',
  projectId: 'projectId',
});

/*
Requests the deletion of the metadata of a job. This call returns when the job's metadata is deleted. # IAM Permissions Requires the `bigquery.jobs.delete` permission on the job resource.
*/
await gapi.client.bigquery.jobs.delete({
  jobId: 'jobId',
  projectId: 'projectId',
});

/*
Returns information about a specific job. Job information is available for a six month period after creation. Requires that you're the person who ran the job, or have the Is Owner project role. # IAM Permissions Requires the `bigquery.jobs.get` permission on the job resource. If the user matches the creator of the job, the `bigquery.jobs.create` permission on the project is required instead.
*/
await gapi.client.bigquery.jobs.get({jobId: 'jobId', projectId: 'projectId'});

/*
RPC to get the results of a query job. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.jobs.get` on the job. - `bigquery.tables.getData` on the destination table. If the user matches the creator of the job, the following IAM permission(s) are required instead: - `bigquery.jobs.create` on the project. - `bigquery.tables.getData` on the destination table.
*/
await gapi.client.bigquery.jobs.getQueryResults({
  jobId: 'jobId',
  projectId: 'projectId',
});

/*
Starts a new asynchronous job. This API has two different kinds of endpoint URIs, as this method supports a variety of use cases. * The *Metadata* URI is used for most interactions, as it accepts the job configuration directly. * The *Upload* URI is ONLY for the case when you're sending both a load job configuration and a data stream together. In this case, the Upload URI accepts the job configuration and the data as two distinct multipart MIME parts. # IAM Permissions Requires the `bigquery.jobs.create` permission on the project resource. Additional permissions are required depending on the job type: - **Load, Export, and Copy jobs**: Generally require data-level permissions such as `bigquery.tables.export` or access to external storage. - **Query jobs**: Permissions are dependent on the SQL statement. Complex queries (DDL, DCL) may require additional permissions to create reservations, modify IAM policies, or update project settings.
*/
await gapi.client.bigquery.jobs.insert({projectId: 'projectId'});

/*
Lists all jobs that you started in the specified project. Job information is available for a six month period after creation. The job list is sorted in reverse chronological order, by job creation time. Requires the Can View project role, or the Is Owner project role if you set the allUsers property. # IAM Permissions Requires no specific IAM permission(s) to use this method. Users are able to list the jobs they created. Additional access is granted based on the following permissions: - Users with the `bigquery.jobs.listAll` permission can list all jobs with all metadata. - Users with the `bigquery.jobs.list` permission can list all jobs, but with redacted information for jobs they did not create.
*/
await gapi.client.bigquery.jobs.list({projectId: 'projectId'});

/*
Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout. # IAM Permissions Requires the `bigquery.jobs.create` permission on the project resource. Data-level permissions are highly dependent on the SQL statement being executed. While standard queries require data access (such as `bigquery.tables.getData`), complex operations like DDL or DCL may require permissions to manage reservations, IAM policies, or project settings.
*/
await gapi.client.bigquery.jobs.query({projectId: 'projectId'});

/*
Deletes the model specified by modelId from the dataset. # IAM Permissions Requires the `bigquery.models.delete` permission on the model.
*/
await gapi.client.bigquery.models.delete({
  datasetId: 'datasetId',
  modelId: 'modelId',
  projectId: 'projectId',
});

/*
Gets the specified model resource by model ID. # IAM Permissions Requires the `bigquery.models.getMetadata` permission on the model.
*/
await gapi.client.bigquery.models.get({
  datasetId: 'datasetId',
  modelId: 'modelId',
  projectId: 'projectId',
});

/*
Lists all models in the specified dataset. Requires the READER dataset role. After retrieving the list of models, you can get information about a particular model by calling the models.get method. # IAM Permissions Requires the `bigquery.models.list` permission on the dataset.
*/
await gapi.client.bigquery.models.list({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Patch specific fields in the specified model. # IAM Permissions Requires the `bigquery.models.updateMetadata` permission on the model.
*/
await gapi.client.bigquery.models.patch({
  datasetId: 'datasetId',
  modelId: 'modelId',
  projectId: 'projectId',
});

/*
RPC to get the service account for a project used for interactions with Google Cloud KMS. Requires the `bigquery.jobs.create` permission on the project resource. This permission is required to authorize the retrieval of the project's service identity for technical management tasks like encryption configuration.
*/
await gapi.client.bigquery.projects.getServiceAccount({projectId: 'projectId'});

/*
RPC to list projects to which the user has been granted any project role. Users of this method are encouraged to consider the [Resource Manager](https://cloud.google.com/resource-manager/docs/) API, which provides the underlying data for this method and has more capabilities. # IAM Permissions Requires no specific IAM permission(s) to use this method. The results are filtered to only include projects on which the caller has been granted a project-level role such as a BigQuery predefined IAM role or a basic role such as Viewer or Owner.
*/
await gapi.client.bigquery.projects.list({});

/*
Deletes the routine specified by routineId from the dataset. # IAM Permissions Requires the `bigquery.routines.delete` permission on the routine.
*/
await gapi.client.bigquery.routines.delete({
  datasetId: 'datasetId',
  projectId: 'projectId',
  routineId: 'routineId',
});

/*
Gets the specified routine resource by routine ID. # IAM Permissions Requires the `bigquery.routines.get` permission on the routine.
*/
await gapi.client.bigquery.routines.get({
  datasetId: 'datasetId',
  projectId: 'projectId',
  routineId: 'routineId',
});

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.bigquery.routines.getIamPolicy({resource: 'resource'});

/*
Creates a new routine in the dataset. # IAM Permissions Requires the `bigquery.routines.create` permission on the dataset.
*/
await gapi.client.bigquery.routines.insert({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Lists all routines in the specified dataset. Requires the READER dataset role. # IAM Permissions Requires the `bigquery.routines.list` permission on the dataset.
*/
await gapi.client.bigquery.routines.list({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
*/
await gapi.client.bigquery.routines.setIamPolicy({resource: 'resource'});

/*
Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
*/
await gapi.client.bigquery.routines.testIamPermissions({resource: 'resource'});

/*
Updates information in an existing routine. The update method replaces the entire Routine resource. # IAM Permissions Requires the `bigquery.routines.update` permission on the routine.
*/
await gapi.client.bigquery.routines.update({
  datasetId: 'datasetId',
  projectId: 'projectId',
  routineId: 'routineId',
});

/*
Deletes provided row access policies. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.delete` - `bigquery.rowAccessPolicies.setIamPolicy`
*/
await gapi.client.bigquery.rowAccessPolicies.batchDelete({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Deletes a row access policy. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.delete` - `bigquery.rowAccessPolicies.setIamPolicy`
*/
await gapi.client.bigquery.rowAccessPolicies.delete({
  datasetId: 'datasetId',
  policyId: 'policyId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Gets the specified row access policy by policy ID. # IAM Permissions Requires the `bigquery.rowAccessPolicies.get` permission on the table.
*/
await gapi.client.bigquery.rowAccessPolicies.get({
  datasetId: 'datasetId',
  policyId: 'policyId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.bigquery.rowAccessPolicies.getIamPolicy({
  resource: 'resource',
});

/*
Creates a row access policy. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.create` - `bigquery.rowAccessPolicies.setIamPolicy` - `bigquery.tables.getData`
*/
await gapi.client.bigquery.rowAccessPolicies.insert({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Lists all row access policies on the specified table. # IAM Permissions Requires the `bigquery.rowAccessPolicies.list` permission on the table.
*/
await gapi.client.bigquery.rowAccessPolicies.list({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
*/
await gapi.client.bigquery.rowAccessPolicies.testIamPermissions({
  resource: 'resource',
});

/*
Updates a row access policy. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.rowAccessPolicies.update` - `bigquery.rowAccessPolicies.setIamPolicy` - `bigquery.tables.getData`
*/
await gapi.client.bigquery.rowAccessPolicies.update({
  datasetId: 'datasetId',
  policyId: 'policyId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Streams data into BigQuery one record at a time without needing to run a load job. # IAM Permissions Requires the following IAM permission(s) to use this method: - `bigquery.tables.updateData` on the table. - `bigquery.tables.get` on the table. - `bigquery.datasets.get` on the dataset.
*/
await gapi.client.bigquery.tabledata.insertAll({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
List the content of a table in rows. # IAM Permissions Requires the `bigquery.tables.getData` permission on the table.
*/
await gapi.client.bigquery.tabledata.list({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Deletes the table specified by tableId from the dataset. If the table contains data, all the data will be deleted. # IAM Permissions Requires the `bigquery.tables.delete` permission on the table.
*/
await gapi.client.bigquery.tables.delete({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Gets the specified table resource by table ID. This method does not return the data in the table, it only returns the table resource, which describes the structure of this table. # IAM Permissions Requires the `bigquery.tables.get` permission on the table.
*/
await gapi.client.bigquery.tables.get({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.bigquery.tables.getIamPolicy({resource: 'resource'});

/*
Creates a new, empty table in the dataset. # IAM Permissions Requires the `bigquery.tables.create` permission on the dataset.
*/
await gapi.client.bigquery.tables.insert({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Lists all tables in the specified dataset. Requires the READER dataset role. # IAM Permissions Requires the `bigquery.tables.list` permission on the dataset.
*/
await gapi.client.bigquery.tables.list({
  datasetId: 'datasetId',
  projectId: 'projectId',
});

/*
Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource. This method supports RFC5789 patch semantics. # IAM Permissions Requires the following IAM permission(s) on the table: - `bigquery.tables.update` - `bigquery.tables.get`
*/
await gapi.client.bigquery.tables.patch({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});

/*
Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
*/
await gapi.client.bigquery.tables.setIamPolicy({resource: 'resource'});

/*
Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
*/
await gapi.client.bigquery.tables.testIamPermissions({resource: 'resource'});

/*
Updates information in an existing table. The update method replaces the entire Table resource, whereas the patch method only replaces fields that are provided in the submitted Table resource. # IAM Permissions Requires the `bigquery.tables.update` permission on the table.
*/
await gapi.client.bigquery.tables.update({
  datasetId: 'datasetId',
  projectId: 'projectId',
  tableId: 'tableId',
});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.bigquery-v2#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
