# TypeScript typings for Area120 Tables API v1alpha1


For detailed description please check [documentation](https://support.google.com/area120-tables/answer/10011390).

## Installing

Install typings for Area120 Tables API:

```
npm install @types/gapi.client.area120tables-v1alpha1 --save-dev
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
gapi.client.load('https://area120tables.googleapis.com/$discovery/rest?version=v1alpha1', () => {
  // now we can use:
  // gapi.client.area120tables
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('area120tables', 'v1alpha1', () => {
  // now we can use:
  // gapi.client.area120tables
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create, and delete all of your Google Drive files
      'https://www.googleapis.com/auth/drive',

      // See, edit, create, and delete only the specific Google Drive files you use with this app
      'https://www.googleapis.com/auth/drive.file',

      // See and download all your Google Drive files
      'https://www.googleapis.com/auth/drive.readonly',

      // See, edit, create, and delete all your Google Sheets spreadsheets
      'https://www.googleapis.com/auth/spreadsheets',

      // See all your Google Sheets spreadsheets
      'https://www.googleapis.com/auth/spreadsheets.readonly',

      // See, edit, create, and delete your tables in Tables by Area 120
      'https://www.googleapis.com/auth/tables',
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

After that you can use Area120 Tables API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets a table. Returns NOT_FOUND if the table does not exist.
*/
await gapi.client.area120tables.tables.get({ name: "name",  });

/*
Lists tables for the user.
*/
await gapi.client.area120tables.tables.list({  });

/*
Gets a workspace. Returns NOT_FOUND if the workspace does not exist.
*/
await gapi.client.area120tables.workspaces.get({ name: "name",  });

/*
Lists workspaces for the user.
*/
await gapi.client.area120tables.workspaces.list({  });
```
