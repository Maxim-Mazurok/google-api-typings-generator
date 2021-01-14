# TypeScript typings for Area120 Tables API v1alpha1


For detailed description please check [documentation](https://support.google.com/area120-tables/answer/10011390).

## Installing

Install typings for Area120 Tables API:

```
npm install @types/gapi.client.area120tables@v1alpha1 --save-dev
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
gapi.client.load('area120tables', 'v1alpha1', () => {
  // now we can use gapi.client.area120tables
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, create, and delete all of your Google Drive files
      'https://www.googleapis.com/auth/drive',

      // View and manage Google Drive files and folders that you have opened or created with this app
      'https://www.googleapis.com/auth/drive.file',

      // See and download all your Google Drive files
      'https://www.googleapis.com/auth/drive.readonly',

      // See, edit, create, and delete your spreadsheets in Google Drive
      'https://www.googleapis.com/auth/spreadsheets',

      // View your Google Spreadsheets
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

After that you can use Area120 Tables API resources:

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
