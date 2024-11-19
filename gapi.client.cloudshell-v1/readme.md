# TypeScript typings for Cloud Shell API v1

Allows users to start, configure, and connect to interactive shell sessions running in the cloud.
For detailed description please check [documentation](https://cloud.google.com/shell/docs/).

## Installing

Install typings for Cloud Shell API:

```
npm install @types/gapi.client.cloudshell-v1 --save-dev
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
  'https://cloudshell.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.cloudshell
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudshell', 'v1', () => {
  // now we can use:
  // gapi.client.cloudshell
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

After that you can use Cloud Shell API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
*/
await gapi.client.cloudshell.operations.cancel({name: 'name'});

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.cloudshell.operations.delete({name: 'name'});

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudshell.operations.get({name: 'name'});

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.cloudshell.operations.list({name: 'name'});
```
