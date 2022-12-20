# TypeScript typings for Genomics API v2alpha1

Uploads, processes, queries, and searches Genomics data in the cloud.
For detailed description please check [documentation](https://cloud.google.com/genomics).

## Installing

Install typings for Genomics API:

```
npm install @types/gapi.client.genomics-v2alpha1 --save-dev
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
gapi.client.load('https://genomics.googleapis.com/$discovery/rest?version=v2alpha1', () => {
  // now we can use:
  // gapi.client.genomics
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('genomics', 'v2alpha1', () => {
  // now we can use:
  // gapi.client.genomics
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and manage Genomics data
      'https://www.googleapis.com/auth/genomics',
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

After that you can use Genomics API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Runs a pipeline. The returned Operation's metadata field will contain a google.genomics.v2alpha1.Metadata object describing the status of the pipeline execution. The [response] field will contain a google.genomics.v2alpha1.RunPipelineResponse object if the pipeline completes successfully. **Note:** Before you can use this method, the Genomics Service Agent must have access to your project. This is done automatically when the Cloud Genomics API is first enabled, but if you delete this permission, or if you enabled the Cloud Genomics API before the v2alpha1 API launch, you must disable and re-enable the API to grant the Genomics Service Agent the required permissions. Authorization requires the following [Google IAM](https://cloud.google.com/iam/) permission: * `genomics.operations.create` [1]: /genomics/gsa
*/
await gapi.client.genomics.pipelines.run({  });

/*
The worker uses this method to retrieve the assigned operation and provide periodic status updates.
*/
await gapi.client.genomics.workers.checkIn({ id: "id",  });
```
