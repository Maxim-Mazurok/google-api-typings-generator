# TypeScript typings for Cloud Resource Manager API v3

Creates, reads, and updates metadata for Google Cloud Platform resource containers.
For detailed description please check [documentation](https://cloud.google.com/resource-manager).

## Installing

Install typings for Cloud Resource Manager API:

```
npm install @types/gapi.client.cloudresourcemanager@v3 --save-dev
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
gapi.client.load('cloudresourcemanager', 'v3', () => {
  // now we can use gapi.client.cloudresourcemanager
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use Cloud Resource Manager API resources:

```typescript

/*
Create a Lien which applies to the resource denoted by the `parent` field. Callers of this method will require permission on the `parent` resource. For example, applying to `projects/1234` requires permission `resourcemanager.projects.updateLiens`. NOTE: Some resources may limit the number of Liens which may be applied.
*/
await gapi.client.cloudresourcemanager.liens.create({  });

/*
Delete a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.updateLiens`.
*/
await gapi.client.cloudresourcemanager.liens.delete({ name: "name",  });

/*
Retrieve a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission requires permission `resourcemanager.projects.get` or `resourcemanager.projects.updateLiens`.
*/
await gapi.client.cloudresourcemanager.liens.get({ name: "name",  });

/*
List all Liens applied to the `parent` resource. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`.
*/
await gapi.client.cloudresourcemanager.liens.list({  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudresourcemanager.operations.get({ name: "name",  });

/*
Creates a TagBinding between a TagValue and a cloud resource (currently project, folder, or organization).
*/
await gapi.client.cloudresourcemanager.tagBindings.create({  });

/*
Deletes a TagBinding.
*/
await gapi.client.cloudresourcemanager.tagBindings.delete({ name: "name",  });

/*
Lists the TagBindings for the given cloud resource, as specified with `parent`. NOTE: The `parent` field is expected to be a full resource name: https://cloud.google.com/apis/design/resource_names#full_resource_name
*/
await gapi.client.cloudresourcemanager.tagBindings.list({  });

/*
Creates a new TagKey. If another request with the same parameters is sent while the original request is in process, the second request will receive an error. A maximum of 300 TagKeys can exist under a parent at any given time.
*/
await gapi.client.cloudresourcemanager.tagKeys.create({  });

/*
Deletes a TagKey. The TagKey cannot be deleted if it has any child TagValues.
*/
await gapi.client.cloudresourcemanager.tagKeys.delete({ name: "name",  });

/*
Retrieves a TagKey. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it.
*/
await gapi.client.cloudresourcemanager.tagKeys.get({ name: "name",  });

/*
Gets the access control policy for a TagKey. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `cloudresourcemanager.googleapis.com/tagKeys.getIamPolicy` permission on the specified TagKey.
*/
await gapi.client.cloudresourcemanager.tagKeys.getIamPolicy({ resource: "resource",  });

/*
Lists all TagKeys for a parent resource.
*/
await gapi.client.cloudresourcemanager.tagKeys.list({  });

/*
Updates the attributes of the TagKey resource.
*/
await gapi.client.cloudresourcemanager.tagKeys.patch({ name: "name",  });

/*
Sets the access control policy on a TagKey, replacing any existing policy. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `resourcemanager.tagKeys.setIamPolicy` permission on the identified tagValue.
*/
await gapi.client.cloudresourcemanager.tagKeys.setIamPolicy({ resource: "resource",  });

/*
Returns permissions that a caller has on the specified TagKey. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.tagKeys.testIamPermissions({ resource: "resource",  });

/*
Creates a TagValue as a child of the specified TagKey. If a another request with the same parameters is sent while the original request is in process the second request will receive an error. A maximum of 300 TagValues can exist under a TagKey at any given time.
*/
await gapi.client.cloudresourcemanager.tagValues.create({  });

/*
Deletes a TagValue. The TagValue cannot have any bindings when it is deleted.
*/
await gapi.client.cloudresourcemanager.tagValues.delete({ name: "name",  });

/*
Retrieves TagValue. If the TagValue or namespaced name does not exist, or if the user does not have permission to view it, this method will return `PERMISSION_DENIED`.
*/
await gapi.client.cloudresourcemanager.tagValues.get({ name: "name",  });

/*
Gets the access control policy for a TagValue. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have the `cloudresourcemanager.googleapis.com/tagValues.getIamPolicy` permission on the identified TagValue to get the access control policy.
*/
await gapi.client.cloudresourcemanager.tagValues.getIamPolicy({ resource: "resource",  });

/*
Lists all TagValues for a specific TagKey.
*/
await gapi.client.cloudresourcemanager.tagValues.list({  });

/*
Updates the attributes of the TagValue resource.
*/
await gapi.client.cloudresourcemanager.tagValues.patch({ name: "name",  });

/*
Sets the access control policy on a TagValue, replacing any existing policy. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have `resourcemanager.tagValues.setIamPolicy` permission on the identified tagValue.
*/
await gapi.client.cloudresourcemanager.tagValues.setIamPolicy({ resource: "resource",  });

/*
Returns permissions that a caller has on the specified TagValue. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.tagValues.testIamPermissions({ resource: "resource",  });
```
