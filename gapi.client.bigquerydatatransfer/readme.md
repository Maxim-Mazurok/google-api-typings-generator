# TypeScript typings for BigQuery Data Transfer API v1

Schedule queries or transfer external data from SaaS applications to Google BigQuery on a regular basis.
For detailed description please check [documentation](https://cloud.google.com/bigquery-transfer/).

## Installing

Install typings for BigQuery Data Transfer API:

```
npm install @types/gapi.client.bigquerydatatransfer@v1 --save-dev
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
gapi.client.load('bigquerydatatransfer', 'v1', () => {
  // now we can use gapi.client.bigquerydatatransfer
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data in Google BigQuery and see the email address for your Google Account
      'https://www.googleapis.com/auth/bigquery',

      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud services and see the email address of your Google Account
      'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use BigQuery Data Transfer API resources:

```typescript

/*
Enroll data sources in a user project. This allows users to create transfer configurations for these data sources. They will also appear in the ListDataSources RPC and as such, will appear in the [BigQuery UI](https://console.cloud.google.com/bigquery), and the documents can be found in the public guide for [BigQuery Web UI](https://cloud.google.com/bigquery/bigquery-web-ui) and [Data Transfer Service](https://cloud.google.com/bigquery/docs/working-with-transfers).
*/
await gapi.client.bigquerydatatransfer.projects.enrollDataSources({ name: "name",  });
```
