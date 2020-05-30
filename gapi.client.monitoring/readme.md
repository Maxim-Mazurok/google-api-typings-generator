# TypeScript typings for Cloud Monitoring API v3

Manages your Cloud Monitoring data and configurations. Most projects must be associated with a Workspace, with a few exceptions as noted on the individual method pages. The table entries below are presented in alphabetical order, not in order of common use. For explanations of the concepts found in the table entries, read the Cloud Monitoring documentation.
For detailed description please check [documentation](https://cloud.google.com/monitoring/api/).

## Installing

Install typings for Cloud Monitoring API:

```
npm install @types/gapi.client.monitoring@v3 --save-dev
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
gapi.client.load('monitoring', 'v3', () => {
  // now we can use gapi.client.monitoring
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
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

After that you can use Cloud Monitoring API resources:

```typescript

/*
Create a Service.
*/
await gapi.client.monitoring.services.create({ parent: "parent",  });

/*
Soft delete this Service.
*/
await gapi.client.monitoring.services.delete({ name: "name",  });

/*
Get the named Service.
*/
await gapi.client.monitoring.services.get({ name: "name",  });

/*
List Services for this workspace.
*/
await gapi.client.monitoring.services.list({ parent: "parent",  });

/*
Update this Service.
*/
await gapi.client.monitoring.services.patch({ name: "name",  });

/*
Returns the list of IP addresses that checkers run from
*/
await gapi.client.monitoring.uptimeCheckIps.list({  });
```
