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

      // See and download your Google Analytics data
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
Searches through all changes to an account or its children given the specified set of filters.
*/
await gapi.client.analyticsadmin.accounts.searchChangeHistoryEvents({ account: "account",  });

/*
Returns summaries of all accounts accessible by the caller.
*/
await gapi.client.analyticsadmin.accountSummaries.list({  });

/*
Acknowledges the terms of user data collection for the specified property. This acknowledgement must be completed (either in the Google Analytics UI or via this API) before MeasurementProtocolSecret resources may be created.
*/
await gapi.client.analyticsadmin.properties.acknowledgeUserDataCollection({ property: "property",  });

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
Lookup for a AttributionSettings singleton.
*/
await gapi.client.analyticsadmin.properties.getAttributionSettings({ name: "name",  });

/*
Returns the singleton data retention settings for this property.
*/
await gapi.client.analyticsadmin.properties.getDataRetentionSettings({ name: "name",  });

/*
Lookup for Google Signals settings for a property.
*/
await gapi.client.analyticsadmin.properties.getGoogleSignalsSettings({ name: "name",  });

/*
Returns child Properties under the specified parent Account. Only "GA4" properties will be returned. Properties will be excluded if the caller does not have access. Soft-deleted (ie: "trashed") properties are excluded by default. Returns an empty list if no relevant properties are found.
*/
await gapi.client.analyticsadmin.properties.list({  });

/*
Updates a property.
*/
await gapi.client.analyticsadmin.properties.patch({ name: "name",  });

/*
Updates attribution settings on a property.
*/
await gapi.client.analyticsadmin.properties.updateAttributionSettings({ name: "name",  });

/*
Updates the singleton data retention settings for this property.
*/
await gapi.client.analyticsadmin.properties.updateDataRetentionSettings({ name: "name",  });

/*
Updates Google Signals settings for a property.
*/
await gapi.client.analyticsadmin.properties.updateGoogleSignalsSettings({ name: "name",  });
```
