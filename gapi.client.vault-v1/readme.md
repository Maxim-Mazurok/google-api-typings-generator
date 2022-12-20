# TypeScript typings for Google Vault API v1

Retention and eDiscovery for Google Workspace. To work with Vault resources, the account must have the [required Vault privileges](https://support.google.com/vault/answer/2799699) and access to the matter. To access a matter, the account must have created the matter, have the matter shared with them, or have the **View All Matters** privilege. For example, to download an export, an account needs the **Manage Exports** privilege and the matter shared with them. 
For detailed description please check [documentation](https://developers.google.com/vault).

## Installing

Install typings for Google Vault API:

```
npm install @types/gapi.client.vault-v1 --save-dev
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
gapi.client.load('https://vault.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.vault
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('vault', 'v1', () => {
  // now we can use:
  // gapi.client.vault
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Manage your eDiscovery data
      'https://www.googleapis.com/auth/ediscovery',

      // View your eDiscovery data
      'https://www.googleapis.com/auth/ediscovery.readonly',
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

After that you can use Google Vault API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Adds an account as a matter collaborator.
*/
await gapi.client.vault.matters.addPermissions({ matterId: "matterId",  });

/*
Closes the specified matter. Returns the matter with updated state.
*/
await gapi.client.vault.matters.close({ matterId: "matterId",  });

/*
Counts the accounts processed by the specified query.
*/
await gapi.client.vault.matters.count({ matterId: "matterId",  });

/*
Creates a matter with the given name and description. The initial state is open, and the owner is the method caller. Returns the created matter with default view.
*/
await gapi.client.vault.matters.create({  });

/*
Deletes the specified matter. Returns the matter with updated state.
*/
await gapi.client.vault.matters.delete({ matterId: "matterId",  });

/*
Gets the specified matter.
*/
await gapi.client.vault.matters.get({ matterId: "matterId",  });

/*
Lists matters the requestor has access to.
*/
await gapi.client.vault.matters.list({  });

/*
Removes an account as a matter collaborator.
*/
await gapi.client.vault.matters.removePermissions({ matterId: "matterId",  });

/*
Reopens the specified matter. Returns the matter with updated state.
*/
await gapi.client.vault.matters.reopen({ matterId: "matterId",  });

/*
Undeletes the specified matter. Returns the matter with updated state.
*/
await gapi.client.vault.matters.undelete({ matterId: "matterId",  });

/*
Updates the specified matter. This updates only the name and description of the matter, identified by matter ID. Changes to any other fields are ignored. Returns the default view of the matter.
*/
await gapi.client.vault.matters.update({ matterId: "matterId",  });

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.vault.operations.cancel({ name: "name",  });

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.vault.operations.delete({ name: "name",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.vault.operations.get({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/*/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/*}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
*/
await gapi.client.vault.operations.list({ name: "name",  });
```
