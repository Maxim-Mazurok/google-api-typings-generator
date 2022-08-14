# TypeScript typings for Admin SDK API datatransfer_v1

Admin SDK lets administrators of enterprise domains to view and manage resources like user, groups etc. It also provides audit and usage reports of domain.
For detailed description please check [documentation](https://developers.google.com/admin-sdk/).

## Installing

Install typings for Admin SDK API:

```
npm install @types/gapi.client.admin-datatransfer_v1 --save-dev
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
gapi.client.load('https://admin.googleapis.com/$discovery/rest?version=datatransfer_v1', () => {
  // now we can use:
  // gapi.client.datatransfer
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('admin', 'datatransfer_v1', () => {
  // now we can use:
  // gapi.client.datatransfer
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage data transfers between users in your organization
      'https://www.googleapis.com/auth/admin.datatransfer',

      // View data transfers between users in your organization
      'https://www.googleapis.com/auth/admin.datatransfer.readonly',
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

After that you can use Admin SDK API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Retrieves information about an application for the given application ID.
*/
await gapi.client.datatransfer.applications.get({ applicationId: "applicationId",  });

/*
Lists the applications available for data transfer for a customer.
*/
await gapi.client.datatransfer.applications.list({  });

/*
Retrieves a data transfer request by its resource ID.
*/
await gapi.client.datatransfer.transfers.get({ dataTransferId: "dataTransferId",  });

/*
Inserts a data transfer request.
*/
await gapi.client.datatransfer.transfers.insert({  });

/*
Lists the transfers for a customer by source user, destination user, or status.
*/
await gapi.client.datatransfer.transfers.list({  });
```
