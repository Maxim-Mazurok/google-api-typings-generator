# TypeScript typings for G Suite Vault API v1

Archiving and eDiscovery for G Suite.
For detailed description please check [documentation](https://developers.google.com/vault).

## Installing

Install typings for G Suite Vault API:

```
npm install @types/gapi.client.vault@v1 --save-dev
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
gapi.client.load('vault', 'v1', () => {
  // now we can use gapi.client.vault
  // ...
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

After that you can use G Suite Vault API resources:

```typescript

/*
Adds an account as a matter collaborator.
*/
await gapi.client.vault.matters.addPermissions({ matterId: "matterId",  });

/*
Closes the specified matter. Returns matter with updated state.
*/
await gapi.client.vault.matters.close({ matterId: "matterId",  });

/*
Creates a new matter with the given name and description. The initial state
is open, and the owner is the method caller. Returns the created matter
with default view.
*/
await gapi.client.vault.matters.create({  });

/*
Deletes the specified matter. Returns matter with updated state.
*/
await gapi.client.vault.matters.delete({ matterId: "matterId",  });

/*
Gets the specified matter.
*/
await gapi.client.vault.matters.get({ matterId: "matterId",  });

/*
Lists matters the user has access to.
*/
await gapi.client.vault.matters.list({  });

/*
Removes an account as a matter collaborator.
*/
await gapi.client.vault.matters.removePermissions({ matterId: "matterId",  });

/*
Reopens the specified matter. Returns matter with updated state.
*/
await gapi.client.vault.matters.reopen({ matterId: "matterId",  });

/*
Undeletes the specified matter. Returns matter with updated state.
*/
await gapi.client.vault.matters.undelete({ matterId: "matterId",  });

/*
Updates the specified matter.
This updates only the name and description of the matter, identified by
matter ID. Changes to any other fields are ignored.
Returns the default view of the matter.
*/
await gapi.client.vault.matters.update({ matterId: "matterId",  });

/*
Deletes a long-running operation. This method indicates that the client is
no longer interested in the operation result. It does not cancel the
operation. If the server doesn't support this method, it returns
`google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.vault.operations.delete({ name: "name",  });
```
