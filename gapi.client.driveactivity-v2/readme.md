# TypeScript typings for Drive Activity API v2

Provides a historical view of activity in Google Drive.
For detailed description please check [documentation](https://developers.google.com/drive/activity/).

## Installing

Install typings for Drive Activity API:

```
npm install @types/gapi.client.driveactivity-v2 --save-dev
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
gapi.client.load('https://driveactivity.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.driveactivity
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('driveactivity', 'v2', () => {
  // now we can use:
  // gapi.client.driveactivity
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and add to the activity record of files in your Google Drive
      'https://www.googleapis.com/auth/drive.activity',

      // View the activity record of files in your Google Drive
      'https://www.googleapis.com/auth/drive.activity.readonly',
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

After that you can use Drive Activity API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Query past activity in Google Drive.
*/
await gapi.client.driveactivity.activity.query({  });
```
