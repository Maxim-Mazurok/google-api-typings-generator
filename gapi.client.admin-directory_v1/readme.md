# TypeScript typings for Admin SDK API directory_v1

Admin SDK lets administrators of enterprise domains to view and manage resources like user, groups etc. It also provides audit and usage reports of domain.
For detailed description please check [documentation](https://developers.google.com/admin-sdk/).

## Installing

Install typings for Admin SDK API:

```
npm install @types/gapi.client.admin-directory_v1 --save-dev
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
  'https://admin.googleapis.com/$discovery/rest?version=directory_v1',
  () => {
    // now we can use:
    // gapi.client.admin
    // gapi.client.directory
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('admin', 'directory_v1', () => {
  // now we can use:
  // gapi.client.admin
  // gapi.client.directory
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, add, edit, and permanently delete the printers that your organization can use with Chrome
    'https://www.googleapis.com/auth/admin.chrome.printers',

    // See the printers that your organization can use with Chrome
    'https://www.googleapis.com/auth/admin.chrome.printers.readonly',

    // View and manage customer related information
    'https://www.googleapis.com/auth/admin.directory.customer',

    // View customer related information
    'https://www.googleapis.com/auth/admin.directory.customer.readonly',

    // View and manage your Chrome OS devices' metadata
    'https://www.googleapis.com/auth/admin.directory.device.chromeos',

    // View your Chrome OS devices' metadata
    'https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly',

    // View and manage your mobile devices' metadata
    'https://www.googleapis.com/auth/admin.directory.device.mobile',

    // Manage your mobile devices by performing administrative tasks
    'https://www.googleapis.com/auth/admin.directory.device.mobile.action',

    // View your mobile devices' metadata
    'https://www.googleapis.com/auth/admin.directory.device.mobile.readonly',

    // View and manage the provisioning of domains for your customers
    'https://www.googleapis.com/auth/admin.directory.domain',

    // View domains related to your customers
    'https://www.googleapis.com/auth/admin.directory.domain.readonly',

    // View and manage the provisioning of groups on your domain
    'https://www.googleapis.com/auth/admin.directory.group',

    // View and manage group subscriptions on your domain
    'https://www.googleapis.com/auth/admin.directory.group.member',

    // View group subscriptions on your domain
    'https://www.googleapis.com/auth/admin.directory.group.member.readonly',

    // View groups on your domain
    'https://www.googleapis.com/auth/admin.directory.group.readonly',

    // View and manage organization units on your domain
    'https://www.googleapis.com/auth/admin.directory.orgunit',

    // View organization units on your domain
    'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',

    // View and manage the provisioning of calendar resources on your domain
    'https://www.googleapis.com/auth/admin.directory.resource.calendar',

    // View calendar resources on your domain
    'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',

    // Manage delegated admin roles for your domain
    'https://www.googleapis.com/auth/admin.directory.rolemanagement',

    // View delegated admin roles for your domain
    'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',

    // View and manage the provisioning of users on your domain
    'https://www.googleapis.com/auth/admin.directory.user',

    // View and manage user aliases on your domain
    'https://www.googleapis.com/auth/admin.directory.user.alias',

    // View user aliases on your domain
    'https://www.googleapis.com/auth/admin.directory.user.alias.readonly',

    // See info about users on your domain
    'https://www.googleapis.com/auth/admin.directory.user.readonly',

    // Manage data access permissions for users on your domain
    'https://www.googleapis.com/auth/admin.directory.user.security',

    // View and manage the provisioning of user schemas on your domain
    'https://www.googleapis.com/auth/admin.directory.userschema',

    // View user schemas on your domain
    'https://www.googleapis.com/auth/admin.directory.userschema.readonly',

    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',
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

After that you can use Admin SDK API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Deletes an ASP issued by a user.
*/
await gapi.client.directory.asps.delete({codeId: 1, userKey: 'userKey'});

/*
Gets information about an ASP issued by a user.
*/
await gapi.client.directory.asps.get({codeId: 1, userKey: 'userKey'});

/*
Lists the ASPs issued by a user.
*/
await gapi.client.directory.asps.list({userKey: 'userKey'});

/*
Stops watching resources through this channel.
*/
await gapi.client.admin.channels.stop({});

/*
Use [BatchChangeChromeOsDeviceStatus](/admin-sdk/directory/reference/rest/v1/customer.devices.chromeos/batchChangeStatus) instead. Takes an action that affects a Chrome OS Device. This includes deprovisioning, disabling, and re-enabling devices. *Warning:* * Deprovisioning a device will stop device policy syncing and remove device-level printers. After a device is deprovisioned, it must be wiped before it can be re-enrolled. * Lost or stolen devices should use the disable action. * Re-enabling a disabled device will consume a device license. If you do not have sufficient licenses available when completing the re-enable action, you will receive an error. For more information about deprovisioning and disabling devices, visit the [help center](https://support.google.com/chrome/a/answer/3523633).
*/
await gapi.client.directory.chromeosdevices.action({
  customerId: 'customerId',
  resourceId: 'resourceId',
});

/*
Retrieves a Chrome OS device's properties.
*/
await gapi.client.directory.chromeosdevices.get({
  customerId: 'customerId',
  deviceId: 'deviceId',
});

/*
Retrieves a paginated list of Chrome OS devices within an account.
*/
await gapi.client.directory.chromeosdevices.list({customerId: 'customerId'});

/*
Moves or inserts multiple Chrome OS devices to an organizational unit. You can move up to 50 devices at once.
*/
await gapi.client.directory.chromeosdevices.moveDevicesToOu({
  customerId: 'customerId',
  orgUnitPath: 'orgUnitPath',
});

/*
Updates a device's updatable properties, such as `annotatedUser`, `annotatedLocation`, `notes`, `orgUnitPath`, or `annotatedAssetId`. This method supports [patch semantics](/admin-sdk/directory/v1/guides/performance#patch).
*/
await gapi.client.directory.chromeosdevices.patch({
  customerId: 'customerId',
  deviceId: 'deviceId',
});

/*
Updates a device's updatable properties, such as `annotatedUser`, `annotatedLocation`, `notes`, `orgUnitPath`, or `annotatedAssetId`.
*/
await gapi.client.directory.chromeosdevices.update({
  customerId: 'customerId',
  deviceId: 'deviceId',
});

/*
Retrieves a customer.
*/
await gapi.client.directory.customers.get({customerKey: 'customerKey'});

/*
Patches a customer.
*/
await gapi.client.directory.customers.patch({customerKey: 'customerKey'});

/*
Updates a customer.
*/
await gapi.client.directory.customers.update({customerKey: 'customerKey'});

/*
Deletes a domain Alias of the customer.
*/
await gapi.client.directory.domainAliases.delete({
  customer: 'customer',
  domainAliasName: 'domainAliasName',
});

/*
Retrieves a domain alias of the customer.
*/
await gapi.client.directory.domainAliases.get({
  customer: 'customer',
  domainAliasName: 'domainAliasName',
});

/*
Inserts a domain alias of the customer.
*/
await gapi.client.directory.domainAliases.insert({customer: 'customer'});

/*
Lists the domain aliases of the customer.
*/
await gapi.client.directory.domainAliases.list({customer: 'customer'});

/*
Deletes a domain of the customer.
*/
await gapi.client.directory.domains.delete({
  customer: 'customer',
  domainName: 'domainName',
});

/*
Retrieves a domain of the customer.
*/
await gapi.client.directory.domains.get({
  customer: 'customer',
  domainName: 'domainName',
});

/*
Inserts a domain of the customer.
*/
await gapi.client.directory.domains.insert({customer: 'customer'});

/*
Lists the domains of the customer.
*/
await gapi.client.directory.domains.list({customer: 'customer'});

/*
Deletes a group.
*/
await gapi.client.directory.groups.delete({groupKey: 'groupKey'});

/*
Retrieves a group's properties.
*/
await gapi.client.directory.groups.get({groupKey: 'groupKey'});

/*
Creates a group.
*/
await gapi.client.directory.groups.insert({});

/*
Retrieves all groups of a domain or of a user given a userKey (paginated).
*/
await gapi.client.directory.groups.list({});

/*
Updates a group's properties. This method supports [patch semantics](/admin-sdk/directory/v1/guides/performance#patch).
*/
await gapi.client.directory.groups.patch({groupKey: 'groupKey'});

/*
Updates a group's properties.
*/
await gapi.client.directory.groups.update({groupKey: 'groupKey'});

/*
Removes a member from a group.
*/
await gapi.client.directory.members.delete({
  groupKey: 'groupKey',
  memberKey: 'memberKey',
});

/*
Retrieves a group member's properties.
*/
await gapi.client.directory.members.get({
  groupKey: 'groupKey',
  memberKey: 'memberKey',
});

/*
Checks whether the given user is a member of the group. Membership can be direct or nested, but if nested, the `memberKey` and `groupKey` must be entities in the same domain or an `Invalid input` error is returned. To check for nested memberships that include entities outside of the group's domain, use the [`checkTransitiveMembership()`](https://cloud.google.com/identity/docs/reference/rest/v1/groups.memberships/checkTransitiveMembership) method in the Cloud Identity Groups API.
*/
await gapi.client.directory.members.hasMember({
  groupKey: 'groupKey',
  memberKey: 'memberKey',
});

/*
Adds a user to the specified group.
*/
await gapi.client.directory.members.insert({groupKey: 'groupKey'});

/*
Retrieves a paginated list of all members in a group. This method times out after 60 minutes. For more information, see [Troubleshoot error codes](https://developers.google.com/admin-sdk/directory/v1/guides/troubleshoot-error-codes).
*/
await gapi.client.directory.members.list({groupKey: 'groupKey'});

/*
Updates the membership properties of a user in the specified group. This method supports [patch semantics](/admin-sdk/directory/v1/guides/performance#patch).
*/
await gapi.client.directory.members.patch({
  groupKey: 'groupKey',
  memberKey: 'memberKey',
});

/*
Updates the membership of a user in the specified group.
*/
await gapi.client.directory.members.update({
  groupKey: 'groupKey',
  memberKey: 'memberKey',
});

/*
Takes an action that affects a mobile device. For example, remotely wiping a device.
*/
await gapi.client.directory.mobiledevices.action({
  customerId: 'customerId',
  resourceId: 'resourceId',
});

/*
Removes a mobile device.
*/
await gapi.client.directory.mobiledevices.delete({
  customerId: 'customerId',
  resourceId: 'resourceId',
});

/*
Retrieves a mobile device's properties.
*/
await gapi.client.directory.mobiledevices.get({
  customerId: 'customerId',
  resourceId: 'resourceId',
});

/*
Retrieves a paginated list of all user-owned mobile devices for an account. To retrieve a list that includes company-owned devices, use the Cloud Identity [Devices API](https://cloud.google.com/identity/docs/concepts/overview-devices) instead. This method times out after 60 minutes. For more information, see [Troubleshoot error codes](https://developers.google.com/admin-sdk/directory/v1/guides/troubleshoot-error-codes).
*/
await gapi.client.directory.mobiledevices.list({customerId: 'customerId'});

/*
Removes an organizational unit.
*/
await gapi.client.directory.orgunits.delete({
  customerId: 'customerId',
  orgUnitPath: 'orgUnitPath',
});

/*
Retrieves an organizational unit.
*/
await gapi.client.directory.orgunits.get({
  customerId: 'customerId',
  orgUnitPath: 'orgUnitPath',
});

/*
Adds an organizational unit.
*/
await gapi.client.directory.orgunits.insert({customerId: 'customerId'});

/*
Retrieves a list of all organizational units for an account.
*/
await gapi.client.directory.orgunits.list({customerId: 'customerId'});

/*
Updates an organizational unit. This method supports [patch semantics](/admin-sdk/directory/v1/guides/performance#patch)
*/
await gapi.client.directory.orgunits.patch({
  customerId: 'customerId',
  orgUnitPath: 'orgUnitPath',
});

/*
Updates an organizational unit.
*/
await gapi.client.directory.orgunits.update({
  customerId: 'customerId',
  orgUnitPath: 'orgUnitPath',
});

/*
Retrieves a paginated list of all privileges for a customer.
*/
await gapi.client.directory.privileges.list({customer: 'customer'});

/*
Deletes a role assignment.
*/
await gapi.client.directory.roleAssignments.delete({
  customer: 'customer',
  roleAssignmentId: 'roleAssignmentId',
});

/*
Retrieves a role assignment.
*/
await gapi.client.directory.roleAssignments.get({
  customer: 'customer',
  roleAssignmentId: 'roleAssignmentId',
});

/*
Creates a role assignment.
*/
await gapi.client.directory.roleAssignments.insert({customer: 'customer'});

/*
Retrieves a paginated list of all roleAssignments.
*/
await gapi.client.directory.roleAssignments.list({customer: 'customer'});

/*
Deletes a role.
*/
await gapi.client.directory.roles.delete({
  customer: 'customer',
  roleId: 'roleId',
});

/*
Retrieves a role.
*/
await gapi.client.directory.roles.get({customer: 'customer', roleId: 'roleId'});

/*
Creates a role.
*/
await gapi.client.directory.roles.insert({customer: 'customer'});

/*
Retrieves a paginated list of all the roles in a domain.
*/
await gapi.client.directory.roles.list({customer: 'customer'});

/*
Patches a role.
*/
await gapi.client.directory.roles.patch({
  customer: 'customer',
  roleId: 'roleId',
});

/*
Updates a role.
*/
await gapi.client.directory.roles.update({
  customer: 'customer',
  roleId: 'roleId',
});

/*
Deletes a schema.
*/
await gapi.client.directory.schemas.delete({
  customerId: 'customerId',
  schemaKey: 'schemaKey',
});

/*
Retrieves a schema.
*/
await gapi.client.directory.schemas.get({
  customerId: 'customerId',
  schemaKey: 'schemaKey',
});

/*
Creates a schema.
*/
await gapi.client.directory.schemas.insert({customerId: 'customerId'});

/*
Retrieves all schemas for a customer.
*/
await gapi.client.directory.schemas.list({customerId: 'customerId'});

/*
Patches a schema.
*/
await gapi.client.directory.schemas.patch({
  customerId: 'customerId',
  schemaKey: 'schemaKey',
});

/*
Updates a schema.
*/
await gapi.client.directory.schemas.update({
  customerId: 'customerId',
  schemaKey: 'schemaKey',
});

/*
Deletes all access tokens issued by a user for an application.
*/
await gapi.client.directory.tokens.delete({
  clientId: 'clientId',
  userKey: 'userKey',
});

/*
Gets information about an access token issued by a user.
*/
await gapi.client.directory.tokens.get({
  clientId: 'clientId',
  userKey: 'userKey',
});

/*
Returns the set of tokens specified user has issued to 3rd party applications.
*/
await gapi.client.directory.tokens.list({userKey: 'userKey'});

/*
Turns off 2-Step Verification for user.
*/
await gapi.client.directory.twoStepVerification.turnOff({userKey: 'userKey'});

/*
Deletes a user.
*/
await gapi.client.directory.users.delete({userKey: 'userKey'});

/*
Retrieves a user.
*/
await gapi.client.directory.users.get({userKey: 'userKey'});

/*
Creates a user. Mutate calls immediately following user creation might sometimes fail as the user isn't fully created due to propagation delay in our backends. Check the error details for the "User creation is not complete" message to see if this is the case. Retrying the calls after some time can help in this case.
*/
await gapi.client.directory.users.insert({});

/*
Retrieves a paginated list of either deleted users or all users in a domain.
*/
await gapi.client.directory.users.list({});

/*
Makes a user a super administrator.
*/
await gapi.client.directory.users.makeAdmin({userKey: 'userKey'});

/*
Updates a user using patch semantics. The update method should be used instead, because it also supports patch semantics and has better performance. If you're mapping an external identity to a Google identity, use the [`update`](https://developers.google.com/admin-sdk/directory/v1/reference/users/update) method instead of the `patch` method. This method is unable to clear fields that contain repeated objects (`addresses`, `phones`, etc). Use the update method instead.
*/
await gapi.client.directory.users.patch({userKey: 'userKey'});

/*
Signs a user out of all web and device sessions and reset their sign-in cookies. User will have to sign in by authenticating again.
*/
await gapi.client.directory.users.signOut({userKey: 'userKey'});

/*
Undeletes a deleted user.
*/
await gapi.client.directory.users.undelete({userKey: 'userKey'});

/*
Updates a user. This method supports patch semantics, meaning that you only need to include the fields you wish to update. Fields that are not present in the request will be preserved, and fields set to `null` will be cleared. For repeating fields that contain arrays, individual items in the array can't be patched piecemeal; they must be supplied in the request body with the desired values for all items. See the [user accounts guide](https://developers.google.com/admin-sdk/directory/v1/guides/manage-users#update_user) for more information.
*/
await gapi.client.directory.users.update({userKey: 'userKey'});

/*
Watches for changes in users list.
*/
await gapi.client.directory.users.watch({});

/*
Generates new backup verification codes for the user.
*/
await gapi.client.directory.verificationCodes.generate({userKey: 'userKey'});

/*
Invalidates the current backup verification codes for the user.
*/
await gapi.client.directory.verificationCodes.invalidate({userKey: 'userKey'});

/*
Returns the current set of valid backup verification codes for the specified user.
*/
await gapi.client.directory.verificationCodes.list({userKey: 'userKey'});
```
