# TypeScript typings for Cloud Monitoring API v1

Manages your Cloud Monitoring data and configurations.
For detailed description please check [documentation](https://cloud.google.com/monitoring/api/).

## Installing

Install typings for Cloud Monitoring API:

```
npm install @types/gapi.client.monitoring-v1 --save-dev
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
gapi.client.load('https://monitoring.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.monitoring
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('monitoring', 'v1', () => {
  // now we can use:
  // gapi.client.monitoring
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and write monitoring data for all of your Google and third-party Cloud and API projects
      'https://www.googleapis.com/auth/monitoring',

      // View monitoring data for all of your Google Cloud and third-party projects
      'https://www.googleapis.com/auth/monitoring.read',

      // Publish metric data to your Google Cloud projects
      'https://www.googleapis.com/auth/monitoring.write',
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

After that you can use Cloud Monitoring API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.monitoring.operations.get({ name: "name",  });
```
