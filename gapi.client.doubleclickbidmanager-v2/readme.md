# TypeScript typings for DoubleClick Bid Manager API v2

DoubleClick Bid Manager API allows users to manage and create campaigns and reports.
For detailed description please check [documentation](https://developers.google.com/bid-manager/).

## Installing

Install typings for DoubleClick Bid Manager API:

```
npm install @types/gapi.client.doubleclickbidmanager-v2 --save-dev
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
gapi.client.load('https://doubleclickbidmanager.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.doubleclickbidmanager
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('doubleclickbidmanager', 'v2', () => {
  // now we can use:
  // gapi.client.doubleclickbidmanager
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your reports in DoubleClick Bid Manager
      'https://www.googleapis.com/auth/doubleclickbidmanager',
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

After that you can use DoubleClick Bid Manager API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Creates a query.
*/
await gapi.client.doubleclickbidmanager.queries.create({  });

/*
Deletes a query as well as the associated reports.
*/
await gapi.client.doubleclickbidmanager.queries.delete({ queryId: "queryId",  });

/*
Retrieves a query.
*/
await gapi.client.doubleclickbidmanager.queries.get({ queryId: "queryId",  });

/*
Lists queries created by the current user.
*/
await gapi.client.doubleclickbidmanager.queries.list({  });

/*
Runs a stored query to generate a report.
*/
await gapi.client.doubleclickbidmanager.queries.run({ queryId: "queryId",  });
```
