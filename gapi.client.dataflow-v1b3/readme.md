# TypeScript typings for Dataflow API v1b3

Manages Google Cloud Dataflow projects on Google Cloud Platform.
For detailed description please check [documentation](https://cloud.google.com/dataflow).

## Installing

Install typings for Dataflow API:

```
npm install @types/gapi.client.dataflow-v1b3 --save-dev
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
gapi.client.load('https://dataflow.googleapis.com/$discovery/rest?version=v1b3', () => {
  // now we can use:
  // gapi.client.dataflow
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('dataflow', 'v1b3', () => {
  // now we can use:
  // gapi.client.dataflow
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and manage your Google Compute Engine resources
      'https://www.googleapis.com/auth/compute',

      // View your Google Compute Engine resources
      'https://www.googleapis.com/auth/compute.readonly',

      // See your primary Google Account email address
      'https://www.googleapis.com/auth/userinfo.email',
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

After that you can use Dataflow API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Deletes a snapshot.
*/
await gapi.client.dataflow.projects.deleteSnapshots({ projectId: "projectId",  });

/*
Send a worker_message to the service.
*/
await gapi.client.dataflow.projects.workerMessages({ projectId: "projectId",  });
```
