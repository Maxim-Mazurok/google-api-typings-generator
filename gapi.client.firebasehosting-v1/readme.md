# TypeScript typings for Firebase Hosting API v1

The Firebase Hosting REST API enables programmatic and customizable management and deployments to your Firebase-hosted sites. Use this REST API to create and manage channels and sites as well as to deploy new or updated hosting configurations and content files.
For detailed description please check [documentation](https://firebase.google.com/docs/hosting/).

## Installing

Install typings for Firebase Hosting API:

```
npm install @types/gapi.client.firebasehosting-v1 --save-dev
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
gapi.client.load('https://firebasehosting.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.firebasehosting
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebasehosting', 'v1', () => {
  // now we can use:
  // gapi.client.firebasehosting
});
```



After that you can use Firebase Hosting API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.firebasehosting.operations.cancel({ name: "name",  });

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.firebasehosting.operations.delete({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/*/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/*}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
*/
await gapi.client.firebasehosting.operations.list({ name: "name",  });
```
