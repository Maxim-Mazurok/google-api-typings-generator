# TypeScript typings for Vertex AI API v1beta1

Train high-quality custom machine learning models with minimal machine learning expertise and effort.
For detailed description please check [documentation](https://cloud.google.com/vertex-ai/).

## Installing

Install typings for Vertex AI API:

```
npm install @types/gapi.client.aiplatform-v1beta1 --save-dev
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
  'https://aiplatform.googleapis.com/$discovery/rest?version=v1beta1',
  () => {
    // now we can use:
    // gapi.client.aiplatform
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('aiplatform', 'v1beta1', () => {
  // now we can use:
  // gapi.client.aiplatform
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
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
  },
);
```

After that you can use Vertex AI API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Creates a BatchPredictionJob. A BatchPredictionJob once created will right away be attempted to start.
*/
await gapi.client.aiplatform.batchPredictionJobs.create({});

/*
Gets a BatchPredictionJob
*/
await gapi.client.aiplatform.batchPredictionJobs.get({name: 'name'});

/*
Lists BatchPredictionJobs in a Location.
*/
await gapi.client.aiplatform.batchPredictionJobs.list({});

/*
Creates a Dataset.
*/
await gapi.client.aiplatform.datasets.create({});

/*
Deletes a Dataset.
*/
await gapi.client.aiplatform.datasets.delete({name: 'name'});

/*
Gets a Dataset.
*/
await gapi.client.aiplatform.datasets.get({name: 'name'});

/*
Lists Datasets in a Location.
*/
await gapi.client.aiplatform.datasets.list({});

/*
Updates a Dataset.
*/
await gapi.client.aiplatform.datasets.patch({name: 'name'});

/*
Return a list of tokens based on the input text.
*/
await gapi.client.aiplatform.endpoints.computeTokens({endpoint: 'endpoint'});

/*
Perform a token counting.
*/
await gapi.client.aiplatform.endpoints.countTokens({endpoint: 'endpoint'});

/*
Fetch an asynchronous online prediction operation.
*/
await gapi.client.aiplatform.endpoints.fetchPredictOperation({
  endpoint: 'endpoint',
});

/*
Generate content with multimodal inputs.
*/
await gapi.client.aiplatform.endpoints.generateContent({model: 'model'});

/*
Perform an online prediction.
*/
await gapi.client.aiplatform.endpoints.predict({endpoint: 'endpoint'});

/*

*/
await gapi.client.aiplatform.endpoints.predictLongRunning({
  endpoint: 'endpoint',
});

/*
Generate content with multimodal inputs with streaming support.
*/
await gapi.client.aiplatform.endpoints.streamGenerateContent({model: 'model'});

/*
Upload a file into a RagCorpus.
*/
await gapi.client.aiplatform.media.upload({parent: 'parent'});

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
*/
await gapi.client.aiplatform.operations.cancel({name: 'name'});

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.aiplatform.operations.delete({name: 'name'});

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.aiplatform.operations.get({name: 'name'});

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.aiplatform.operations.list({});

/*
Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done.
*/
await gapi.client.aiplatform.operations.wait({name: 'name'});

/*
Fetches the configs of publisher models.
*/
await gapi.client.aiplatform.projects.fetchPublisherModelConfig({name: 'name'});

/*
Gets a GenAI cache config.
*/
await gapi.client.aiplatform.projects.getCacheConfig({name: 'name'});

/*
Sets (creates or updates) configs of publisher models. For example, sets the request/response logging config.
*/
await gapi.client.aiplatform.projects.setPublisherModelConfig({name: 'name'});

/*
Updates a cache config.
*/
await gapi.client.aiplatform.projects.updateCacheConfig({name: 'name'});

/*
Creates a reasoning engine.
*/
await gapi.client.aiplatform.reasoningEngines.create({});

/*
Deletes a reasoning engine.
*/
await gapi.client.aiplatform.reasoningEngines.delete({name: 'name'});

/*
Gets a reasoning engine.
*/
await gapi.client.aiplatform.reasoningEngines.get({name: 'name'});

/*
Lists reasoning engines in a location.
*/
await gapi.client.aiplatform.reasoningEngines.list({});

/*
Updates a reasoning engine.
*/
await gapi.client.aiplatform.reasoningEngines.patch({name: 'name'});

/*
Queries using a reasoning engine.
*/
await gapi.client.aiplatform.reasoningEngines.query({name: 'name'});

/*
Streams queries using a reasoning engine.
*/
await gapi.client.aiplatform.reasoningEngines.streamQuery({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.aiplatform-v1beta1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
