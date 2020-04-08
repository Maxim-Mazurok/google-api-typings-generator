# TypeScript typings for Display & Video 360 API v1

Display & Video 360 API allows users to manage and create campaigns and reports.
For detailed description please check [documentation](https://developers.google.com/display-video/).

## Installing

Install typings for Display & Video 360 API:

```
npm install @types/gapi.client.displayvideo@v1 --save-dev
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
gapi.client.load('displayvideo', 'v1', () => {
  // now we can use gapi.client.displayvideo
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Create, see, edit, and permanently delete your Display & Video 360 entities and reports
      'https://www.googleapis.com/auth/display-video',

      // View and manage your reports in DoubleClick Bid Manager
      'https://www.googleapis.com/auth/doubleclickbidmanager',
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

After that you can use Display & Video 360 API resources:

```typescript

/*
Downloads media. Download is supported on the URI `/download/{resource_name=**}?alt=media.`

**Note**: Download requests will not be successful without including `alt=media` query string.
*/
await gapi.client.media.download({ resourceName: "resourceName",  });

/*
Creates an SDF Download Task. Returns an
Operation.

An SDF Download Task is a long-running, asynchronous operation. The
metadata type of this operation is
SdfDownloadTaskMetadata. If the request is successful, the
response type of the operation is
SdfDownloadTask. The response will not include the download files,
which must be retrieved with
media.download. The state of
operation can be retrieved with
sdfdownloadtask.operations.get.

Any errors can be found in the
error.message. Note
that error.details is expected to be
empty.
*/
await gapi.client.sdfdownloadtasks.create({  });
```
