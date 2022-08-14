# TypeScript typings for Drive API v2

Manages files in Drive including uploading, downloading, searching, detecting changes, and updating sharing permissions.
For detailed description please check [documentation](https://developers.google.com/drive/).

## Installing

Install typings for Drive API:

```
npm install @types/gapi.client.drive-v2 --save-dev
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
gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v2/rest', () => {
  // now we can use:
  // gapi.client.drive
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('drive', 'v2', () => {
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Drive API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the information about the current user along with Drive API settings
*/
await gapi.client.drive.about.get({  });

/*
Gets a specific app.
*/
await gapi.client.drive.apps.get({ appId: "appId",  });

/*
Lists a user's installed apps.
*/
await gapi.client.drive.apps.list({  });

/*
Deprecated - Use changes.getStartPageToken and changes.list to retrieve recent changes.
*/
await gapi.client.drive.changes.get({ changeId: "changeId",  });

/*
Gets the starting pageToken for listing future changes.
*/
await gapi.client.drive.changes.getStartPageToken({  });

/*
Lists the changes for a user or shared drive.
*/
await gapi.client.drive.changes.list({  });

/*
Subscribe to changes for a user.
*/
await gapi.client.drive.changes.watch({  });

/*
Stop watching resources through this channel
*/
await gapi.client.drive.channels.stop({  });

/*
Removes a child from a folder.
*/
await gapi.client.drive.children.delete({ childId: "childId", folderId: "folderId",  });

/*
Gets a specific child reference.
*/
await gapi.client.drive.children.get({ childId: "childId", folderId: "folderId",  });

/*
Inserts a file into a folder.
*/
await gapi.client.drive.children.insert({ folderId: "folderId",  });

/*
Lists a folder's children.
*/
await gapi.client.drive.children.list({ folderId: "folderId",  });

/*
Deletes a comment.
*/
await gapi.client.drive.comments.delete({ commentId: "commentId", fileId: "fileId",  });

/*
Gets a comment by ID.
*/
await gapi.client.drive.comments.get({ commentId: "commentId", fileId: "fileId",  });

/*
Creates a new comment on the given file.
*/
await gapi.client.drive.comments.insert({ fileId: "fileId",  });

/*
Lists a file's comments.
*/
await gapi.client.drive.comments.list({ fileId: "fileId",  });

/*
Updates an existing comment.
*/
await gapi.client.drive.comments.patch({ commentId: "commentId", fileId: "fileId",  });

/*
Updates an existing comment.
*/
await gapi.client.drive.comments.update({ commentId: "commentId", fileId: "fileId",  });

/*
Permanently deletes a shared drive for which the user is an organizer. The shared drive cannot contain any untrashed items.
*/
await gapi.client.drive.drives.delete({ driveId: "driveId",  });

/*
Gets a shared drive's metadata by ID.
*/
await gapi.client.drive.drives.get({ driveId: "driveId",  });

/*
Hides a shared drive from the default view.
*/
await gapi.client.drive.drives.hide({ driveId: "driveId",  });

/*
Creates a new shared drive.
*/
await gapi.client.drive.drives.insert({ requestId: "requestId",  });

/*
Lists the user's shared drives.
*/
await gapi.client.drive.drives.list({  });

/*
Restores a shared drive to the default view.
*/
await gapi.client.drive.drives.unhide({ driveId: "driveId",  });

/*
Updates the metadata for a shared drive.
*/
await gapi.client.drive.drives.update({ driveId: "driveId",  });

/*
Creates a copy of the specified file. Folders cannot be copied.
*/
await gapi.client.drive.files.copy({ fileId: "fileId",  });

/*
Permanently deletes a file by ID. Skips the trash. The currently authenticated user must own the file or be an organizer on the parent for shared drive files.
*/
await gapi.client.drive.files.delete({ fileId: "fileId",  });

/*
Permanently deletes all of the user's trashed files.
*/
await gapi.client.drive.files.emptyTrash({  });

/*
Exports a Google Workspace document to the requested MIME type and returns exported byte content. Note that the exported content is limited to 10MB.
*/
await gapi.client.drive.files.export({ fileId: "fileId", mimeType: "mimeType",  });

/*
Generates a set of file IDs which can be provided in insert or copy requests.
*/
await gapi.client.drive.files.generateIds({  });

/*
Gets a file's metadata or content by ID.
*/
await gapi.client.drive.files.get({ fileId: "fileId",  });

/*
Insert a new file.
*/
await gapi.client.drive.files.insert({  });

/*
Lists the user's files.
*/
await gapi.client.drive.files.list({  });

/*
Lists the labels on a file.
*/
await gapi.client.drive.files.listLabels({ fileId: "fileId",  });

/*
Modifies the set of labels on a file.
*/
await gapi.client.drive.files.modifyLabels({ fileId: "fileId",  });

/*
Updates a file's metadata and/or content. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might change automatically, such as modifiedDate. This method supports patch semantics.
*/
await gapi.client.drive.files.patch({ fileId: "fileId",  });

/*
Set the file's updated time to the current server time.
*/
await gapi.client.drive.files.touch({ fileId: "fileId",  });

/*
Moves a file to the trash. The currently authenticated user must own the file or be at least a fileOrganizer on the parent for shared drive files. Only the owner may trash a file. The trashed item is excluded from all files.list responses returned for any user who does not own the file. However, all users with access to the file can see the trashed item metadata in an API response. All users with access can copy, download, export, and share the file.
*/
await gapi.client.drive.files.trash({ fileId: "fileId",  });

/*
Restores a file from the trash. The currently authenticated user must own the file or be at least a fileOrganizer on the parent for shared drive files. Only the owner may untrash a file.
*/
await gapi.client.drive.files.untrash({ fileId: "fileId",  });

/*
Updates a file's metadata and/or content. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might be changed automatically, such as modifiedDate. This method supports patch semantics.
*/
await gapi.client.drive.files.update({ fileId: "fileId",  });

/*
Subscribes to changes to a file. While you can establish a channel for changes to a file on a shared drive, a change to a shared drive file won't create a notification.
*/
await gapi.client.drive.files.watch({ fileId: "fileId",  });

/*
Removes a parent from a file.
*/
await gapi.client.drive.parents.delete({ fileId: "fileId", parentId: "parentId",  });

/*
Gets a specific parent reference.
*/
await gapi.client.drive.parents.get({ fileId: "fileId", parentId: "parentId",  });

/*
Adds a parent folder for a file.
*/
await gapi.client.drive.parents.insert({ fileId: "fileId",  });

/*
Lists a file's parents.
*/
await gapi.client.drive.parents.list({ fileId: "fileId",  });

/*
Deletes a permission from a file or shared drive.
*/
await gapi.client.drive.permissions.delete({ fileId: "fileId", permissionId: "permissionId",  });

/*
Gets a permission by ID.
*/
await gapi.client.drive.permissions.get({ fileId: "fileId", permissionId: "permissionId",  });

/*
Returns the permission ID for an email address.
*/
await gapi.client.drive.permissions.getIdForEmail({ email: "email",  });

/*
Inserts a permission for a file or shared drive.
*/
await gapi.client.drive.permissions.insert({ fileId: "fileId",  });

/*
Lists a file's or shared drive's permissions.
*/
await gapi.client.drive.permissions.list({ fileId: "fileId",  });

/*
Updates a permission using patch semantics.
*/
await gapi.client.drive.permissions.patch({ fileId: "fileId", permissionId: "permissionId",  });

/*
Updates a permission.
*/
await gapi.client.drive.permissions.update({ fileId: "fileId", permissionId: "permissionId",  });

/*
Deletes a property.
*/
await gapi.client.drive.properties.delete({ fileId: "fileId", propertyKey: "propertyKey",  });

/*
Gets a property by its key.
*/
await gapi.client.drive.properties.get({ fileId: "fileId", propertyKey: "propertyKey",  });

/*
Adds a property to a file, or updates it if it already exists.
*/
await gapi.client.drive.properties.insert({ fileId: "fileId",  });

/*
Lists a file's properties.
*/
await gapi.client.drive.properties.list({ fileId: "fileId",  });

/*
Updates a property.
*/
await gapi.client.drive.properties.patch({ fileId: "fileId", propertyKey: "propertyKey",  });

/*
Updates a property.
*/
await gapi.client.drive.properties.update({ fileId: "fileId", propertyKey: "propertyKey",  });

/*
Deletes a reply.
*/
await gapi.client.drive.replies.delete({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Gets a reply.
*/
await gapi.client.drive.replies.get({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Creates a new reply to the given comment.
*/
await gapi.client.drive.replies.insert({ commentId: "commentId", fileId: "fileId",  });

/*
Lists all of the replies to a comment.
*/
await gapi.client.drive.replies.list({ commentId: "commentId", fileId: "fileId",  });

/*
Updates an existing reply.
*/
await gapi.client.drive.replies.patch({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Updates an existing reply.
*/
await gapi.client.drive.replies.update({ commentId: "commentId", fileId: "fileId", replyId: "replyId",  });

/*
Permanently deletes a file version. You can only delete revisions for files with binary content, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted.
*/
await gapi.client.drive.revisions.delete({ fileId: "fileId", revisionId: "revisionId",  });

/*
Gets a specific revision.
*/
await gapi.client.drive.revisions.get({ fileId: "fileId", revisionId: "revisionId",  });

/*
Lists a file's revisions.
*/
await gapi.client.drive.revisions.list({ fileId: "fileId",  });

/*
Updates a revision.
*/
await gapi.client.drive.revisions.patch({ fileId: "fileId", revisionId: "revisionId",  });

/*
Updates a revision.
*/
await gapi.client.drive.revisions.update({ fileId: "fileId", revisionId: "revisionId",  });

/*
Deprecated use drives.delete instead.
*/
await gapi.client.drive.teamdrives.delete({ teamDriveId: "teamDriveId",  });

/*
Deprecated use drives.get instead.
*/
await gapi.client.drive.teamdrives.get({ teamDriveId: "teamDriveId",  });

/*
Deprecated use drives.insert instead.
*/
await gapi.client.drive.teamdrives.insert({ requestId: "requestId",  });

/*
Deprecated use drives.list instead.
*/
await gapi.client.drive.teamdrives.list({  });

/*
Deprecated use drives.update instead.
*/
await gapi.client.drive.teamdrives.update({ teamDriveId: "teamDriveId",  });
```
