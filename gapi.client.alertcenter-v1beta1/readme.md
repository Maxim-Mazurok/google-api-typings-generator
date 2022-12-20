# TypeScript typings for Google Workspace Alert Center API v1beta1

Manages alerts on issues affecting your domain. Note: The current version of this API (v1beta1) is available to all Google Workspace customers. 
For detailed description please check [documentation](https://developers.google.com/admin-sdk/alertcenter/).

## Installing

Install typings for Google Workspace Alert Center API:

```
npm install @types/gapi.client.alertcenter-v1beta1 --save-dev
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
gapi.client.load('https://alertcenter.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.alertcenter
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('alertcenter', 'v1beta1', () => {
  // now we can use:
  // gapi.client.alertcenter
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See and delete your domain's G Suite alerts, and send alert feedback
      'https://www.googleapis.com/auth/apps.alerts',
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

After that you can use Google Workspace Alert Center API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Performs batch delete operation on alerts.
*/
await gapi.client.alertcenter.alerts.batchDelete({  });

/*
Performs batch undelete operation on alerts.
*/
await gapi.client.alertcenter.alerts.batchUndelete({  });

/*
Marks the specified alert for deletion. An alert that has been marked for deletion is removed from Alert Center after 30 days. Marking an alert for deletion has no effect on an alert which has already been marked for deletion. Attempting to mark a nonexistent alert for deletion results in a `NOT_FOUND` error.
*/
await gapi.client.alertcenter.alerts.delete({ alertId: "alertId",  });

/*
Gets the specified alert. Attempting to get a nonexistent alert returns `NOT_FOUND` error.
*/
await gapi.client.alertcenter.alerts.get({ alertId: "alertId",  });

/*
Returns the metadata of an alert. Attempting to get metadata for a non-existent alert returns `NOT_FOUND` error.
*/
await gapi.client.alertcenter.alerts.getMetadata({ alertId: "alertId",  });

/*
Lists the alerts.
*/
await gapi.client.alertcenter.alerts.list({  });

/*
Restores, or "undeletes", an alert that was marked for deletion within the past 30 days. Attempting to undelete an alert which was marked for deletion over 30 days ago (which has been removed from the Alert Center database) or a nonexistent alert returns a `NOT_FOUND` error. Attempting to undelete an alert which has not been marked for deletion has no effect.
*/
await gapi.client.alertcenter.alerts.undelete({ alertId: "alertId",  });

/*
Returns customer-level settings.
*/
await gapi.client.alertcenter.getSettings({  });

/*
Updates the customer-level settings.
*/
await gapi.client.alertcenter.updateSettings({  });
```
