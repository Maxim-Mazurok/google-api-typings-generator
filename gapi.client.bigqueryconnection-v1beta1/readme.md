# TypeScript typings for BigQuery Connection API v1beta1

Allows users to manage BigQuery connections to external data sources.
For detailed description please check [documentation](https://cloud.google.com/bigquery/).

## Installing

Install typings for BigQuery Connection API:

```
npm install @types/gapi.client.bigqueryconnection-v1beta1 --save-dev
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
gapi.client.load('https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.bigqueryconnection
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('bigqueryconnection', 'v1beta1', () => {
  // now we can use:
  // gapi.client.bigqueryconnection
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

After that you can use BigQuery Connection API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
