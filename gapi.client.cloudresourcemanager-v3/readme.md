# TypeScript typings for Cloud Resource Manager API v3

Creates, reads, and updates metadata for Google Cloud Platform resource containers.
For detailed description please check [documentation](https://cloud.google.com/resource-manager).

## Installing

Install typings for Cloud Resource Manager API:

```
npm install @types/gapi.client.cloudresourcemanager-v3 --save-dev
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
  'https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v3',
  () => {
    // now we can use:
    // gapi.client.cloudresourcemanager
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudresourcemanager', 'v3', () => {
  // now we can use:
  // gapi.client.cloudresourcemanager
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View your data across Google Cloud services and see the email address of your Google Account
    'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use Cloud Resource Manager API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Return a list of effective tags for the given Google Cloud resource, as specified in `parent`.
*/
await gapi.client.cloudresourcemanager.effectiveTags.list({});

/*
Creates a folder in the resource hierarchy. Returns an `Operation` which can be used to track the progress of the folder creation workflow. Upon success, the `Operation.response` field will be populated with the created Folder. In order to succeed, the addition of this new folder must not violate the folder naming, height, or fanout constraints. + The folder's `display_name` must be distinct from all other folders that share its parent. + The addition of the folder must not cause the active folder hierarchy to exceed a height of 10. Note, the full active + deleted folder hierarchy is allowed to reach a height of 20; this provides additional headroom when moving folders that contain deleted folders. + The addition of the folder must not cause the total number of folders under its parent to exceed 300. If the operation fails due to a folder constraint violation, some errors may be returned by the `CreateFolder` request, with status code `FAILED_PRECONDITION` and an error description. Other folder constraint violations will be communicated in the `Operation`, with the specific `PreconditionFailure` returned in the details list in the `Operation.error` field. The caller must have `resourcemanager.folders.create` permission on the identified parent.
*/
await gapi.client.cloudresourcemanager.folders.create({});

/*
Requests deletion of a folder. The folder is moved into the DELETE_REQUESTED state immediately, and is deleted approximately 30 days later. This method may only be called on an empty folder, where a folder is empty if it doesn't contain any folders or projects in the ACTIVE state. If called on a folder in DELETE_REQUESTED state the operation will result in a no-op success. The caller must have `resourcemanager.folders.delete` permission on the identified folder.
*/
await gapi.client.cloudresourcemanager.folders.delete({name: 'name'});

/*
Retrieves a folder identified by the supplied resource name. Valid folder resource names have the format `folders/{folder_id}` (for example, `folders/1234`). The caller must have `resourcemanager.folders.get` permission on the identified folder.
*/
await gapi.client.cloudresourcemanager.folders.get({name: 'name'});

/*
Gets the access control policy for a folder. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the folder's resource name, for example: "folders/1234". The caller must have `resourcemanager.folders.getIamPolicy` permission on the identified folder.
*/
await gapi.client.cloudresourcemanager.folders.getIamPolicy({
  resource: 'resource',
});

/*
Lists the folders that are direct descendants of supplied parent resource. `list()` provides a strongly consistent view of the folders underneath the specified parent resource. `list()` returns folders sorted based upon the (ascending) lexical ordering of their display_name. The caller must have `resourcemanager.folders.list` permission on the identified parent.
*/
await gapi.client.cloudresourcemanager.folders.list({});

/*
Moves a folder under a new resource parent. Returns an `Operation` which can be used to track the progress of the folder move workflow. Upon success, the `Operation.response` field will be populated with the moved folder. Upon failure, a `FolderOperationError` categorizing the failure cause will be returned - if the failure occurs synchronously then the `FolderOperationError` will be returned in the `Status.details` field. If it occurs asynchronously, then the FolderOperation will be returned in the `Operation.error` field. In addition, the `Operation.metadata` field will be populated with a `FolderOperation` message as an aid to stateless clients. Folder moves will be rejected if they violate either the naming, height, or fanout constraints described in the CreateFolder documentation. The caller must have `resourcemanager.folders.move` permission on the folder's current and proposed new parent.
*/
await gapi.client.cloudresourcemanager.folders.move({name: 'name'});

/*
Updates a folder, changing its `display_name`. Changes to the folder `display_name` will be rejected if they violate either the `display_name` formatting rules or the naming constraints described in the CreateFolder documentation. The folder's `display_name` must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be between 3 and 30 characters. This is captured by the regular expression: `\p{L}\p{N}{1,28}[\p{L}\p{N}]`. The caller must have `resourcemanager.folders.update` permission on the identified folder. If the update fails due to the unique name constraint then a `PreconditionFailure` explaining this violation will be returned in the Status.details field.
*/
await gapi.client.cloudresourcemanager.folders.patch({name: 'name'});

/*
Search for folders that match specific filter criteria. `search()` provides an eventually consistent view of the folders a user has access to which meet the specified filter criteria. This will only return folders on which the caller has the permission `resourcemanager.folders.get`.
*/
await gapi.client.cloudresourcemanager.folders.search({});

/*
Sets the access control policy on a folder, replacing any existing policy. The `resource` field should be the folder's resource name, for example: "folders/1234". The caller must have `resourcemanager.folders.setIamPolicy` permission on the identified folder.
*/
await gapi.client.cloudresourcemanager.folders.setIamPolicy({
  resource: 'resource',
});

/*
Returns permissions that a caller has on the specified folder. The `resource` field should be the folder's resource name, for example: "folders/1234". There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.folders.testIamPermissions({
  resource: 'resource',
});

/*
Cancels the deletion request for a folder. This method may be called on a folder in any state. If the folder is in the ACTIVE state the result will be a no-op success. In order to succeed, the folder's parent must be in the ACTIVE state. In addition, reintroducing the folder into the tree must not violate folder naming, height, and fanout constraints described in the CreateFolder documentation. The caller must have `resourcemanager.folders.undelete` permission on the identified folder.
*/
await gapi.client.cloudresourcemanager.folders.undelete({name: 'name'});

/*
Create a Lien which applies to the resource denoted by the `parent` field. Callers of this method will require permission on the `parent` resource. For example, applying to `projects/1234` requires permission `resourcemanager.projects.updateLiens`. NOTE: Some resources may limit the number of Liens which may be applied.
*/
await gapi.client.cloudresourcemanager.liens.create({});

/*
Delete a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.updateLiens`.
*/
await gapi.client.cloudresourcemanager.liens.delete({name: 'name'});

/*
Retrieve a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`
*/
await gapi.client.cloudresourcemanager.liens.get({name: 'name'});

/*
List all Liens applied to the `parent` resource. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`.
*/
await gapi.client.cloudresourcemanager.liens.list({});

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudresourcemanager.operations.get({name: 'name'});

/*
Fetches an organization resource identified by the specified resource name.
*/
await gapi.client.cloudresourcemanager.organizations.get({name: 'name'});

/*
Gets the access control policy for an organization resource. The policy may be empty if no such policy or resource exists. The `resource` field should be the organization's resource name, for example: "organizations/123". Authorization requires the IAM permission `resourcemanager.organizations.getIamPolicy` on the specified organization.
*/
await gapi.client.cloudresourcemanager.organizations.getIamPolicy({
  resource: 'resource',
});

/*
Searches organization resources that are visible to the user and satisfy the specified filter. This method returns organizations in an unspecified order. New organizations do not necessarily appear at the end of the results, and may take a small amount of time to appear. Search will only return organizations on which the user has the permission `resourcemanager.organizations.get` or has super admin privileges.
*/
await gapi.client.cloudresourcemanager.organizations.search({});

/*
Sets the access control policy on an organization resource. Replaces any existing policy. The `resource` field should be the organization's resource name, for example: "organizations/123". Authorization requires the IAM permission `resourcemanager.organizations.setIamPolicy` on the specified organization.
*/
await gapi.client.cloudresourcemanager.organizations.setIamPolicy({
  resource: 'resource',
});

/*
Returns the permissions that a caller has on the specified organization. The `resource` field should be the organization's resource name, for example: "organizations/123". There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.organizations.testIamPermissions({
  resource: 'resource',
});

/*
Request that a new project be created. The result is an `Operation` which can be used to track the creation process. This process usually takes a few seconds, but can sometimes take much longer. The tracking `Operation` is automatically deleted after a few hours, so there is no need to call `DeleteOperation`.
*/
await gapi.client.cloudresourcemanager.projects.create({});

/*
Marks the project identified by the specified `name` (for example, `projects/415104041262`) for deletion. This method will only affect the project if it has a lifecycle state of ACTIVE. This method changes the Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion starts at an unspecified time, at which point the Project is no longer accessible. Until the deletion completes, you can check the lifecycle state checked by retrieving the project with GetProject, and the project remains visible to ListProjects. However, you cannot update the project. After the deletion completes, the project is not retrievable by the GetProject, ListProjects, and SearchProjects methods. This method behaves idempotently, such that deleting a `DELETE_REQUESTED` project will not cause an error, but also won't do anything. The caller must have `resourcemanager.projects.delete` permissions for this project.
*/
await gapi.client.cloudresourcemanager.projects.delete({name: 'name'});

/*
Retrieves the project identified by the specified `name` (for example, `projects/415104041262`). The caller must have `resourcemanager.projects.get` permission for this project.
*/
await gapi.client.cloudresourcemanager.projects.get({name: 'name'});

/*
Returns the IAM access control policy for the specified project, in the format `projects/{ProjectIdOrNumber}` e.g. projects/123. Permission is denied if the policy or the resource do not exist.
*/
await gapi.client.cloudresourcemanager.projects.getIamPolicy({
  resource: 'resource',
});

/*
Lists projects that are direct children of the specified folder or organization resource. `list()` provides a strongly consistent view of the projects underneath the specified parent resource. `list()` returns projects sorted based upon the (ascending) lexical ordering of their `display_name`. The caller must have `resourcemanager.projects.list` permission on the identified parent.
*/
await gapi.client.cloudresourcemanager.projects.list({});

/*
Move a project to another place in your resource hierarchy, under a new resource parent. Returns an operation which can be used to track the process of the project move workflow. Upon success, the `Operation.response` field will be populated with the moved project. The caller must have `resourcemanager.projects.move` permission on the project, on the project's current and proposed new parent. If project has no current parent, or it currently does not have an associated organization resource, you will also need the `resourcemanager.projects.setIamPolicy` permission in the project. 
*/
await gapi.client.cloudresourcemanager.projects.move({name: 'name'});

/*
Updates the `display_name` and labels of the project identified by the specified `name` (for example, `projects/415104041262`). Deleting all labels requires an update mask for labels field. The caller must have `resourcemanager.projects.update` permission for this project.
*/
await gapi.client.cloudresourcemanager.projects.patch({name: 'name'});

/*
Search for projects that the caller has the `resourcemanager.projects.get` permission on, and also satisfy the specified query. This method returns projects in an unspecified order. This method is eventually consistent with project mutations; this means that a newly created project may not appear in the results or recent updates to an existing project may not be reflected in the results. To retrieve the latest state of a project, use the GetProject method.
*/
await gapi.client.cloudresourcemanager.projects.search({});

/*
Sets the IAM access control policy for the specified project, in the format `projects/{ProjectIdOrNumber}` e.g. projects/123. CAUTION: This method will replace the existing policy, and cannot be used to append additional IAM settings. Note: Removing service accounts from policies or changing their roles can render services completely inoperable. It is important to understand how the service account is being used before removing or updating its roles. The following constraints apply when using `setIamPolicy()`: + Project does not support `allUsers` and `allAuthenticatedUsers` as `members` in a `Binding` of a `Policy`. + The owner role can be granted to a `user`, `serviceAccount`, or a group that is part of an organization. For example, group@myownpersonaldomain.com could be added as an owner to a project in the myownpersonaldomain.com organization, but not the examplepetstore.com organization. + Service accounts can be made owners of a project directly without any restrictions. However, to be added as an owner, a user must be invited using the Cloud Platform console and must accept the invitation. + A user cannot be granted the owner role using `setIamPolicy()`. The user must be granted the owner role using the Cloud Platform Console and must explicitly accept the invitation. + Invitations to grant the owner role cannot be sent using `setIamPolicy()`; they must be sent only using the Cloud Platform Console. + If the project is not part of an organization, there must be at least one owner who has accepted the Terms of Service (ToS) agreement in the policy. Calling `setIamPolicy()` to remove the last ToS-accepted owner from the policy will fail. This restriction also applies to legacy projects that no longer have owners who have accepted the ToS. Edits to IAM policies will be rejected until the lack of a ToS-accepting owner is rectified. If the project is part of an organization, you can remove all owners, potentially making the organization inaccessible.
*/
await gapi.client.cloudresourcemanager.projects.setIamPolicy({
  resource: 'resource',
});

/*
Returns permissions that a caller has on the specified project, in the format `projects/{ProjectIdOrNumber}` e.g. projects/123..
*/
await gapi.client.cloudresourcemanager.projects.testIamPermissions({
  resource: 'resource',
});

/*
Restores the project identified by the specified `name` (for example, `projects/415104041262`). You can only use this method for a project that has a lifecycle state of DELETE_REQUESTED. After deletion starts, the project cannot be restored. The caller must have `resourcemanager.projects.undelete` permission for this project.
*/
await gapi.client.cloudresourcemanager.projects.undelete({name: 'name'});

/*
Creates a TagBinding between a TagValue and a Google Cloud resource.
*/
await gapi.client.cloudresourcemanager.tagBindings.create({});

/*
Deletes a TagBinding.
*/
await gapi.client.cloudresourcemanager.tagBindings.delete({name: 'name'});

/*
Lists the TagBindings for the given Google Cloud resource, as specified with `parent`. NOTE: The `parent` field is expected to be a full resource name: https://cloud.google.com/apis/design/resource_names#full_resource_name
*/
await gapi.client.cloudresourcemanager.tagBindings.list({});

/*
Creates a new TagKey. If another request with the same parameters is sent while the original request is in process, the second request will receive an error. A maximum of 1000 TagKeys can exist under a parent at any given time.
*/
await gapi.client.cloudresourcemanager.tagKeys.create({});

/*
Deletes a TagKey. The TagKey cannot be deleted if it has any child TagValues.
*/
await gapi.client.cloudresourcemanager.tagKeys.delete({name: 'name'});

/*
Retrieves a TagKey. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it.
*/
await gapi.client.cloudresourcemanager.tagKeys.get({name: 'name'});

/*
Gets the access control policy for a TagKey. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `cloudresourcemanager.googleapis.com/tagKeys.getIamPolicy` permission on the specified TagKey.
*/
await gapi.client.cloudresourcemanager.tagKeys.getIamPolicy({
  resource: 'resource',
});

/*
Retrieves a TagKey by its namespaced name. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it.
*/
await gapi.client.cloudresourcemanager.tagKeys.getNamespaced({});

/*
Lists all TagKeys for a parent resource.
*/
await gapi.client.cloudresourcemanager.tagKeys.list({});

/*
Updates the attributes of the TagKey resource.
*/
await gapi.client.cloudresourcemanager.tagKeys.patch({name: 'name'});

/*
Sets the access control policy on a TagKey, replacing any existing policy. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `resourcemanager.tagKeys.setIamPolicy` permission on the identified tagValue.
*/
await gapi.client.cloudresourcemanager.tagKeys.setIamPolicy({
  resource: 'resource',
});

/*
Returns permissions that a caller has on the specified TagKey. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.tagKeys.testIamPermissions({
  resource: 'resource',
});

/*
Creates a TagValue as a child of the specified TagKey. If a another request with the same parameters is sent while the original request is in process the second request will receive an error. A maximum of 1000 TagValues can exist under a TagKey at any given time.
*/
await gapi.client.cloudresourcemanager.tagValues.create({});

/*
Deletes a TagValue. The TagValue cannot have any bindings when it is deleted.
*/
await gapi.client.cloudresourcemanager.tagValues.delete({name: 'name'});

/*
Retrieves a TagValue. This method will return `PERMISSION_DENIED` if the value does not exist or the user does not have permission to view it.
*/
await gapi.client.cloudresourcemanager.tagValues.get({name: 'name'});

/*
Gets the access control policy for a TagValue. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have the `cloudresourcemanager.googleapis.com/tagValues.getIamPolicy` permission on the identified TagValue to get the access control policy.
*/
await gapi.client.cloudresourcemanager.tagValues.getIamPolicy({
  resource: 'resource',
});

/*
Retrieves a TagValue by its namespaced name. This method will return `PERMISSION_DENIED` if the value does not exist or the user does not have permission to view it.
*/
await gapi.client.cloudresourcemanager.tagValues.getNamespaced({});

/*
Lists all TagValues for a specific TagKey.
*/
await gapi.client.cloudresourcemanager.tagValues.list({});

/*
Updates the attributes of the TagValue resource.
*/
await gapi.client.cloudresourcemanager.tagValues.patch({name: 'name'});

/*
Sets the access control policy on a TagValue, replacing any existing policy. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have `resourcemanager.tagValues.setIamPolicy` permission on the identified tagValue.
*/
await gapi.client.cloudresourcemanager.tagValues.setIamPolicy({
  resource: 'resource',
});

/*
Returns permissions that a caller has on the specified TagValue. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.tagValues.testIamPermissions({
  resource: 'resource',
});
```