# TypeScript typings for Access Context Manager API v1beta

An API for setting attribute based access control to requests to GCP services.
For detailed description please check [documentation](https://cloud.google.com/access-context-manager/docs/reference/rest/).

## Installing

Install typings for Access Context Manager API:

```
npm install @types/gapi.client.accesscontextmanager-v1beta --save-dev
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
gapi.client.load('https://accesscontextmanager.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.accesscontextmanager
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('accesscontextmanager', 'v1beta', () => {
  // now we can use:
  // gapi.client.accesscontextmanager
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Access Context Manager API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Create an `AccessPolicy`. Fails if this organization already has a `AccessPolicy`. The longrunning Operation will have a successful status once the `AccessPolicy` has propagated to long-lasting storage. Syntactic and basic semantic errors will be returned in `metadata` as a BadRequest proto.
*/
await gapi.client.accesscontextmanager.accessPolicies.create({  });

/*
Delete an AccessPolicy by resource name. The longrunning Operation will have a successful status once the AccessPolicy has been removed from long-lasting storage.
*/
await gapi.client.accesscontextmanager.accessPolicies.delete({ name: "name",  });

/*
Get an AccessPolicy by name.
*/
await gapi.client.accesscontextmanager.accessPolicies.get({ name: "name",  });

/*
List all AccessPolicies under a container.
*/
await gapi.client.accesscontextmanager.accessPolicies.list({  });

/*
Update an AccessPolicy. The longrunning Operation from this RPC will have a successful status once the changes to the AccessPolicy have propagated to long-lasting storage. Syntactic and basic semantic errors will be returned in `metadata` as a BadRequest proto.
*/
await gapi.client.accesscontextmanager.accessPolicies.patch({ name: "name",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.accesscontextmanager.operations.get({ name: "name",  });
```
