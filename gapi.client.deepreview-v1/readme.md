# TypeScript typings for Deep Review API v1

Deep Review API for automated, in-depth document reviews.
For detailed description please check [documentation](https://research.google/deepreview).

## Installing

Install typings for Deep Review API:

```
npm install @types/gapi.client.deepreview-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["gapi", "gapi.auth2", "gapi.client", "gapi.client.deepreview-v1"]
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
  'https://deepreview.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.deepreview
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('deepreview', 'v1', () => {
  // now we can use:
  // gapi.client.deepreview
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, create, and delete only the specific Google Drive files you use with this app
    'https://www.googleapis.com/auth/drive.file',
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

After that you can use Deep Review API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Deletes a document and all associated reviews and stored blobs.
*/
await gapi.client.deepreview.documents.delete({name: 'name'});

/*
Retrieves document metadata and review history.
*/
await gapi.client.deepreview.documents.get({name: 'name'});

/*
Lists documents for the authenticated caller with cursor pagination.
*/
await gapi.client.deepreview.documents.list({});

/*
Downloads the original document content (PDF binary) via Scotty media streaming (AIP-136 custom method).
*/
await gapi.client.deepreview.media.download({name: 'name'});

/*
Creates a new Document resource and ingests the manuscript via Scotty or Google Drive.
*/
await gapi.client.deepreview.media.upload({});

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
*/
await gapi.client.deepreview.operations.cancel({name: 'name'});

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.deepreview.operations.delete({name: 'name'});

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.deepreview.operations.list({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.deepreview-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
