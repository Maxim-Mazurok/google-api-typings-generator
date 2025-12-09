# TypeScript typings for Google Drive API v3

The Google Drive API allows clients to access resources from Google Drive.
For detailed description please check [documentation](https://developers.google.com/workspace/drive/).

## Installing

Install typings for Google Drive API:

```
npm install @types/gapi.client.drive-v3 --save-dev
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
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  () => {
    // now we can use:
    // gapi.client.drive
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('drive', 'v3', () => {
  // now we can use:
  // gapi.client.drive
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, create, and delete all of your Google Drive files
    'https://www.googleapis.com/auth/drive',

    // See, create, and delete its own configuration data in your Google Drive
    'https://www.googleapis.com/auth/drive.appdata',

    // View your Google Drive apps
    'https://www.googleapis.com/auth/drive.apps.readonly',

    // See, edit, create, and delete only the specific Google Drive files you use with this app
    'https://www.googleapis.com/auth/drive.file',

    // See and download your Google Drive files that were created or edited by Google Meet.
    'https://www.googleapis.com/auth/drive.meet.readonly',

    // View and manage metadata of files in your Google Drive
    'https://www.googleapis.com/auth/drive.metadata',

    // See information about your Google Drive files
    'https://www.googleapis.com/auth/drive.metadata.readonly',

    // View the photos, videos and albums in your Google Photos
    'https://www.googleapis.com/auth/drive.photos.readonly',

    // See and download all your Google Drive files
    'https://www.googleapis.com/auth/drive.readonly',

    // Modify your Google Apps Script scripts' behavior
    'https://www.googleapis.com/auth/drive.scripts',
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
  },
);
```

After that you can use Google Drive API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets information about the user, the user's Drive, and system capabilities. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter).
*/
await gapi.client.drive.about.get({  });

/*
Retrieves an access proposal by ID. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access).
*/
await gapi.client.drive.accessproposals.get({ fileId: "fileId", proposalId: "proposalId",  });

/*
List the access proposals on a file. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access). Note: Only approvers are able to list access proposals on a file. If the user isn't an approver, a 403 error is returned.
*/
await gapi.client.drive.accessproposals.list({ fileId: "fileId",  });

/*
Approves or denies an access proposal. For more information, see [Manage pending access proposals](https://developers.google.com/workspace/drive/api/guides/pending-access).
*/
await gapi.client.drive.accessproposals.resolve({ fileId: "fileId", proposalId: "proposalId",  });

/*
Gets an Approval by ID.
*/
await gapi.client.drive.approvals.get({ approvalId: "approvalId", fileId: "fileId",  });

/*
Lists the Approvals on a file.
*/
await gapi.client.drive.approvals.list({ fileId: "fileId",  });

/*
Gets a specific app. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info).
*/
await gapi.client.drive.apps.get({ appId: "appId",  });

/*
Lists a user's installed apps. For more information, see [Return user info](https://developers.google.com/workspace/drive/api/guides/user-info).
*/
await gapi.client.drive.apps.list({  });

/*
Gets the starting pageToken for listing future changes. For more information, see [Retrieve changes](https://developers.google.com/workspace/drive/api/guides/manage-changes).
*/
await gapi.client.drive.changes.getStartPageToken({  });

/*
Lists the changes for a user or shared drive. For more information, see [Retrieve changes](https://developers.google.com/workspace/drive/api/guides/manage-changes).
*/
await gapi.client.drive.changes.list({ pageToken: "pageToken",  });

/*
Subscribes to changes for a user. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push).
*/
await gapi.client.drive.changes.watch({ pageToken: "pageToken",  });

/*
Stops watching resources through this channel. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push).
*/
await gapi.client.drive.channels.stop({  });

/*
Creates a comment on a file. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter).
*/
await gapi.client.drive.comments.create({ fileId: "fileId",  });

/*
Deletes a comment. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments).
*/
await gapi.client.drive.comments.delete({ commentId: "commentId", fileId: "fileId",  });

/*
Gets a comment by ID. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter).
*/
await gapi.client.drive.comments.get({ commentId: "commentId", fileId: "fileId",  });

/*
Lists a file's comments. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter).
*/
await gapi.client.drive.comments.list({ fileId: "fileId",  });

/*
Updates a comment with patch semantics. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments). Required: The `fields` parameter must be set. To return the exact fields you need, see [Return specific fields](https://developers.google.com/workspace/drive/api/guides/fields-parameter).
*/
await gapi.client.drive.comments.update({ commentId: "commentId", fileId: "fileId",  });

/*
Creates a shared drive. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives).
*/
await gapi.client.drive.drives.create({ requestId: "requestId",  });

/*
Permanently deletes a shared drive for which the user is an `organizer`. The shared drive cannot contain any untrashed items. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives).
*/
await gapi.client.drive.drives.delete({ driveId: "driveId",  });

/*
Gets a shared drive's metadata by ID. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives).
*/
await gapi.client.drive.drives.get({ driveId: "driveId",  });

/*
Hides a shared drive from the default view. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives).
*/
await gapi.client.drive.drives.hide({ driveId: "driveId",  });

/*
 Lists the user's shared drives. This method accepts the `q` parameter, which is a search query combining one or more search terms. For more information, see the [Search for shared drives](/workspace/drive/api/guides/search-shareddrives) guide.
*/
await gapi.client.drive.drives.list({  });

/*
Restores a shared drive to the default view. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives).
*/
await gapi.client.drive.drives.unhide({ driveId: "driveId",  });

/*
Updates the metadata for a shared drive. For more information, see [Manage shared drives](https://developers.google.com/workspace/drive/api/guides/manage-shareddrives).
*/
await gapi.client.drive.drives.update({ driveId: "driveId",  });

/*
Creates a copy of a file and applies any requested updates with patch semantics. For more information, see [Create and manage files](https://developers.google.com/workspace/drive/api/guides/create-file).
*/
await gapi.client.drive.files.copy({ fileId: "fileId",  });

/*
 Creates a file. For more information, see [Create and manage files](/workspace/drive/api/guides/create-file). This method supports an */upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `*/*` (Specify a valid MIME type, rather than the literal `*/*` value. The literal `*/*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads). Apps creating shortcuts with the `create` method must specify the MIME type `application/vnd.google-apps.shortcut`. Apps should specify a file extension in the `name` property when inserting files with the API. For example, an operation to insert a JPEG file should specify something like `"name": "cat.jpg"` in the metadata. Subsequent `GET` requests include the read-only `fileExtension` property populated with the extension originally specified in the `name` property. When a Google Drive user requests to download a file, or when the file is downloaded through the sync client, Drive builds a full filename (with extension) based on the name. In cases where the extension is missing, Drive attempts to determine the extension based on the file's MIME type.
*/
await gapi.client.drive.files.create({  });

/*
Permanently deletes a file owned by the user without moving it to the trash. For more information, see [Trash or delete files and folders](https://developers.google.com/workspace/drive/api/guides/delete). If the file belongs to a shared drive, the user must be an `organizer` on the parent folder. If the target is a folder, all descendants owned by the user are also deleted.
*/
await gapi.client.drive.files.delete({ fileId: "fileId",  });

/*
Downloads the content of a file. For more information, see [Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads). Operations are valid for 24 hours from the time of creation.
*/
await gapi.client.drive.files.download({ fileId: "fileId",  });

/*
Permanently deletes all of the user's trashed files. For more information, see [Trash or delete files and folders](https://developers.google.com/workspace/drive/api/guides/delete).
*/
await gapi.client.drive.files.emptyTrash({  });

/*
Exports a Google Workspace document to the requested MIME type and returns exported byte content. For more information, see [Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads). Note that the exported content is limited to 10 MB.
*/
await gapi.client.drive.files.export({ fileId: "fileId", mimeType: "mimeType",  });

/*
Generates a set of file IDs which can be provided in create or copy requests. For more information, see [Create and manage files](https://developers.google.com/workspace/drive/api/guides/create-file).
*/
await gapi.client.drive.files.generateIds({  });

/*
 Gets a file's metadata or content by ID. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). If you provide the URL parameter `alt=media`, then the response includes the file contents in the response body. Downloading content with `alt=media` only works if the file is stored in Drive. To download Google Docs, Sheets, and Slides use [`files.export`](/workspace/drive/api/reference/rest/v3/files/export) instead. For more information, see [Download and export files](/workspace/drive/api/guides/manage-downloads).
*/
await gapi.client.drive.files.get({ fileId: "fileId",  });

/*
 Lists the user's files. For more information, see [Search for files and folders](/workspace/drive/api/guides/search-files). This method accepts the `q` parameter, which is a search query combining one or more search terms. This method returns *all* files by default, including trashed files. If you don't want trashed files to appear in the list, use the `trashed=false` query parameter to remove trashed files from the results.
*/
await gapi.client.drive.files.list({  });

/*
Lists the labels on a file. For more information, see [List labels on a file](https://developers.google.com/workspace/drive/api/guides/list-labels).
*/
await gapi.client.drive.files.listLabels({ fileId: "fileId",  });

/*
Modifies the set of labels applied to a file. For more information, see [Set a label field on a file](https://developers.google.com/workspace/drive/api/guides/set-label). Returns a list of the labels that were added or modified.
*/
await gapi.client.drive.files.modifyLabels({ fileId: "fileId",  });

/*
 Updates a file's metadata, content, or both. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might be changed automatically, such as `modifiedDate`. This method supports patch semantics. This method supports an */upload* URI and accepts uploaded media with the following characteristics: - *Maximum file size:* 5,120 GB - *Accepted Media MIME types:* `*/*` (Specify a valid MIME type, rather than the literal `*/*` value. The literal `*/*` is only used to indicate that any valid MIME type can be uploaded. For more information, see [Google Workspace and Google Drive supported MIME types](/workspace/drive/api/guides/mime-types).) For more information on uploading files, see [Upload file data](/workspace/drive/api/guides/manage-uploads).
*/
await gapi.client.drive.files.update({ fileId: "fileId",  });

/*
Subscribes to changes to a file. For more information, see [Notifications for resource changes](https://developers.google.com/workspace/drive/api/guides/push).
*/
await gapi.client.drive.files.watch({ fileId: "fileId",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.drive.operations.get({ name: "name",  });

/*
Creates a permission for a file or shared drive. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied.
*/
await gapi.client.drive.permissions.create({ fileId: "fileId",  });

/*
Deletes a permission. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied.
*/
await gapi.client.drive.permissions.delete({ fileId: "fileId", permissionId: "permissionId",  });

/*
Gets a permission by ID. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing).
*/
await gapi.client.drive.permissions.get({ fileId: "fileId", permissionId: "permissionId",  });

/*
Lists a file's or shared drive's permissions. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing).
*/
await gapi.client.drive.permissions.list({ fileId: "fileId",  });

/*
Updates a permission with patch semantics. For more information, see [Share files, folders, and drives](https://developers.google.com/workspace/drive/api/guides/manage-sharing). **Warning:** Concurrent permissions operations on the same file aren't supported; only the last update is applied.
*/
await gapi.client.drive.permissions.update({ fileId: "fileId", permissionId: "permissionId",  });

/*
Creates a reply to a comment. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments).
*/
await gapi.client.drive.replies.create({ commentId: "commentId", fileId: "fileId",  });

/*
Deletes a reply. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments).
*/
await gapi.client.drive.replies.delete({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Gets a reply by ID. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments).
*/
await gapi.client.drive.replies.get({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Lists a comment's replies. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments).
*/
await gapi.client.drive.replies.list({ commentId: "commentId", fileId: "fileId",  });

/*
Updates a reply with patch semantics. For more information, see [Manage comments and replies](https://developers.google.com/workspace/drive/api/guides/manage-comments).
*/
await gapi.client.drive.replies.update({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Permanently deletes a file version. You can only delete revisions for files with binary content in Google Drive, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted. For more information, see [Manage file revisions](https://developers.google.com/drive/api/guides/manage-revisions).
*/
await gapi.client.drive.revisions.delete({ fileId: "fileId", revisionId: "revisionId",  });

/*
Gets a revision's metadata or content by ID. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions).
*/
await gapi.client.drive.revisions.get({ fileId: "fileId", revisionId: "revisionId",  });

/*
Lists a file's revisions. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions). **Important:** The list of revisions returned by this method might be incomplete for files with a large revision history, including frequently edited Google Docs, Sheets, and Slides. Older revisions might be omitted from the response, meaning the first revision returned may not be the oldest existing revision. The revision history visible in the Workspace editor user interface might be more complete than the list returned by the API.
*/
await gapi.client.drive.revisions.list({ fileId: "fileId",  });

/*
Updates a revision with patch semantics. For more information, see [Manage file revisions](https://developers.google.com/workspace/drive/api/guides/manage-revisions).
*/
await gapi.client.drive.revisions.update({ fileId: "fileId", revisionId: "revisionId",  });

/*
Deprecated: Use `drives.create` instead.
*/
await gapi.client.drive.teamdrives.create({ requestId: "requestId",  });

/*
Deprecated: Use `drives.delete` instead.
*/
await gapi.client.drive.teamdrives.delete({ teamDriveId: "teamDriveId",  });

/*
Deprecated: Use `drives.get` instead.
*/
await gapi.client.drive.teamdrives.get({ teamDriveId: "teamDriveId",  });

/*
Deprecated: Use `drives.list` instead.
*/
await gapi.client.drive.teamdrives.list({  });

/*
Deprecated: Use `drives.update` instead.
*/
await gapi.client.drive.teamdrives.update({ teamDriveId: "teamDriveId",  });
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.drive-v3#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
