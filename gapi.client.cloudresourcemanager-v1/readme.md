# TypeScript typings for Cloud Resource Manager API v1

Creates, reads, and updates metadata for Google Cloud Platform resource containers.
For detailed description please check [documentation](https://cloud.google.com/resource-manager).

## Installing

Install typings for Cloud Resource Manager API:

```
npm install @types/gapi.client.cloudresourcemanager-v1 --save-dev
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
  'https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.cloudresourcemanager
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudresourcemanager', 'v1', () => {
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
Clears a `Policy` from a resource.
*/
await gapi.client.cloudresourcemanager.folders.clearOrgPolicy({
  resource: 'resource',
});

/*
Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
*/
await gapi.client.cloudresourcemanager.folders.getEffectiveOrgPolicy({
  resource: 'resource',
});

/*
Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write.
*/
await gapi.client.cloudresourcemanager.folders.getOrgPolicy({
  resource: 'resource',
});

/*
Lists `Constraints` that could be applied on the specified resource.
*/
await gapi.client.cloudresourcemanager.folders.listAvailableOrgPolicyConstraints(
  {resource: 'resource'}
);

/*
Lists all the `Policies` set for a particular resource.
*/
await gapi.client.cloudresourcemanager.folders.listOrgPolicies({
  resource: 'resource',
});

/*
Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`.
*/
await gapi.client.cloudresourcemanager.folders.setOrgPolicy({
  resource: 'resource',
});

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
Clears a `Policy` from a resource.
*/
await gapi.client.cloudresourcemanager.organizations.clearOrgPolicy({
  resource: 'resource',
});

/*
Fetches an Organization resource identified by the specified resource name.
*/
await gapi.client.cloudresourcemanager.organizations.get({name: 'name'});

/*
Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
*/
await gapi.client.cloudresourcemanager.organizations.getEffectiveOrgPolicy({
  resource: 'resource',
});

/*
Gets the access control policy for an Organization resource. May be empty if no such policy or resource exists. The `resource` field should be the organization's resource name, e.g. "organizations/123". Authorization requires the Google IAM permission `resourcemanager.organizations.getIamPolicy` on the specified organization
*/
await gapi.client.cloudresourcemanager.organizations.getIamPolicy({
  resource: 'resource',
});

/*
Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write.
*/
await gapi.client.cloudresourcemanager.organizations.getOrgPolicy({
  resource: 'resource',
});

/*
Lists `Constraints` that could be applied on the specified resource.
*/
await gapi.client.cloudresourcemanager.organizations.listAvailableOrgPolicyConstraints(
  {resource: 'resource'}
);

/*
Lists all the `Policies` set for a particular resource.
*/
await gapi.client.cloudresourcemanager.organizations.listOrgPolicies({
  resource: 'resource',
});

/*
Searches Organization resources that are visible to the user and satisfy the specified filter. This method returns Organizations in an unspecified order. New Organizations do not necessarily appear at the end of the results. Search will only return organizations on which the user has the permission `resourcemanager.organizations.get` or has super admin privileges.
*/
await gapi.client.cloudresourcemanager.organizations.search({});

/*
Sets the access control policy on an Organization resource. Replaces any existing policy. The `resource` field should be the organization's resource name, e.g. "organizations/123". Authorization requires the Google IAM permission `resourcemanager.organizations.setIamPolicy` on the specified organization
*/
await gapi.client.cloudresourcemanager.organizations.setIamPolicy({
  resource: 'resource',
});

/*
Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`.
*/
await gapi.client.cloudresourcemanager.organizations.setOrgPolicy({
  resource: 'resource',
});

/*
Returns permissions that a caller has on the specified Organization. The `resource` field should be the organization's resource name, e.g. "organizations/123". There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.organizations.testIamPermissions({
  resource: 'resource',
});

/*
Clears a `Policy` from a resource.
*/
await gapi.client.cloudresourcemanager.projects.clearOrgPolicy({
  resource: 'resource',
});

/*
Request that a new Project be created. The result is an Operation which can be used to track the creation process. This process usually takes a few seconds, but can sometimes take much longer. The tracking Operation is automatically deleted after a few hours, so there is no need to call DeleteOperation. Authorization requires the Google IAM permission `resourcemanager.projects.create` on the specified parent for the new project. The parent is identified by a specified ResourceId, which must include both an ID and a type, such as organization. This method does not associate the new project with a billing account. You can set or update the billing account associated with a project using the [`projects.updateBillingInfo`] (/billing/reference/rest/v1/projects/updateBillingInfo) method.
*/
await gapi.client.cloudresourcemanager.projects.create({});

/*
Marks the Project identified by the specified `project_id` (for example, `my-project-123`) for deletion. This method will only affect the Project if it has a lifecycle state of ACTIVE. This method changes the Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion starts at an unspecified time, at which point the Project is no longer accessible. Until the deletion completes, you can check the lifecycle state checked by retrieving the Project with GetProject, and the Project remains visible to ListProjects. However, you cannot update the project. After the deletion completes, the Project is not retrievable by the GetProject and ListProjects methods. The caller must have delete permissions for this Project.
*/
await gapi.client.cloudresourcemanager.projects.delete({
  projectId: 'projectId',
});

/*
Retrieves the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project.
*/
await gapi.client.cloudresourcemanager.projects.get({projectId: 'projectId'});

/*
Gets a list of ancestors in the resource hierarchy for the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project.
*/
await gapi.client.cloudresourcemanager.projects.getAncestry({
  projectId: 'projectId',
});

/*
Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
*/
await gapi.client.cloudresourcemanager.projects.getEffectiveOrgPolicy({
  resource: 'resource',
});

/*
Returns the IAM access control policy for the specified Project. Permission is denied if the policy or the resource does not exist. Authorization requires the Google IAM permission `resourcemanager.projects.getIamPolicy` on the project. For additional information about `resource` (e.g. my-project-id) structure and identification, see [Resource Names](https://cloud.google.com/apis/design/resource_names).
*/
await gapi.client.cloudresourcemanager.projects.getIamPolicy({
  resource: 'resource',
});

/*
Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write.
*/
await gapi.client.cloudresourcemanager.projects.getOrgPolicy({
  resource: 'resource',
});

/*
Lists Projects that the caller has the `resourcemanager.projects.get` permission on and satisfy the specified filter. This method returns Projects in an unspecified order. This method is eventually consistent with project mutations; this means that a newly created project may not appear in the results or recent updates to an existing project may not be reflected in the results. To retrieve the latest state of a project, use the GetProject method. NOTE: If the request filter contains a `parent.type` and `parent.id` and the caller has the `resourcemanager.projects.list` permission on the parent, the results will be drawn from an alternate index which provides more consistent results. In future versions of this API, this List method will be split into List and Search to properly capture the behavioral difference.
*/
await gapi.client.cloudresourcemanager.projects.list({});

/*
Lists `Constraints` that could be applied on the specified resource.
*/
await gapi.client.cloudresourcemanager.projects.listAvailableOrgPolicyConstraints(
  {resource: 'resource'}
);

/*
Lists all the `Policies` set for a particular resource.
*/
await gapi.client.cloudresourcemanager.projects.listOrgPolicies({
  resource: 'resource',
});

/*
Sets the IAM access control policy for the specified Project. CAUTION: This method will replace the existing policy, and cannot be used to append additional IAM settings. NOTE: Removing service accounts from policies or changing their roles can render services completely inoperable. It is important to understand how the service account is being used before removing or updating its roles. For additional information about `resource` (e.g. my-project-id) structure and identification, see [Resource Names](https://cloud.google.com/apis/design/resource_names). The following constraints apply when using `setIamPolicy()`: + Project does not support `allUsers` and `allAuthenticatedUsers` as `members` in a `Binding` of a `Policy`. + The owner role can be granted to a `user`, `serviceAccount`, or a group that is part of an organization. For example, group@myownpersonaldomain.com could be added as an owner to a project in the myownpersonaldomain.com organization, but not the examplepetstore.com organization. + Service accounts can be made owners of a project directly without any restrictions. However, to be added as an owner, a user must be invited via Cloud Platform console and must accept the invitation. + A user cannot be granted the owner role using `setIamPolicy()`. The user must be granted the owner role using the Cloud Platform Console and must explicitly accept the invitation. + You can only grant ownership of a project to a member by using the Google Cloud console. Inviting a member will deliver an invitation email that they must accept. An invitation email is not generated if you are granting a role other than owner, or if both the member you are inviting and the project are part of your organization. + If the project is not part of an organization, there must be at least one owner who has accepted the Terms of Service (ToS) agreement in the policy. Calling `setIamPolicy()` to remove the last ToS-accepted owner from the policy will fail. This restriction also applies to legacy projects that no longer have owners who have accepted the ToS. Edits to IAM policies will be rejected until the lack of a ToS-accepting owner is rectified. If the project is part of an organization, you can remove all owners, potentially making the organization inaccessible. Authorization requires the Google IAM permission `resourcemanager.projects.setIamPolicy` on the project
*/
await gapi.client.cloudresourcemanager.projects.setIamPolicy({
  resource: 'resource',
});

/*
Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`.
*/
await gapi.client.cloudresourcemanager.projects.setOrgPolicy({
  resource: 'resource',
});

/*
Returns permissions that a caller has on the specified Project. For additional information about `resource` (e.g. my-project-id) structure and identification, see [Resource Names](https://cloud.google.com/apis/design/resource_names). There are no permissions required for making this API call.
*/
await gapi.client.cloudresourcemanager.projects.testIamPermissions({
  resource: 'resource',
});

/*
Restores the Project identified by the specified `project_id` (for example, `my-project-123`). You can only use this method for a Project that has a lifecycle state of DELETE_REQUESTED. After deletion starts, the Project cannot be restored. The caller must have undelete permissions for this Project.
*/
await gapi.client.cloudresourcemanager.projects.undelete({
  projectId: 'projectId',
});

/*
Updates the attributes of the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have modify permissions for this Project.
*/
await gapi.client.cloudresourcemanager.projects.update({
  projectId: 'projectId',
});
```