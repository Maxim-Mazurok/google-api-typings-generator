# TypeScript typings for Drive Labels API v2

An API for managing Drive Labels
For detailed description please check [documentation](https://developers.google.com/workspace/drive/labels).

## Installing

Install typings for Drive Labels API:

```
npm install @types/gapi.client.drivelabels-v2 --save-dev
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
  'https://drivelabels.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.drivelabels
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('drivelabels', 'v2', () => {
  // now we can use:
  // gapi.client.drivelabels
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, create, and delete all Google Drive labels in your organization, and see your organization's label-related admin policies
    'https://www.googleapis.com/auth/drive.admin.labels',

    // See all Google Drive labels and label-related admin policies in your organization
    'https://www.googleapis.com/auth/drive.admin.labels.readonly',

    // See, edit, create, and delete your Google Drive labels
    'https://www.googleapis.com/auth/drive.labels',

    // See your Google Drive labels
    'https://www.googleapis.com/auth/drive.labels.readonly',
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

After that you can use Drive Labels API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Creates a label. For more information, see [Create and publish a label](https://developers.google.com/workspace/drive/labels/guides/create-label).
*/
await gapi.client.drivelabels.labels.create({});

/*
Permanently deletes a label and related metadata on Drive items. For more information, see [Disable, enable, and delete a label](https://developers.google.com/workspace/drive/labels/guides/disable-delete-label). Once deleted, the label and related Drive item metadata will be deleted. Only draft labels and disabled labels may be deleted.
*/
await gapi.client.drivelabels.labels.delete({name: 'name'});

/*
Updates a single label by applying a set of update requests resulting in a new draft revision. For more information, see [Update a label](https://developers.google.com/workspace/drive/labels/guides/update-label). The batch update is all-or-nothing: If any of the update requests are invalid, no changes are applied. The resulting draft revision must be published before the changes may be used with Drive items.
*/
await gapi.client.drivelabels.labels.delta({name: 'name'});

/*
Disable a published label. For more information, see [Disable, enable, and delete a label](https://developers.google.com/workspace/drive/labels/guides/disable-delete-label). Disabling a label will result in a new disabled published revision based on the current published revision. If there's a draft revision, a new disabled draft revision will be created based on the latest draft revision. Older draft revisions will be deleted. Once disabled, a label may be deleted with `DeleteLabel`.
*/
await gapi.client.drivelabels.labels.disable({name: 'name'});

/*
Enable a disabled label and restore it to its published state. For more information, see [Disable, enable, and delete a label](https://developers.google.com/workspace/drive/labels/guides/disable-delete-label). This will result in a new published revision based on the current disabled published revision. If there's an existing disabled draft revision, a new revision will be created based on that draft and will be enabled.
*/
await gapi.client.drivelabels.labels.enable({name: 'name'});

/*
Get a label by its resource name. For more information, see [Search for labels](https://developers.google.com/workspace/drive/labels/guides/search-label). Resource name may be any of: * `labels/{id}` - See `labels/{id}@latest` * `labels/{id}@latest` - Gets the latest revision of the label. * `labels/{id}@published` - Gets the current published revision of the label. * `labels/{id}@{revision_id}` - Gets the label at the specified revision ID.
*/
await gapi.client.drivelabels.labels.get({name: 'name'});

/*
List labels. For more information, see [Search for labels](https://developers.google.com/workspace/drive/labels/guides/search-label).
*/
await gapi.client.drivelabels.labels.list({});

/*
Publish all draft changes to the label. Once published, the label may not return to its draft state. For more information, see [Create and publish a label](https://developers.google.com/workspace/drive/labels/guides/create-label). Publishing a label will result in a new published revision. All previous draft revisions will be deleted. Previous published revisions will be kept but are subject to automated deletion as needed. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). Once published, some changes are no longer permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label will be rejected. For example, the following changes to a label will be rejected after the label is published: * The label cannot be directly deleted. It must be disabled first, then deleted. * `Field.FieldType` cannot be changed. * Changes to field validation options cannot reject something that was previously accepted. * Reducing the maximum entries.
*/
await gapi.client.drivelabels.labels.publish({name: 'name'});

/*
Updates a label's `CopyMode`. Changes to this policy aren't revisioned, don't require publishing, and take effect immediately.
*/
await gapi.client.drivelabels.labels.updateLabelCopyMode({name: 'name'});

/*
Updates a label's `EnabledAppSettings`. Enabling a label in a Google Workspace app allows it to be used in that app. This change isn't revisioned, doesn't require publishing, and takes effect immediately.
*/
await gapi.client.drivelabels.labels.updateLabelEnabledAppSettings({
  name: 'name',
});

/*
Updates a label's permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing.
*/
await gapi.client.drivelabels.labels.updatePermissions({parent: 'parent'});

/*
Get the constraints on the structure of a label; such as, the maximum number of fields allowed and maximum length of the label title.
*/
await gapi.client.drivelabels.limits.getLabel({});

/*
Gets the user capabilities.
*/
await gapi.client.drivelabels.users.getCapabilities({name: 'name'});
```
