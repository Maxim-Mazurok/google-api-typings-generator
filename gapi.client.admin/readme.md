# TypeScript typings for Admin SDK reports_v1

Admin SDK lets administrators of enterprise domains to view and manage resources like user, groups etc. It also provides audit and usage reports of domain.
For detailed description please check [documentation](http://developers.google.com/admin-sdk/).

## Installing

Install typings for Admin SDK:

```
npm install @types/gapi.client.admin@reports_v1 --save-dev
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
gapi.client.load('admin', 'reports_v1', () => {
  // now we can use gapi.client.admin
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View audit reports for your G Suite domain
      'https://www.googleapis.com/auth/admin.reports.audit.readonly',

      // View usage reports for your G Suite domain
      'https://www.googleapis.com/auth/admin.reports.usage.readonly',
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

After that you can use Admin SDK resources:

```typescript

/*
Retrieves a list of activities for a specific customer's account and application such as the Admin console application or the Google Drive application. For more information, see the guides for administrator and Google Drive activity reports. For more information about the activity report's parameters, see the activity parameters reference guides. 
*/
await gapi.client.admin.activities.list({ applicationName: "applicationName", userKey: "userKey",  });

/*
Start receiving notifications for account activities. For more information, see Receiving Push Notifications.
*/
await gapi.client.admin.activities.watch({ applicationName: "applicationName", userKey: "userKey",  });

/*
Stop watching resources through this channel.
*/
await gapi.client.admin.channels.stop({  });

/*
Retrieves a report which is a collection of properties and statistics for a specific customer's account. For more information, see the Customers Usage Report guide. For more information about the customer report's parameters, see the Customers Usage parameters reference guides. 
*/
await gapi.client.admin.customerUsageReports.get({ date: "date",  });

/*
Retrieves a report which is a collection of properties and statistics for entities used by users within the account. For more information, see the Entities Usage Report guide. For more information about the entities report's parameters, see the Entities Usage parameters reference guides.
*/
await gapi.client.admin.entityUsageReports.get({ date: "date", entityKey: "entityKey", entityType: "entityType",  });

/*
Retrieves a report which is a collection of properties and statistics for a set of users with the account. For more information, see the User Usage Report guide. For more information about the user report's parameters, see the Users Usage parameters reference guides.
*/
await gapi.client.admin.userUsageReport.get({ date: "date", userKey: "userKey",  });
```
