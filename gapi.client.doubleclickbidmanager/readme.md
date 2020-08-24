# TypeScript typings for DoubleClick Bid Manager API v1.1

DoubleClick Bid Manager API allows users to manage and create campaigns and reports.
For detailed description please check [documentation](https://developers.google.com/bid-manager/).

## Installing

Install typings for DoubleClick Bid Manager API:

```
npm install @types/gapi.client.doubleclickbidmanager@v1.1 --save-dev
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
gapi.client.load('doubleclickbidmanager', 'v1.1', () => {
  // now we can use gapi.client.doubleclickbidmanager
  // ...
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

After that you can use DoubleClick Bid Manager API resources:

```typescript

/*
Retrieves line items in CSV format. YouTube & partners line items are not supported.
*/
await gapi.client.doubleclickbidmanager.lineitems.downloadlineitems({  });

/*
Uploads line items in CSV format. YouTube & partners line items are not supported.
*/
await gapi.client.doubleclickbidmanager.lineitems.uploadlineitems({  });

/*
Creates a query.
*/
await gapi.client.doubleclickbidmanager.queries.createquery({  });

/*
Deletes a stored query as well as the associated stored reports.
*/
await gapi.client.doubleclickbidmanager.queries.deletequery({ queryId: "queryId",  });

/*
Retrieves a stored query.
*/
await gapi.client.doubleclickbidmanager.queries.getquery({ queryId: "queryId",  });

/*
Retrieves stored queries.
*/
await gapi.client.doubleclickbidmanager.queries.listqueries({  });

/*
Runs a stored query to generate a report.
*/
await gapi.client.doubleclickbidmanager.queries.runquery({ queryId: "queryId",  });

/*
Retrieves stored reports.
*/
await gapi.client.doubleclickbidmanager.reports.listreports({ queryId: "queryId",  });

/*
Retrieves entities in SDF format.
*/
await gapi.client.doubleclickbidmanager.sdf.download({  });
```
