# TypeScript typings for Google Analytics Admin API v1alpha


For detailed description please check [documentation](http://code.google.com/apis/analytics/docs/mgmt/home.html).

## Installing

Install typings for Google Analytics Admin API:

```
npm install @types/gapi.client.analyticsadmin@v1alpha --save-dev
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
gapi.client.load('analyticsadmin', 'v1alpha', () => {
  // now we can use gapi.client.analyticsadmin
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Edit Google Analytics management entities
      'https://www.googleapis.com/auth/analytics.edit',

      // Manage Google Analytics Account users by email address
      'https://www.googleapis.com/auth/analytics.manage.users',

      // View Google Analytics user permissions
      'https://www.googleapis.com/auth/analytics.manage.users.readonly',

      // View your Google Analytics data
      'https://www.googleapis.com/auth/analytics.readonly',
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

After that you can use Google Analytics Admin API resources:

```typescript

/*
Marks target Account as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted accounts. However, they can be restored using the Trash Can UI. If the accounts are not restored before the expiration time, the account and all child resources (eg: Properties, GoogleAdsLinks, Streams, UserLinks) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found.
*/
await gapi.client.analyticsadmin.accounts.delete({ name: "name",  });

/*
Lookup for a single Account.
*/
await gapi.client.analyticsadmin.accounts.get({ name: "name",  });

/*
Get data sharing settings on an account. Data sharing settings are singletons.
*/
await gapi.client.analyticsadmin.accounts.getDataSharingSettings({ name: "name",  });

/*
Returns all accounts accessible by the caller. Note that these accounts might not currently have GA4 properties. Soft-deleted (ie: "trashed") accounts are excluded by default. Returns an empty list if no relevant accounts are found.
*/
await gapi.client.analyticsadmin.accounts.list({  });

/*
Updates an account.
*/
await gapi.client.analyticsadmin.accounts.patch({ name: "name",  });

/*
Requests a ticket for creating an account.
*/
await gapi.client.analyticsadmin.accounts.provisionAccountTicket({  });

/*
Returns summaries of all accounts accessible by the caller.
*/
await gapi.client.analyticsadmin.accountSummaries.list({  });

/*
Creates an "GA4" property with the specified location and attributes.
*/
await gapi.client.analyticsadmin.properties.create({  });

/*
Marks target Property as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted properties. However, they can be restored using the Trash Can UI. If the properties are not restored before the expiration time, the Property and all child resources (eg: GoogleAdsLinks, Streams, UserLinks) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found, or is not an GA4 Property.
*/
await gapi.client.analyticsadmin.properties.delete({ name: "name",  });

/*
Lookup for a single "GA4" Property.
*/
await gapi.client.analyticsadmin.properties.get({ name: "name",  });

/*
Returns child Properties under the specified parent Account. Only "GA4" properties will be returned. Properties will be excluded if the caller does not have access. Soft-deleted (ie: "trashed") properties are excluded by default. Returns an empty list if no relevant properties are found.
*/
await gapi.client.analyticsadmin.properties.list({  });

/*
Updates a property.
*/
await gapi.client.analyticsadmin.properties.patch({ name: "name",  });
```
