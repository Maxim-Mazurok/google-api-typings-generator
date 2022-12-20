# TypeScript typings for Service Usage API v1

Enables services that service consumers want to use on Google Cloud Platform, lists the available or enabled services, or disables services that service consumers no longer use.
For detailed description please check [documentation](https://cloud.google.com/service-usage/).

## Installing

Install typings for Service Usage API:

```
npm install @types/gapi.client.serviceusage-v1 --save-dev
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
gapi.client.load('https://serviceusage.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.serviceusage
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('serviceusage', 'v1', () => {
  // now we can use:
  // gapi.client.serviceusage
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

      // Manage your Google API service configuration
      'https://www.googleapis.com/auth/service.management',
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

After that you can use Service Usage API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.serviceusage.operations.cancel({ name: "name",  });

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.serviceusage.operations.delete({ name: "name",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.serviceusage.operations.get({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/*/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/*}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
*/
await gapi.client.serviceusage.operations.list({  });

/*
Enable multiple services on a project. The operation is atomic: if enabling any service fails, then the entire batch fails, and no state changes occur. To enable a single service, use the `EnableService` method instead.
*/
await gapi.client.serviceusage.services.batchEnable({ parent: "parent",  });

/*
Returns the service configurations and enabled states for a given list of services.
*/
await gapi.client.serviceusage.services.batchGet({ parent: "parent",  });

/*
Disable a service so that it can no longer be used with a project. This prevents unintended usage that may cause unexpected billing charges or security leaks. It is not valid to call the disable method on a service that is not currently enabled. Callers will receive a `FAILED_PRECONDITION` status if the target service is not currently enabled.
*/
await gapi.client.serviceusage.services.disable({ name: "name",  });

/*
Enable a service so that it can be used with a project.
*/
await gapi.client.serviceusage.services.enable({ name: "name",  });

/*
Returns the service configuration and enabled state for a given service.
*/
await gapi.client.serviceusage.services.get({ name: "name",  });

/*
List all services available to the specified project, and the current state of those services with respect to the project. The list includes all public services, all services for which the calling user has the `servicemanagement.services.bind` permission, and all services that have already been enabled on the project. The list can be filtered to only include services in a specific state, for example to only include services enabled on the project. WARNING: If you need to query enabled services frequently or across an organization, you should use [Cloud Asset Inventory API](https://cloud.google.com/asset-inventory/docs/apis), which provides higher throughput and richer filtering capability.
*/
await gapi.client.serviceusage.services.list({ parent: "parent",  });
```
