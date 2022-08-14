# TypeScript typings for Cloud Spanner API v1

Cloud Spanner is a managed, mission-critical, globally consistent and scalable relational database service.
For detailed description please check [documentation](https://cloud.google.com/spanner/).

## Installing

Install typings for Cloud Spanner API:

```
npm install @types/gapi.client.spanner-v1 --save-dev
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
gapi.client.load('https://spanner.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.spanner
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('spanner', 'v1', () => {
  // now we can use:
  // gapi.client.spanner
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Administer your Spanner databases
      'https://www.googleapis.com/auth/spanner.admin',

      // View and manage the contents of your Spanner databases
      'https://www.googleapis.com/auth/spanner.data',
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

After that you can use Cloud Spanner API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Return available scans given a Database-specific resource name.
*/
await gapi.client.spanner.scans.list({ parent: "parent",  });
```
