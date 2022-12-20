# TypeScript typings for Service Usage API v1beta1

Enables services that service consumers want to use on Google Cloud Platform, lists the available or enabled services, or disables services that service consumers no longer use.
For detailed description please check [documentation](https://cloud.google.com/service-usage/).

## Installing

Install typings for Service Usage API:

```
npm install @types/gapi.client.serviceusage-v1beta1 --save-dev
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
gapi.client.load('https://serviceusage.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.serviceusage
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('serviceusage', 'v1beta1', () => {
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
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.serviceusage.operations.get({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/*/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/*}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
*/
await gapi.client.serviceusage.operations.list({  });

/*
Enables multiple services on a project. The operation is atomic: if enabling any service fails, then the entire batch fails, and no state changes occur. Operation response type: `google.protobuf.Empty`
*/
await gapi.client.serviceusage.services.batchEnable({ parent: "parent",  });

/*
Disables a service so that it can no longer be used with a project. This prevents unintended usage that may cause unexpected billing charges or security leaks. It is not valid to call the disable method on a service that is not currently enabled. Callers will receive a `FAILED_PRECONDITION` status if the target service is not currently enabled. Operation response type: `google.protobuf.Empty`
*/
await gapi.client.serviceusage.services.disable({ name: "name",  });

/*
Enables a service so that it can be used with a project. Operation response type: `google.protobuf.Empty`
*/
await gapi.client.serviceusage.services.enable({ name: "name",  });

/*
Generates service identity for service.
*/
await gapi.client.serviceusage.services.generateServiceIdentity({ parent: "parent",  });

/*
Returns the service configuration and enabled state for a given service.
*/
await gapi.client.serviceusage.services.get({ name: "name",  });

/*
Lists all services available to the specified project, and the current state of those services with respect to the project. The list includes all public services, all services for which the calling user has the `servicemanagement.services.bind` permission, and all services that have already been enabled on the project. The list can be filtered to only include services in a specific state, for example to only include services enabled on the project.
*/
await gapi.client.serviceusage.services.list({ parent: "parent",  });
```
