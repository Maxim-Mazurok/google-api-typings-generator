# TypeScript typings for Oracle Database@Google Cloud API v1

The Oracle Database@Google Cloud API provides set of APIs to manage Oracle databases such as Exadata and Autonomous Databases.
For detailed description please check [documentation](https://cloud.google.com/oracle/database/docs).

## Installing

Install typings for Oracle Database@Google Cloud API:

```
npm install @types/gapi.client.oracledatabase-v1 --save-dev
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
  'https://oracledatabase.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.oracledatabase
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('oracledatabase', 'v1', () => {
  // now we can use:
  // gapi.client.oracledatabase
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

After that you can use Oracle Database@Google Cloud API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```