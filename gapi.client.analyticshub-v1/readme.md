# TypeScript typings for Analytics Hub API v1

Exchange data and analytics assets securely and efficiently.
For detailed description please check [documentation](https://cloud.google.com/bigquery/docs/analytics-hub-introduction).

## Installing

Install typings for Analytics Hub API:

```
npm install @types/gapi.client.analyticshub-v1 --save-dev
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
gapi.client.load(
  'https://analyticshub.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.analyticshub
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('analyticshub', 'v1', () => {
  // now we can use:
  // gapi.client.analyticshub
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
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  }
);
```

After that you can use Analytics Hub API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```