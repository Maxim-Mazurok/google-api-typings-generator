# TypeScript typings for Access Context Manager API v1

An API for setting attribute based access control to requests to GCP services.
For detailed description please check [documentation](https://cloud.google.com/access-context-manager/docs/reference/rest/).

## Installing

Install typings for Access Context Manager API:

```
npm install @types/gapi.client.accesscontextmanager-v1 --save-dev
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
gapi.client.load('https://accesscontextmanager.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.accesscontextmanager
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('accesscontextmanager', 'v1', () => {
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
Creates an access policy. This method fails if the organization already has an access policy. The long-running operation has a successful status after the access policy propagates to long-lasting storage. Syntactic and basic semantic errors are returned in `metadata` as a BadRequest proto.
*/
await gapi.client.accesscontextmanager.accessPolicies.create({  });

/*
Deletes an access policy based on the resource name. The long-running operation has a successful status after the access policy is removed from long-lasting storage.
*/
await gapi.client.accesscontextmanager.accessPolicies.delete({ name: "name",  });

/*
Returns an access policy based on the name.
*/
await gapi.client.accesscontextmanager.accessPolicies.get({ name: "name",  });

/*
Gets the IAM policy for the specified Access Context Manager access policy.
*/
await gapi.client.accesscontextmanager.accessPolicies.getIamPolicy({ resource: "resource",  });

/*
Lists all access policies in an organization.
*/
await gapi.client.accesscontextmanager.accessPolicies.list({  });

/*
Updates an access policy. The long-running operation from this RPC has a successful status after the changes to the access policy propagate to long-lasting storage.
*/
await gapi.client.accesscontextmanager.accessPolicies.patch({ name: "name",  });

/*
Sets the IAM policy for the specified Access Context Manager access policy. This method replaces the existing IAM policy on the access policy. The IAM policy controls the set of users who can perform specific operations on the Access Context Manager access policy.
*/
await gapi.client.accesscontextmanager.accessPolicies.setIamPolicy({ resource: "resource",  });

/*
Returns the IAM permissions that the caller has on the specified Access Context Manager resource. The resource can be an AccessPolicy, AccessLevel, or ServicePerimeter. This method does not support other resources.
*/
await gapi.client.accesscontextmanager.accessPolicies.testIamPermissions({ resource: "resource",  });

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.accesscontextmanager.operations.cancel({ name: "name",  });

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.accesscontextmanager.operations.delete({ name: "name",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.accesscontextmanager.operations.get({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/*/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/*}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
*/
await gapi.client.accesscontextmanager.operations.list({ name: "name",  });
```
