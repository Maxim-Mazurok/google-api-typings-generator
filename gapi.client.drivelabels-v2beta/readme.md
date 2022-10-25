# TypeScript typings for Drive Labels API v2beta

An API for managing Drive Labels
For detailed description please check [documentation](https://developers.google.com/drive/labels).

## Installing

Install typings for Drive Labels API:

```
npm install @types/gapi.client.drivelabels-v2beta --save-dev
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
gapi.client.load('https://drivelabels.googleapis.com/$discovery/rest?version=v2beta', () => {
  // now we can use:
  // gapi.client.drivelabels
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('drivelabels', 'v2beta', () => {
  // now we can use:
  // gapi.client.drivelabels
});
```



After that you can use Drive Labels API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Creates a new Label.
*/
await gapi.client.drivelabels.labels.create({  });

/*
Permanently deletes a Label and related metadata on Drive Items. Once deleted, the Label and related Drive item metadata will be deleted. Only draft Labels, and disabled Labels may be deleted.
*/
await gapi.client.drivelabels.labels.delete({ name: "name",  });

/*
Updates a single Label by applying a set of update requests resulting in a new draft revision. The batch update is all-or-nothing: If any of the update requests are invalid, no changes are applied. The resulting draft revision must be published before the changes may be used with Drive Items.
*/
await gapi.client.drivelabels.labels.delta({ name: "name",  });

/*
Disable a published Label. Disabling a Label will result in a new disabled published revision based on the current published revision. If there is a draft revision, a new disabled draft revision will be created based on the latest draft revision. Older draft revisions will be deleted. Once disabled, a label may be deleted with `DeleteLabel`.
*/
await gapi.client.drivelabels.labels.disable({ name: "name",  });

/*
Enable a disabled Label and restore it to its published state. This will result in a new published revision based on the current disabled published revision. If there is an existing disabled draft revision, a new revision will be created based on that draft and will be enabled.
*/
await gapi.client.drivelabels.labels.enable({ name: "name",  });

/*
Get a label by its resource name. Resource name may be any of: * `labels/{id}` - See `labels/{id}@latest` * `labels/{id}@latest` - Gets the latest revision of the label. * `labels/{id}@published` - Gets the current published revision of the label. * `labels/{id}@{revision_id}` - Gets the label at the specified revision ID.
*/
await gapi.client.drivelabels.labels.get({ name: "name",  });

/*
List labels.
*/
await gapi.client.drivelabels.labels.list({  });

/*
Publish all draft changes to the Label. Once published, the Label may not return to its draft state. See `google.apps.drive.labels.v2.Lifecycle` for more information. Publishing a Label will result in a new published revision. All previous draft revisions will be deleted. Previous published revisions will be kept but are subject to automated deletion as needed. Once published, some changes are no longer permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the Label will be rejected. For example, the following changes to a Label will be rejected after the Label is published: * The label cannot be directly deleted. It must be disabled first, then deleted. * Field.FieldType cannot be changed. * Changes to Field validation options cannot reject something that was previously accepted. * Reducing the max entries.
*/
await gapi.client.drivelabels.labels.publish({ name: "name",  });

/*
Updates a Label's `CopyMode`. Changes to this policy are not revisioned, do not require publishing, and take effect immediately.
*/
await gapi.client.drivelabels.labels.updateLabelCopyMode({ name: "name",  });

/*
Get the constraints on the structure of a Label; such as, the maximum number of Fields allowed and maximum length of the label title.
*/
await gapi.client.drivelabels.limits.getLabel({  });

/*
Gets the user capabilities.
*/
await gapi.client.drivelabels.users.getCapabilities({ name: "name",  });
```
