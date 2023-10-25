# TypeScript typings for BigLake API v1

The BigLake API provides access to BigLake Metastore, a serverless, fully managed, and highly available metastore for open-source data that can be used for querying Apache Iceberg tables in BigQuery.
For detailed description please check [documentation](https://cloud.google.com/bigquery/).

## Installing

Install typings for BigLake API:

```
npm install @types/gapi.client.biglake-v1 --save-dev
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
gapi.client.load('https://biglake.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.biglake
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('biglake', 'v1', () => {
  // now we can use:
  // gapi.client.biglake
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

After that you can use BigLake API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
