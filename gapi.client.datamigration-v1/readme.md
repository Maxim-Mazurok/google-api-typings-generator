# TypeScript typings for Database Migration API v1

Manage Cloud Database Migration Service resources on Google Cloud Platform.
For detailed description please check [documentation](https://cloud.google.com/database-migration/).

## Installing

Install typings for Database Migration API:

```
npm install @types/gapi.client.datamigration-v1 --save-dev
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
gapi.client.load('https://datamigration.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.datamigration
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('datamigration', 'v1', () => {
  // now we can use:
  // gapi.client.datamigration
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
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

After that you can use Database Migration API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
