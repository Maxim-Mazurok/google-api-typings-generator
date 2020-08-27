# TypeScript typings for Compute Engine API v1

Creates and runs virtual machines on Google Cloud Platform.
For detailed description please check [documentation](https://developers.google.com/compute/docs/reference/latest/).

## Installing

Install typings for Compute Engine API:

```
npm install @types/gapi.client.compute@v1 --save-dev
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
gapi.client.load('compute', 'v1', () => {
  // now we can use gapi.client.compute
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

      // View and manage your Google Compute Engine resources
      'https://www.googleapis.com/auth/compute',

      // View your Google Compute Engine resources
      'https://www.googleapis.com/auth/compute.readonly',

      // Manage your data and permissions in Google Cloud Storage
      'https://www.googleapis.com/auth/devstorage.full_control',

      // View your data in Google Cloud Storage
      'https://www.googleapis.com/auth/devstorage.read_only',

      // Manage your data in Google Cloud Storage
      'https://www.googleapis.com/auth/devstorage.read_write',
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

After that you can use Compute Engine API resources:

```typescript

/*
Retrieves an aggregated list of accelerator types.
*/
await gapi.client.compute.acceleratorTypes.aggregatedList({ project: "project",  });

/*
Returns the specified accelerator type.
*/
await gapi.client.compute.acceleratorTypes.get({ acceleratorType: "acceleratorType", project: "project", zone: "zone",  });

/*
Retrieves a list of accelerator types that are available to the specified project.
*/
await gapi.client.compute.acceleratorTypes.list({ project: "project", zone: "zone",  });

/*
Retrieves an aggregated list of addresses.
*/
await gapi.client.compute.addresses.aggregatedList({ project: "project",  });

/*
Deletes the specified address resource.
*/
await gapi.client.compute.addresses.delete({ address: "address", project: "project", region: "region",  });

/*
Returns the specified address resource.
*/
await gapi.client.compute.addresses.get({ address: "address", project: "project", region: "region",  });

/*
Creates an address resource in the specified project by using the data included in the request.
*/
await gapi.client.compute.addresses.insert({ project: "project", region: "region",  });

/*
Retrieves a list of addresses contained within the specified region.
*/
await gapi.client.compute.addresses.list({ project: "project", region: "region",  });

/*
Retrieves an aggregated list of autoscalers.
*/
await gapi.client.compute.autoscalers.aggregatedList({ project: "project",  });

/*
Deletes the specified autoscaler.
*/
await gapi.client.compute.autoscalers.delete({ autoscaler: "autoscaler", project: "project", zone: "zone",  });

/*
Returns the specified autoscaler resource. Gets a list of available autoscalers by making a list() request.
*/
await gapi.client.compute.autoscalers.get({ autoscaler: "autoscaler", project: "project", zone: "zone",  });

/*
Creates an autoscaler in the specified project using the data included in the request.
*/
await gapi.client.compute.autoscalers.insert({ project: "project", zone: "zone",  });

/*
Retrieves a list of autoscalers contained within the specified zone.
*/
await gapi.client.compute.autoscalers.list({ project: "project", zone: "zone",  });

/*
Updates an autoscaler in the specified project using the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.autoscalers.patch({ project: "project", zone: "zone",  });

/*
Updates an autoscaler in the specified project using the data included in the request.
*/
await gapi.client.compute.autoscalers.update({ project: "project", zone: "zone",  });

/*
Adds a key for validating requests with signed URLs for this backend bucket.
*/
await gapi.client.compute.backendBuckets.addSignedUrlKey({ backendBucket: "backendBucket", project: "project",  });

/*
Deletes the specified BackendBucket resource.
*/
await gapi.client.compute.backendBuckets.delete({ backendBucket: "backendBucket", project: "project",  });

/*
Deletes a key for validating requests with signed URLs for this backend bucket.
*/
await gapi.client.compute.backendBuckets.deleteSignedUrlKey({ backendBucket: "backendBucket", keyName: "keyName", project: "project",  });

/*
Returns the specified BackendBucket resource. Gets a list of available backend buckets by making a list() request.
*/
await gapi.client.compute.backendBuckets.get({ backendBucket: "backendBucket", project: "project",  });

/*
Creates a BackendBucket resource in the specified project using the data included in the request.
*/
await gapi.client.compute.backendBuckets.insert({ project: "project",  });

/*
Retrieves the list of BackendBucket resources available to the specified project.
*/
await gapi.client.compute.backendBuckets.list({ project: "project",  });

/*
Updates the specified BackendBucket resource with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.backendBuckets.patch({ backendBucket: "backendBucket", project: "project",  });

/*
Updates the specified BackendBucket resource with the data included in the request.
*/
await gapi.client.compute.backendBuckets.update({ backendBucket: "backendBucket", project: "project",  });

/*
Adds a key for validating requests with signed URLs for this backend service.
*/
await gapi.client.compute.backendServices.addSignedUrlKey({ backendService: "backendService", project: "project",  });

/*
Retrieves the list of all BackendService resources, regional and global, available to the specified project.
*/
await gapi.client.compute.backendServices.aggregatedList({ project: "project",  });

/*
Deletes the specified BackendService resource.
*/
await gapi.client.compute.backendServices.delete({ backendService: "backendService", project: "project",  });

/*
Deletes a key for validating requests with signed URLs for this backend service.
*/
await gapi.client.compute.backendServices.deleteSignedUrlKey({ backendService: "backendService", keyName: "keyName", project: "project",  });

/*
Returns the specified BackendService resource. Gets a list of available backend services.
*/
await gapi.client.compute.backendServices.get({ backendService: "backendService", project: "project",  });

/*
Gets the most recent health check results for this BackendService.

Example request body:

{ "group": "/zones/us-east1-b/instanceGroups/lb-backend-example" }
*/
await gapi.client.compute.backendServices.getHealth({ backendService: "backendService", project: "project",  });

/*
Creates a BackendService resource in the specified project using the data included in the request. For more information, see  Backend services overview.
*/
await gapi.client.compute.backendServices.insert({ project: "project",  });

/*
Retrieves the list of BackendService resources available to the specified project.
*/
await gapi.client.compute.backendServices.list({ project: "project",  });

/*
Patches the specified BackendService resource with the data included in the request. For more information, see  Backend services overview. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.backendServices.patch({ backendService: "backendService", project: "project",  });

/*
Sets the security policy for the specified backend service.
*/
await gapi.client.compute.backendServices.setSecurityPolicy({ backendService: "backendService", project: "project",  });

/*
Updates the specified BackendService resource with the data included in the request. For more information, see Backend services overview.
*/
await gapi.client.compute.backendServices.update({ backendService: "backendService", project: "project",  });

/*
Adds existing resource policies to a disk. You can only add one policy which will be applied to this disk for scheduling snapshot creation.
*/
await gapi.client.compute.disks.addResourcePolicies({ disk: "disk", project: "project", zone: "zone",  });

/*
Retrieves an aggregated list of persistent disks.
*/
await gapi.client.compute.disks.aggregatedList({ project: "project",  });

/*
Creates a snapshot of a specified persistent disk.
*/
await gapi.client.compute.disks.createSnapshot({ disk: "disk", project: "project", zone: "zone",  });

/*
Deletes the specified persistent disk. Deleting a disk removes its data permanently and is irreversible. However, deleting a disk does not delete any snapshots previously made from the disk. You must separately delete snapshots.
*/
await gapi.client.compute.disks.delete({ disk: "disk", project: "project", zone: "zone",  });

/*
Returns a specified persistent disk. Gets a list of available persistent disks by making a list() request.
*/
await gapi.client.compute.disks.get({ disk: "disk", project: "project", zone: "zone",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.disks.getIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Creates a persistent disk in the specified project using the data in the request. You can create a disk from a source (sourceImage, sourceSnapshot, or sourceDisk) or create an empty 500 GB data disk by omitting all properties. You can also create a disk that is larger than the default size by specifying the sizeGb property.
*/
await gapi.client.compute.disks.insert({ project: "project", zone: "zone",  });

/*
Retrieves a list of persistent disks contained within the specified zone.
*/
await gapi.client.compute.disks.list({ project: "project", zone: "zone",  });

/*
Removes resource policies from a disk.
*/
await gapi.client.compute.disks.removeResourcePolicies({ disk: "disk", project: "project", zone: "zone",  });

/*
Resizes the specified persistent disk. You can only increase the size of the disk.
*/
await gapi.client.compute.disks.resize({ disk: "disk", project: "project", zone: "zone",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.disks.setIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Sets the labels on a disk. To learn more about labels, read the Labeling Resources documentation.
*/
await gapi.client.compute.disks.setLabels({ project: "project", resource: "resource", zone: "zone",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.disks.testIamPermissions({ project: "project", resource: "resource", zone: "zone",  });

/*
Retrieves an aggregated list of disk types.
*/
await gapi.client.compute.diskTypes.aggregatedList({ project: "project",  });

/*
Returns the specified disk type. Gets a list of available disk types by making a list() request.
*/
await gapi.client.compute.diskTypes.get({ diskType: "diskType", project: "project", zone: "zone",  });

/*
Retrieves a list of disk types available to the specified project.
*/
await gapi.client.compute.diskTypes.list({ project: "project", zone: "zone",  });

/*
Deletes the specified externalVpnGateway.
*/
await gapi.client.compute.externalVpnGateways.delete({ externalVpnGateway: "externalVpnGateway", project: "project",  });

/*
Returns the specified externalVpnGateway. Get a list of available externalVpnGateways by making a list() request.
*/
await gapi.client.compute.externalVpnGateways.get({ externalVpnGateway: "externalVpnGateway", project: "project",  });

/*
Creates a ExternalVpnGateway in the specified project using the data included in the request.
*/
await gapi.client.compute.externalVpnGateways.insert({ project: "project",  });

/*
Retrieves the list of ExternalVpnGateway available to the specified project.
*/
await gapi.client.compute.externalVpnGateways.list({ project: "project",  });

/*
Sets the labels on an ExternalVpnGateway. To learn more about labels, read the Labeling Resources documentation.
*/
await gapi.client.compute.externalVpnGateways.setLabels({ project: "project", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.externalVpnGateways.testIamPermissions({ project: "project", resource: "resource",  });

/*
Deletes the specified firewall.
*/
await gapi.client.compute.firewalls.delete({ firewall: "firewall", project: "project",  });

/*
Returns the specified firewall.
*/
await gapi.client.compute.firewalls.get({ firewall: "firewall", project: "project",  });

/*
Creates a firewall rule in the specified project using the data included in the request.
*/
await gapi.client.compute.firewalls.insert({ project: "project",  });

/*
Retrieves the list of firewall rules available to the specified project.
*/
await gapi.client.compute.firewalls.list({ project: "project",  });

/*
Updates the specified firewall rule with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.firewalls.patch({ firewall: "firewall", project: "project",  });

/*
Updates the specified firewall rule with the data included in the request. Note that all fields will be updated if using PUT, even fields that are not specified. To update individual fields, please use PATCH instead.
*/
await gapi.client.compute.firewalls.update({ firewall: "firewall", project: "project",  });

/*
Retrieves an aggregated list of forwarding rules.
*/
await gapi.client.compute.forwardingRules.aggregatedList({ project: "project",  });

/*
Deletes the specified ForwardingRule resource.
*/
await gapi.client.compute.forwardingRules.delete({ forwardingRule: "forwardingRule", project: "project", region: "region",  });

/*
Returns the specified ForwardingRule resource.
*/
await gapi.client.compute.forwardingRules.get({ forwardingRule: "forwardingRule", project: "project", region: "region",  });

/*
Creates a ForwardingRule resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.forwardingRules.insert({ project: "project", region: "region",  });

/*
Retrieves a list of ForwardingRule resources available to the specified project and region.
*/
await gapi.client.compute.forwardingRules.list({ project: "project", region: "region",  });

/*
Updates the specified forwarding rule with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules. Currently, you can only patch the network_tier field.
*/
await gapi.client.compute.forwardingRules.patch({ forwardingRule: "forwardingRule", project: "project", region: "region",  });

/*
Changes target URL for forwarding rule. The new target should be of the same type as the old target.
*/
await gapi.client.compute.forwardingRules.setTarget({ forwardingRule: "forwardingRule", project: "project", region: "region",  });

/*
Deletes the specified address resource.
*/
await gapi.client.compute.globalAddresses.delete({ address: "address", project: "project",  });

/*
Returns the specified address resource. Gets a list of available addresses by making a list() request.
*/
await gapi.client.compute.globalAddresses.get({ address: "address", project: "project",  });

/*
Creates an address resource in the specified project by using the data included in the request.
*/
await gapi.client.compute.globalAddresses.insert({ project: "project",  });

/*
Retrieves a list of global addresses.
*/
await gapi.client.compute.globalAddresses.list({ project: "project",  });

/*
Deletes the specified GlobalForwardingRule resource.
*/
await gapi.client.compute.globalForwardingRules.delete({ forwardingRule: "forwardingRule", project: "project",  });

/*
Returns the specified GlobalForwardingRule resource. Gets a list of available forwarding rules by making a list() request.
*/
await gapi.client.compute.globalForwardingRules.get({ forwardingRule: "forwardingRule", project: "project",  });

/*
Creates a GlobalForwardingRule resource in the specified project using the data included in the request.
*/
await gapi.client.compute.globalForwardingRules.insert({ project: "project",  });

/*
Retrieves a list of GlobalForwardingRule resources available to the specified project.
*/
await gapi.client.compute.globalForwardingRules.list({ project: "project",  });

/*
Updates the specified forwarding rule with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules. Currently, you can only patch the network_tier field.
*/
await gapi.client.compute.globalForwardingRules.patch({ forwardingRule: "forwardingRule", project: "project",  });

/*
Changes target URL for the GlobalForwardingRule resource. The new target should be of the same type as the old target.
*/
await gapi.client.compute.globalForwardingRules.setTarget({ forwardingRule: "forwardingRule", project: "project",  });

/*
Attach a network endpoint to the specified network endpoint group.
*/
await gapi.client.compute.globalNetworkEndpointGroups.attachNetworkEndpoints({ networkEndpointGroup: "networkEndpointGroup", project: "project",  });

/*
Deletes the specified network endpoint group.Note that the NEG cannot be deleted if there are backend services referencing it.
*/
await gapi.client.compute.globalNetworkEndpointGroups.delete({ networkEndpointGroup: "networkEndpointGroup", project: "project",  });

/*
Detach the network endpoint from the specified network endpoint group.
*/
await gapi.client.compute.globalNetworkEndpointGroups.detachNetworkEndpoints({ networkEndpointGroup: "networkEndpointGroup", project: "project",  });

/*
Returns the specified network endpoint group. Gets a list of available network endpoint groups by making a list() request.
*/
await gapi.client.compute.globalNetworkEndpointGroups.get({ networkEndpointGroup: "networkEndpointGroup", project: "project",  });

/*
Creates a network endpoint group in the specified project using the parameters that are included in the request.
*/
await gapi.client.compute.globalNetworkEndpointGroups.insert({ project: "project",  });

/*
Retrieves the list of network endpoint groups that are located in the specified project.
*/
await gapi.client.compute.globalNetworkEndpointGroups.list({ project: "project",  });

/*
Lists the network endpoints in the specified network endpoint group.
*/
await gapi.client.compute.globalNetworkEndpointGroups.listNetworkEndpoints({ networkEndpointGroup: "networkEndpointGroup", project: "project",  });

/*
Retrieves an aggregated list of all operations.
*/
await gapi.client.compute.globalOperations.aggregatedList({ project: "project",  });

/*
Deletes the specified Operations resource.
*/
await gapi.client.compute.globalOperations.delete({ operation: "operation", project: "project",  });

/*
Retrieves the specified Operations resource. Gets a list of operations by making a `list()` request.
*/
await gapi.client.compute.globalOperations.get({ operation: "operation", project: "project",  });

/*
Retrieves a list of Operation resources contained within the specified project.
*/
await gapi.client.compute.globalOperations.list({ project: "project",  });

/*
Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method differs from the `GET` method in that it waits for no more than the default deadline (2 minutes) and then returns the current state of the operation, which might be `DONE` or still in progress.

This method is called on a best-effort basis. Specifically:  
- In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds. 
- If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
*/
await gapi.client.compute.globalOperations.wait({ operation: "operation", project: "project",  });

/*
Retrieves the list of all HealthCheck resources, regional and global, available to the specified project.
*/
await gapi.client.compute.healthChecks.aggregatedList({ project: "project",  });

/*
Deletes the specified HealthCheck resource.
*/
await gapi.client.compute.healthChecks.delete({ healthCheck: "healthCheck", project: "project",  });

/*
Returns the specified HealthCheck resource. Gets a list of available health checks by making a list() request.
*/
await gapi.client.compute.healthChecks.get({ healthCheck: "healthCheck", project: "project",  });

/*
Creates a HealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.healthChecks.insert({ project: "project",  });

/*
Retrieves the list of HealthCheck resources available to the specified project.
*/
await gapi.client.compute.healthChecks.list({ project: "project",  });

/*
Updates a HealthCheck resource in the specified project using the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.healthChecks.patch({ healthCheck: "healthCheck", project: "project",  });

/*
Updates a HealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.healthChecks.update({ healthCheck: "healthCheck", project: "project",  });

/*
Deletes the specified HttpHealthCheck resource.
*/
await gapi.client.compute.httpHealthChecks.delete({ httpHealthCheck: "httpHealthCheck", project: "project",  });

/*
Returns the specified HttpHealthCheck resource. Gets a list of available HTTP health checks by making a list() request.
*/
await gapi.client.compute.httpHealthChecks.get({ httpHealthCheck: "httpHealthCheck", project: "project",  });

/*
Creates a HttpHealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.httpHealthChecks.insert({ project: "project",  });

/*
Retrieves the list of HttpHealthCheck resources available to the specified project.
*/
await gapi.client.compute.httpHealthChecks.list({ project: "project",  });

/*
Updates a HttpHealthCheck resource in the specified project using the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.httpHealthChecks.patch({ httpHealthCheck: "httpHealthCheck", project: "project",  });

/*
Updates a HttpHealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.httpHealthChecks.update({ httpHealthCheck: "httpHealthCheck", project: "project",  });

/*
Deletes the specified HttpsHealthCheck resource.
*/
await gapi.client.compute.httpsHealthChecks.delete({ httpsHealthCheck: "httpsHealthCheck", project: "project",  });

/*
Returns the specified HttpsHealthCheck resource. Gets a list of available HTTPS health checks by making a list() request.
*/
await gapi.client.compute.httpsHealthChecks.get({ httpsHealthCheck: "httpsHealthCheck", project: "project",  });

/*
Creates a HttpsHealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.httpsHealthChecks.insert({ project: "project",  });

/*
Retrieves the list of HttpsHealthCheck resources available to the specified project.
*/
await gapi.client.compute.httpsHealthChecks.list({ project: "project",  });

/*
Updates a HttpsHealthCheck resource in the specified project using the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.httpsHealthChecks.patch({ httpsHealthCheck: "httpsHealthCheck", project: "project",  });

/*
Updates a HttpsHealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.httpsHealthChecks.update({ httpsHealthCheck: "httpsHealthCheck", project: "project",  });

/*
Deletes the specified image.
*/
await gapi.client.compute.images.delete({ image: "image", project: "project",  });

/*
Sets the deprecation status of an image.

If an empty request body is given, clears the deprecation status instead.
*/
await gapi.client.compute.images.deprecate({ image: "image", project: "project",  });

/*
Returns the specified image. Gets a list of available images by making a list() request.
*/
await gapi.client.compute.images.get({ image: "image", project: "project",  });

/*
Returns the latest image that is part of an image family and is not deprecated.
*/
await gapi.client.compute.images.getFromFamily({ family: "family", project: "project",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.images.getIamPolicy({ project: "project", resource: "resource",  });

/*
Creates an image in the specified project using the data included in the request.
*/
await gapi.client.compute.images.insert({ project: "project",  });

/*
Retrieves the list of custom images available to the specified project. Custom images are images you create that belong to your project. This method does not get any images that belong to other projects, including publicly-available images, like Debian 8. If you want to get a list of publicly-available images, use this method to make a request to the respective image project, such as debian-cloud or windows-cloud.
*/
await gapi.client.compute.images.list({ project: "project",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.images.setIamPolicy({ project: "project", resource: "resource",  });

/*
Sets the labels on an image. To learn more about labels, read the Labeling Resources documentation.
*/
await gapi.client.compute.images.setLabels({ project: "project", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.images.testIamPermissions({ project: "project", resource: "resource",  });

/*
Flags the specified instances to be removed from the managed instance group. Abandoning an instance does not delete the instance, but it does remove the instance from any target pools that are applied by the managed instance group. This method reduces the targetSize of the managed instance group by the number of instances that you abandon. This operation is marked as DONE when the action is scheduled even if the instances have not yet been removed from the group. You must separately verify the status of the abandoning action with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.

You can specify a maximum of 1000 instances with this method per request.
*/
await gapi.client.compute.instanceGroupManagers.abandonInstances({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Retrieves the list of managed instance groups and groups them by zone.
*/
await gapi.client.compute.instanceGroupManagers.aggregatedList({ project: "project",  });

/*
Applies changes to selected instances on the managed instance group. This method can be used to apply new overrides and/or new versions.
*/
await gapi.client.compute.instanceGroupManagers.applyUpdatesToInstances({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Creates instances with per-instance configs in this managed instance group. Instances are created using the current instance template. The create instances operation is marked DONE if the createInstances request is successful. The underlying actions take additional time. You must separately verify the status of the creating or actions with the listmanagedinstances method.
*/
await gapi.client.compute.instanceGroupManagers.createInstances({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Deletes the specified managed instance group and all of the instances in that group. Note that the instance group must not belong to a backend service. Read  Deleting an instance group for more information.
*/
await gapi.client.compute.instanceGroupManagers.delete({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Flags the specified instances in the managed instance group for immediate deletion. The instances are also removed from any target pools of which they were a member. This method reduces the targetSize of the managed instance group by the number of instances that you delete. This operation is marked as DONE when the action is scheduled even if the instances are still being deleted. You must separately verify the status of the deleting action with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.

You can specify a maximum of 1000 instances with this method per request.
*/
await gapi.client.compute.instanceGroupManagers.deleteInstances({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Deletes selected per-instance configs for the managed instance group.
*/
await gapi.client.compute.instanceGroupManagers.deletePerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Returns all of the details about the specified managed instance group. Gets a list of available managed instance groups by making a list() request.
*/
await gapi.client.compute.instanceGroupManagers.get({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Creates a managed instance group using the information that you specify in the request. After the group is created, instances in the group are created using the specified instance template. This operation is marked as DONE when the group is created even if the instances in the group have not yet been created. You must separately verify the status of the individual instances with the listmanagedinstances method.

A managed instance group can have up to 1000 VM instances per group. Please contact Cloud Support if you need an increase in this limit.
*/
await gapi.client.compute.instanceGroupManagers.insert({ project: "project", zone: "zone",  });

/*
Retrieves a list of managed instance groups that are contained within the specified project and zone.
*/
await gapi.client.compute.instanceGroupManagers.list({ project: "project", zone: "zone",  });

/*
Lists all errors thrown by actions on instances for a given managed instance group. The filter and orderBy query parameters are not supported.
*/
await gapi.client.compute.instanceGroupManagers.listErrors({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Lists all of the instances in the managed instance group. Each instance in the list has a currentAction, which indicates the action that the managed instance group is performing on the instance. For example, if the group is still creating an instance, the currentAction is CREATING. If a previous action failed, the list displays the errors for that failed action. The orderBy query parameter is not supported.
*/
await gapi.client.compute.instanceGroupManagers.listManagedInstances({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Lists all of the per-instance configs defined for the managed instance group. The orderBy query parameter is not supported.
*/
await gapi.client.compute.instanceGroupManagers.listPerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Updates a managed instance group using the information that you specify in the request. This operation is marked as DONE when the group is patched even if the instances in the group are still in the process of being patched. You must separately verify the status of the individual instances with the listManagedInstances method. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.instanceGroupManagers.patch({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Inserts or patches per-instance configs for the managed instance group. perInstanceConfig.name serves as a key used to distinguish whether to perform insert or patch.
*/
await gapi.client.compute.instanceGroupManagers.patchPerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Flags the specified instances in the managed instance group to be immediately recreated. The instances are deleted and recreated using the current instance template for the managed instance group. This operation is marked as DONE when the flag is set even if the instances have not yet been recreated. You must separately verify the status of the recreating action with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.

You can specify a maximum of 1000 instances with this method per request.
*/
await gapi.client.compute.instanceGroupManagers.recreateInstances({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Resizes the managed instance group. If you increase the size, the group creates new instances using the current instance template. If you decrease the size, the group deletes instances. The resize operation is marked DONE when the resize actions are scheduled even if the group has not yet added or deleted any instances. You must separately verify the status of the creating or deleting actions with the listmanagedinstances method.

When resizing down, the instance group arbitrarily chooses the order in which VMs are deleted. The group takes into account some VM attributes when making the selection including:

+ The status of the VM instance. + The health of the VM instance. + The instance template version the VM is based on. + For regional managed instance groups, the location of the VM instance.

This list is subject to change.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.
*/
await gapi.client.compute.instanceGroupManagers.resize({ instanceGroupManager: "instanceGroupManager", project: "project", size: 1, zone: "zone",  });

/*
Specifies the instance template to use when creating new instances in this group. The templates for existing instances in the group do not change unless you recreate them.
*/
await gapi.client.compute.instanceGroupManagers.setInstanceTemplate({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Modifies the target pools to which all instances in this managed instance group are assigned. The target pools automatically apply to all of the instances in the managed instance group. This operation is marked DONE when you make the request even if the instances have not yet been added to their target pools. The change might take some time to apply to all of the instances in the group depending on the size of the group.
*/
await gapi.client.compute.instanceGroupManagers.setTargetPools({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Inserts or updates per-instance configs for the managed instance group. perInstanceConfig.name serves as a key used to distinguish whether to perform insert or patch.
*/
await gapi.client.compute.instanceGroupManagers.updatePerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", zone: "zone",  });

/*
Adds a list of instances to the specified instance group. All of the instances in the instance group must be in the same network/subnetwork. Read  Adding instances for more information.
*/
await gapi.client.compute.instanceGroups.addInstances({ instanceGroup: "instanceGroup", project: "project", zone: "zone",  });

/*
Retrieves the list of instance groups and sorts them by zone.
*/
await gapi.client.compute.instanceGroups.aggregatedList({ project: "project",  });

/*
Deletes the specified instance group. The instances in the group are not deleted. Note that instance group must not belong to a backend service. Read  Deleting an instance group for more information.
*/
await gapi.client.compute.instanceGroups.delete({ instanceGroup: "instanceGroup", project: "project", zone: "zone",  });

/*
Returns the specified instance group. Gets a list of available instance groups by making a list() request.
*/
await gapi.client.compute.instanceGroups.get({ instanceGroup: "instanceGroup", project: "project", zone: "zone",  });

/*
Creates an instance group in the specified project using the parameters that are included in the request.
*/
await gapi.client.compute.instanceGroups.insert({ project: "project", zone: "zone",  });

/*
Retrieves the list of instance groups that are located in the specified project and zone.
*/
await gapi.client.compute.instanceGroups.list({ project: "project", zone: "zone",  });

/*
Lists the instances in the specified instance group. The orderBy query parameter is not supported.
*/
await gapi.client.compute.instanceGroups.listInstances({ instanceGroup: "instanceGroup", project: "project", zone: "zone",  });

/*
Removes one or more instances from the specified instance group, but does not delete those instances.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration before the VM instance is removed or deleted.
*/
await gapi.client.compute.instanceGroups.removeInstances({ instanceGroup: "instanceGroup", project: "project", zone: "zone",  });

/*
Sets the named ports for the specified instance group.
*/
await gapi.client.compute.instanceGroups.setNamedPorts({ instanceGroup: "instanceGroup", project: "project", zone: "zone",  });

/*
Adds an access config to an instance's network interface.
*/
await gapi.client.compute.instances.addAccessConfig({ instance: "instance", networkInterface: "networkInterface", project: "project", zone: "zone",  });

/*
Adds existing resource policies to an instance. You can only add one policy right now which will be applied to this instance for scheduling live migrations.
*/
await gapi.client.compute.instances.addResourcePolicies({ instance: "instance", project: "project", zone: "zone",  });

/*
Retrieves aggregated list of all of the instances in your project across all regions and zones.
*/
await gapi.client.compute.instances.aggregatedList({ project: "project",  });

/*
Attaches an existing Disk resource to an instance. You must first create the disk before you can attach it. It is not possible to create and attach a disk at the same time. For more information, read Adding a persistent disk to your instance.
*/
await gapi.client.compute.instances.attachDisk({ instance: "instance", project: "project", zone: "zone",  });

/*
Deletes the specified Instance resource. For more information, see Stopping or Deleting an Instance.
*/
await gapi.client.compute.instances.delete({ instance: "instance", project: "project", zone: "zone",  });

/*
Deletes an access config from an instance's network interface.
*/
await gapi.client.compute.instances.deleteAccessConfig({ accessConfig: "accessConfig", instance: "instance", networkInterface: "networkInterface", project: "project", zone: "zone",  });

/*
Detaches a disk from an instance.
*/
await gapi.client.compute.instances.detachDisk({ deviceName: "deviceName", instance: "instance", project: "project", zone: "zone",  });

/*
Returns the specified Instance resource. Gets a list of available instances by making a list() request.
*/
await gapi.client.compute.instances.get({ instance: "instance", project: "project", zone: "zone",  });

/*
Returns the specified guest attributes entry.
*/
await gapi.client.compute.instances.getGuestAttributes({ instance: "instance", project: "project", zone: "zone",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.instances.getIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Returns the last 1 MB of serial port output from the specified instance.
*/
await gapi.client.compute.instances.getSerialPortOutput({ instance: "instance", project: "project", zone: "zone",  });

/*
Returns the Shielded Instance Identity of an instance
*/
await gapi.client.compute.instances.getShieldedInstanceIdentity({ instance: "instance", project: "project", zone: "zone",  });

/*
Creates an instance resource in the specified project using the data included in the request.
*/
await gapi.client.compute.instances.insert({ project: "project", zone: "zone",  });

/*
Retrieves the list of instances contained within the specified zone.
*/
await gapi.client.compute.instances.list({ project: "project", zone: "zone",  });

/*
Retrieves a list of resources that refer to the VM instance specified in the request. For example, if the VM instance is part of a managed instance group, the referrers list includes the managed instance group. For more information, read Viewing Referrers to VM Instances.
*/
await gapi.client.compute.instances.listReferrers({ instance: "instance", project: "project", zone: "zone",  });

/*
Removes resource policies from an instance.
*/
await gapi.client.compute.instances.removeResourcePolicies({ instance: "instance", project: "project", zone: "zone",  });

/*
Performs a reset on the instance. This is a hard reset the VM does not do a graceful shutdown. For more information, see Resetting an instance.
*/
await gapi.client.compute.instances.reset({ instance: "instance", project: "project", zone: "zone",  });

/*
Sets deletion protection on the instance.
*/
await gapi.client.compute.instances.setDeletionProtection({ project: "project", resource: "resource", zone: "zone",  });

/*
Sets the auto-delete flag for a disk attached to an instance.
*/
await gapi.client.compute.instances.setDiskAutoDelete({ autoDelete: , deviceName: "deviceName", instance: "instance", project: "project", zone: "zone",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.instances.setIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Sets labels on an instance. To learn more about labels, read the Labeling Resources documentation.
*/
await gapi.client.compute.instances.setLabels({ instance: "instance", project: "project", zone: "zone",  });

/*
Changes the number and/or type of accelerator for a stopped instance to the values specified in the request.
*/
await gapi.client.compute.instances.setMachineResources({ instance: "instance", project: "project", zone: "zone",  });

/*
Changes the machine type for a stopped instance to the machine type specified in the request.
*/
await gapi.client.compute.instances.setMachineType({ instance: "instance", project: "project", zone: "zone",  });

/*
Sets metadata for the specified instance to the data included in the request.
*/
await gapi.client.compute.instances.setMetadata({ instance: "instance", project: "project", zone: "zone",  });

/*
Changes the minimum CPU platform that this instance should use. This method can only be called on a stopped instance. For more information, read Specifying a Minimum CPU Platform.
*/
await gapi.client.compute.instances.setMinCpuPlatform({ instance: "instance", project: "project", zone: "zone",  });

/*
Sets an instance's scheduling options. You can only call this method on a stopped instance, that is, a VM instance that is in a `TERMINATED` state. See Instance Life Cycle for more information on the possible instance states.
*/
await gapi.client.compute.instances.setScheduling({ instance: "instance", project: "project", zone: "zone",  });

/*
Sets the service account on the instance. For more information, read Changing the service account and access scopes for an instance.
*/
await gapi.client.compute.instances.setServiceAccount({ instance: "instance", project: "project", zone: "zone",  });

/*
Sets the Shielded Instance integrity policy for an instance. You can only use this method on a running instance. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.instances.setShieldedInstanceIntegrityPolicy({ instance: "instance", project: "project", zone: "zone",  });

/*
Sets network tags for the specified instance to the data included in the request.
*/
await gapi.client.compute.instances.setTags({ instance: "instance", project: "project", zone: "zone",  });

/*
Simulates a maintenance event on the instance.
*/
await gapi.client.compute.instances.simulateMaintenanceEvent({ instance: "instance", project: "project", zone: "zone",  });

/*
Starts an instance that was stopped using the instances().stop method. For more information, see Restart an instance.
*/
await gapi.client.compute.instances.start({ instance: "instance", project: "project", zone: "zone",  });

/*
Starts an instance that was stopped using the instances().stop method. For more information, see Restart an instance.
*/
await gapi.client.compute.instances.startWithEncryptionKey({ instance: "instance", project: "project", zone: "zone",  });

/*
Stops a running instance, shutting it down cleanly, and allows you to restart the instance at a later time. Stopped instances do not incur VM usage charges while they are stopped. However, resources that the VM is using, such as persistent disks and static IP addresses, will continue to be charged until they are deleted. For more information, see Stopping an instance.
*/
await gapi.client.compute.instances.stop({ instance: "instance", project: "project", zone: "zone",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.instances.testIamPermissions({ project: "project", resource: "resource", zone: "zone",  });

/*
Updates an instance only if the necessary resources are available. This method can update only a specific set of instance properties. See  Updating a running instance for a list of updatable instance properties.
*/
await gapi.client.compute.instances.update({ instance: "instance", project: "project", zone: "zone",  });

/*
Updates the specified access config from an instance's network interface with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.instances.updateAccessConfig({ instance: "instance", networkInterface: "networkInterface", project: "project", zone: "zone",  });

/*
Updates the Display config for a VM instance. You can only use this method on a stopped VM instance. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.instances.updateDisplayDevice({ instance: "instance", project: "project", zone: "zone",  });

/*
Updates an instance's network interface. This method follows PATCH semantics.
*/
await gapi.client.compute.instances.updateNetworkInterface({ instance: "instance", networkInterface: "networkInterface", project: "project", zone: "zone",  });

/*
Updates the Shielded Instance config for an instance. You can only use this method on a stopped instance. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.instances.updateShieldedInstanceConfig({ instance: "instance", project: "project", zone: "zone",  });

/*
Deletes the specified instance template. Deleting an instance template is permanent and cannot be undone. It is not possible to delete templates that are already in use by a managed instance group.
*/
await gapi.client.compute.instanceTemplates.delete({ instanceTemplate: "instanceTemplate", project: "project",  });

/*
Returns the specified instance template. Gets a list of available instance templates by making a list() request.
*/
await gapi.client.compute.instanceTemplates.get({ instanceTemplate: "instanceTemplate", project: "project",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.instanceTemplates.getIamPolicy({ project: "project", resource: "resource",  });

/*
Creates an instance template in the specified project using the data that is included in the request. If you are creating a new template to update an existing instance group, your new instance template must use the same network or, if applicable, the same subnetwork as the original template.
*/
await gapi.client.compute.instanceTemplates.insert({ project: "project",  });

/*
Retrieves a list of instance templates that are contained within the specified project.
*/
await gapi.client.compute.instanceTemplates.list({ project: "project",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.instanceTemplates.setIamPolicy({ project: "project", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.instanceTemplates.testIamPermissions({ project: "project", resource: "resource",  });

/*
Retrieves an aggregated list of interconnect attachments.
*/
await gapi.client.compute.interconnectAttachments.aggregatedList({ project: "project",  });

/*
Deletes the specified interconnect attachment.
*/
await gapi.client.compute.interconnectAttachments.delete({ interconnectAttachment: "interconnectAttachment", project: "project", region: "region",  });

/*
Returns the specified interconnect attachment.
*/
await gapi.client.compute.interconnectAttachments.get({ interconnectAttachment: "interconnectAttachment", project: "project", region: "region",  });

/*
Creates an InterconnectAttachment in the specified project using the data included in the request.
*/
await gapi.client.compute.interconnectAttachments.insert({ project: "project", region: "region",  });

/*
Retrieves the list of interconnect attachments contained within the specified region.
*/
await gapi.client.compute.interconnectAttachments.list({ project: "project", region: "region",  });

/*
Updates the specified interconnect attachment with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.interconnectAttachments.patch({ interconnectAttachment: "interconnectAttachment", project: "project", region: "region",  });

/*
Returns the details for the specified interconnect location. Gets a list of available interconnect locations by making a list() request.
*/
await gapi.client.compute.interconnectLocations.get({ interconnectLocation: "interconnectLocation", project: "project",  });

/*
Retrieves the list of interconnect locations available to the specified project.
*/
await gapi.client.compute.interconnectLocations.list({ project: "project",  });

/*
Deletes the specified interconnect.
*/
await gapi.client.compute.interconnects.delete({ interconnect: "interconnect", project: "project",  });

/*
Returns the specified interconnect. Get a list of available interconnects by making a list() request.
*/
await gapi.client.compute.interconnects.get({ interconnect: "interconnect", project: "project",  });

/*
Returns the interconnectDiagnostics for the specified interconnect.
*/
await gapi.client.compute.interconnects.getDiagnostics({ interconnect: "interconnect", project: "project",  });

/*
Creates a Interconnect in the specified project using the data included in the request.
*/
await gapi.client.compute.interconnects.insert({ project: "project",  });

/*
Retrieves the list of interconnect available to the specified project.
*/
await gapi.client.compute.interconnects.list({ project: "project",  });

/*
Updates the specified interconnect with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.interconnects.patch({ interconnect: "interconnect", project: "project",  });

/*
Return a specified license code. License codes are mirrored across all projects that have permissions to read the License Code.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenseCodes.get({ licenseCode: "licenseCode", project: "project",  });

/*
Returns permissions that a caller has on the specified resource.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenseCodes.testIamPermissions({ project: "project", resource: "resource",  });

/*
Deletes the specified license.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.delete({ license: "license", project: "project",  });

/*
Returns the specified License resource.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.get({ license: "license", project: "project",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.getIamPolicy({ project: "project", resource: "resource",  });

/*
Create a License resource in the specified project.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.insert({ project: "project",  });

/*
Retrieves the list of licenses available in the specified project. This method does not get any licenses that belong to other projects, including licenses attached to publicly-available images, like Debian 9. If you want to get a list of publicly-available licenses, use this method to make a request to the respective image project, such as debian-cloud or windows-cloud.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.list({ project: "project",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.setIamPolicy({ project: "project", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.  Caution This resource is intended for use only by third-party partners who are creating Cloud Marketplace images.
*/
await gapi.client.compute.licenses.testIamPermissions({ project: "project", resource: "resource",  });

/*
Retrieves an aggregated list of machine types.
*/
await gapi.client.compute.machineTypes.aggregatedList({ project: "project",  });

/*
Returns the specified machine type. Gets a list of available machine types by making a list() request.
*/
await gapi.client.compute.machineTypes.get({ machineType: "machineType", project: "project", zone: "zone",  });

/*
Retrieves a list of machine types available to the specified project.
*/
await gapi.client.compute.machineTypes.list({ project: "project", zone: "zone",  });

/*
Retrieves the list of network endpoint groups and sorts them by zone.
*/
await gapi.client.compute.networkEndpointGroups.aggregatedList({ project: "project",  });

/*
Attach a list of network endpoints to the specified network endpoint group.
*/
await gapi.client.compute.networkEndpointGroups.attachNetworkEndpoints({ networkEndpointGroup: "networkEndpointGroup", project: "project", zone: "zone",  });

/*
Deletes the specified network endpoint group. The network endpoints in the NEG and the VM instances they belong to are not terminated when the NEG is deleted. Note that the NEG cannot be deleted if there are backend services referencing it.
*/
await gapi.client.compute.networkEndpointGroups.delete({ networkEndpointGroup: "networkEndpointGroup", project: "project", zone: "zone",  });

/*
Detach a list of network endpoints from the specified network endpoint group.
*/
await gapi.client.compute.networkEndpointGroups.detachNetworkEndpoints({ networkEndpointGroup: "networkEndpointGroup", project: "project", zone: "zone",  });

/*
Returns the specified network endpoint group. Gets a list of available network endpoint groups by making a list() request.
*/
await gapi.client.compute.networkEndpointGroups.get({ networkEndpointGroup: "networkEndpointGroup", project: "project", zone: "zone",  });

/*
Creates a network endpoint group in the specified project using the parameters that are included in the request.
*/
await gapi.client.compute.networkEndpointGroups.insert({ project: "project", zone: "zone",  });

/*
Retrieves the list of network endpoint groups that are located in the specified project and zone.
*/
await gapi.client.compute.networkEndpointGroups.list({ project: "project", zone: "zone",  });

/*
Lists the network endpoints in the specified network endpoint group.
*/
await gapi.client.compute.networkEndpointGroups.listNetworkEndpoints({ networkEndpointGroup: "networkEndpointGroup", project: "project", zone: "zone",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.networkEndpointGroups.testIamPermissions({ project: "project", resource: "resource", zone: "zone",  });

/*
Adds a peering to the specified network.
*/
await gapi.client.compute.networks.addPeering({ network: "network", project: "project",  });

/*
Deletes the specified network.
*/
await gapi.client.compute.networks.delete({ network: "network", project: "project",  });

/*
Returns the specified network. Gets a list of available networks by making a list() request.
*/
await gapi.client.compute.networks.get({ network: "network", project: "project",  });

/*
Creates a network in the specified project using the data included in the request.
*/
await gapi.client.compute.networks.insert({ project: "project",  });

/*
Retrieves the list of networks available to the specified project.
*/
await gapi.client.compute.networks.list({ project: "project",  });

/*
Lists the peering routes exchanged over peering connection.
*/
await gapi.client.compute.networks.listPeeringRoutes({ network: "network", project: "project",  });

/*
Patches the specified network with the data included in the request. Only the following fields can be modified: routingConfig.routingMode.
*/
await gapi.client.compute.networks.patch({ network: "network", project: "project",  });

/*
Removes a peering from the specified network.
*/
await gapi.client.compute.networks.removePeering({ network: "network", project: "project",  });

/*
Switches the network mode from auto subnet mode to custom subnet mode.
*/
await gapi.client.compute.networks.switchToCustomMode({ network: "network", project: "project",  });

/*
Updates the specified network peering with the data included in the request Only the following fields can be modified: NetworkPeering.export_custom_routes, and NetworkPeering.import_custom_routes
*/
await gapi.client.compute.networks.updatePeering({ network: "network", project: "project",  });

/*
Adds specified number of nodes to the node group.
*/
await gapi.client.compute.nodeGroups.addNodes({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Retrieves an aggregated list of node groups. Note: use nodeGroups.listNodes for more details about each group.
*/
await gapi.client.compute.nodeGroups.aggregatedList({ project: "project",  });

/*
Deletes the specified NodeGroup resource.
*/
await gapi.client.compute.nodeGroups.delete({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Deletes specified nodes from the node group.
*/
await gapi.client.compute.nodeGroups.deleteNodes({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Returns the specified NodeGroup. Get a list of available NodeGroups by making a list() request. Note: the "nodes" field should not be used. Use nodeGroups.listNodes instead.
*/
await gapi.client.compute.nodeGroups.get({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.nodeGroups.getIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Creates a NodeGroup resource in the specified project using the data included in the request.
*/
await gapi.client.compute.nodeGroups.insert({ initialNodeCount: 1, project: "project", zone: "zone",  });

/*
Retrieves a list of node groups available to the specified project. Note: use nodeGroups.listNodes for more details about each group.
*/
await gapi.client.compute.nodeGroups.list({ project: "project", zone: "zone",  });

/*
Lists nodes in the node group.
*/
await gapi.client.compute.nodeGroups.listNodes({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Updates the specified node group.
*/
await gapi.client.compute.nodeGroups.patch({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.nodeGroups.setIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Updates the node template of the node group.
*/
await gapi.client.compute.nodeGroups.setNodeTemplate({ nodeGroup: "nodeGroup", project: "project", zone: "zone",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.nodeGroups.testIamPermissions({ project: "project", resource: "resource", zone: "zone",  });

/*
Retrieves an aggregated list of node templates.
*/
await gapi.client.compute.nodeTemplates.aggregatedList({ project: "project",  });

/*
Deletes the specified NodeTemplate resource.
*/
await gapi.client.compute.nodeTemplates.delete({ nodeTemplate: "nodeTemplate", project: "project", region: "region",  });

/*
Returns the specified node template. Gets a list of available node templates by making a list() request.
*/
await gapi.client.compute.nodeTemplates.get({ nodeTemplate: "nodeTemplate", project: "project", region: "region",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.nodeTemplates.getIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Creates a NodeTemplate resource in the specified project using the data included in the request.
*/
await gapi.client.compute.nodeTemplates.insert({ project: "project", region: "region",  });

/*
Retrieves a list of node templates available to the specified project.
*/
await gapi.client.compute.nodeTemplates.list({ project: "project", region: "region",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.nodeTemplates.setIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.nodeTemplates.testIamPermissions({ project: "project", region: "region", resource: "resource",  });

/*
Retrieves an aggregated list of node types.
*/
await gapi.client.compute.nodeTypes.aggregatedList({ project: "project",  });

/*
Returns the specified node type. Gets a list of available node types by making a list() request.
*/
await gapi.client.compute.nodeTypes.get({ nodeType: "nodeType", project: "project", zone: "zone",  });

/*
Retrieves a list of node types available to the specified project.
*/
await gapi.client.compute.nodeTypes.list({ project: "project", zone: "zone",  });

/*
Retrieves an aggregated list of packetMirrorings.
*/
await gapi.client.compute.packetMirrorings.aggregatedList({ project: "project",  });

/*
Deletes the specified PacketMirroring resource.
*/
await gapi.client.compute.packetMirrorings.delete({ packetMirroring: "packetMirroring", project: "project", region: "region",  });

/*
Returns the specified PacketMirroring resource.
*/
await gapi.client.compute.packetMirrorings.get({ packetMirroring: "packetMirroring", project: "project", region: "region",  });

/*
Creates a PacketMirroring resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.packetMirrorings.insert({ project: "project", region: "region",  });

/*
Retrieves a list of PacketMirroring resources available to the specified project and region.
*/
await gapi.client.compute.packetMirrorings.list({ project: "project", region: "region",  });

/*
Patches the specified PacketMirroring resource with the data included in the request. This method supports PATCH semantics and uses JSON merge patch format and processing rules.
*/
await gapi.client.compute.packetMirrorings.patch({ packetMirroring: "packetMirroring", project: "project", region: "region",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.packetMirrorings.testIamPermissions({ project: "project", region: "region", resource: "resource",  });

/*
Disable this project as a shared VPC host project.
*/
await gapi.client.compute.projects.disableXpnHost({ project: "project",  });

/*
Disable a service resource (also known as service project) associated with this host project.
*/
await gapi.client.compute.projects.disableXpnResource({ project: "project",  });

/*
Enable this project as a shared VPC host project.
*/
await gapi.client.compute.projects.enableXpnHost({ project: "project",  });

/*
Enable service resource (a.k.a service project) for a host project, so that subnets in the host project can be used by instances in the service project.
*/
await gapi.client.compute.projects.enableXpnResource({ project: "project",  });

/*
Returns the specified Project resource.
*/
await gapi.client.compute.projects.get({ project: "project",  });

/*
Gets the shared VPC host project that this project links to. May be empty if no link exists.
*/
await gapi.client.compute.projects.getXpnHost({ project: "project",  });

/*
Gets service resources (a.k.a service project) associated with this host project.
*/
await gapi.client.compute.projects.getXpnResources({ project: "project",  });

/*
Lists all shared VPC host projects visible to the user in an organization.
*/
await gapi.client.compute.projects.listXpnHosts({ project: "project",  });

/*
Moves a persistent disk from one zone to another.
*/
await gapi.client.compute.projects.moveDisk({ project: "project",  });

/*
Moves an instance and its attached persistent disks from one zone to another.
*/
await gapi.client.compute.projects.moveInstance({ project: "project",  });

/*
Sets metadata common to all instances within the specified project using the data included in the request.
*/
await gapi.client.compute.projects.setCommonInstanceMetadata({ project: "project",  });

/*
Sets the default network tier of the project. The default network tier is used when an address/forwardingRule/instance is created without specifying the network tier field.
*/
await gapi.client.compute.projects.setDefaultNetworkTier({ project: "project",  });

/*
Enables the usage export feature and sets the usage export bucket where reports are stored. If you provide an empty request body using this method, the usage export feature will be disabled.
*/
await gapi.client.compute.projects.setUsageExportBucket({ project: "project",  });

/*
Deletes the specified autoscaler.
*/
await gapi.client.compute.regionAutoscalers.delete({ autoscaler: "autoscaler", project: "project", region: "region",  });

/*
Returns the specified autoscaler.
*/
await gapi.client.compute.regionAutoscalers.get({ autoscaler: "autoscaler", project: "project", region: "region",  });

/*
Creates an autoscaler in the specified project using the data included in the request.
*/
await gapi.client.compute.regionAutoscalers.insert({ project: "project", region: "region",  });

/*
Retrieves a list of autoscalers contained within the specified region.
*/
await gapi.client.compute.regionAutoscalers.list({ project: "project", region: "region",  });

/*
Updates an autoscaler in the specified project using the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.regionAutoscalers.patch({ project: "project", region: "region",  });

/*
Updates an autoscaler in the specified project using the data included in the request.
*/
await gapi.client.compute.regionAutoscalers.update({ project: "project", region: "region",  });

/*
Deletes the specified regional BackendService resource.
*/
await gapi.client.compute.regionBackendServices.delete({ backendService: "backendService", project: "project", region: "region",  });

/*
Returns the specified regional BackendService resource.
*/
await gapi.client.compute.regionBackendServices.get({ backendService: "backendService", project: "project", region: "region",  });

/*
Gets the most recent health check results for this regional BackendService.
*/
await gapi.client.compute.regionBackendServices.getHealth({ backendService: "backendService", project: "project", region: "region",  });

/*
Creates a regional BackendService resource in the specified project using the data included in the request. For more information, see  Backend services overview.
*/
await gapi.client.compute.regionBackendServices.insert({ project: "project", region: "region",  });

/*
Retrieves the list of regional BackendService resources available to the specified project in the given region.
*/
await gapi.client.compute.regionBackendServices.list({ project: "project", region: "region",  });

/*
Updates the specified regional BackendService resource with the data included in the request. For more information, see  Understanding backend services This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.regionBackendServices.patch({ backendService: "backendService", project: "project", region: "region",  });

/*
Updates the specified regional BackendService resource with the data included in the request. For more information, see  Backend services overview.
*/
await gapi.client.compute.regionBackendServices.update({ backendService: "backendService", project: "project", region: "region",  });

/*
Retrieves an aggregated list of commitments.
*/
await gapi.client.compute.regionCommitments.aggregatedList({ project: "project",  });

/*
Returns the specified commitment resource. Gets a list of available commitments by making a list() request.
*/
await gapi.client.compute.regionCommitments.get({ commitment: "commitment", project: "project", region: "region",  });

/*
Creates a commitment in the specified project using the data included in the request.
*/
await gapi.client.compute.regionCommitments.insert({ project: "project", region: "region",  });

/*
Retrieves a list of commitments contained within the specified region.
*/
await gapi.client.compute.regionCommitments.list({ project: "project", region: "region",  });

/*
Adds existing resource policies to a regional disk. You can only add one policy which will be applied to this disk for scheduling snapshot creation.
*/
await gapi.client.compute.regionDisks.addResourcePolicies({ disk: "disk", project: "project", region: "region",  });

/*
Creates a snapshot of this regional disk.
*/
await gapi.client.compute.regionDisks.createSnapshot({ disk: "disk", project: "project", region: "region",  });

/*
Deletes the specified regional persistent disk. Deleting a regional disk removes all the replicas of its data permanently and is irreversible. However, deleting a disk does not delete any snapshots previously made from the disk. You must separately delete snapshots.
*/
await gapi.client.compute.regionDisks.delete({ disk: "disk", project: "project", region: "region",  });

/*
Returns a specified regional persistent disk.
*/
await gapi.client.compute.regionDisks.get({ disk: "disk", project: "project", region: "region",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.regionDisks.getIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Creates a persistent regional disk in the specified project using the data included in the request.
*/
await gapi.client.compute.regionDisks.insert({ project: "project", region: "region",  });

/*
Retrieves the list of persistent disks contained within the specified region.
*/
await gapi.client.compute.regionDisks.list({ project: "project", region: "region",  });

/*
Removes resource policies from a regional disk.
*/
await gapi.client.compute.regionDisks.removeResourcePolicies({ disk: "disk", project: "project", region: "region",  });

/*
Resizes the specified regional persistent disk.
*/
await gapi.client.compute.regionDisks.resize({ disk: "disk", project: "project", region: "region",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.regionDisks.setIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Sets the labels on the target regional disk.
*/
await gapi.client.compute.regionDisks.setLabels({ project: "project", region: "region", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.regionDisks.testIamPermissions({ project: "project", region: "region", resource: "resource",  });

/*
Returns the specified regional disk type. Gets a list of available disk types by making a list() request.
*/
await gapi.client.compute.regionDiskTypes.get({ diskType: "diskType", project: "project", region: "region",  });

/*
Retrieves a list of regional disk types available to the specified project.
*/
await gapi.client.compute.regionDiskTypes.list({ project: "project", region: "region",  });

/*
Deletes the specified HealthCheck resource.
*/
await gapi.client.compute.regionHealthChecks.delete({ healthCheck: "healthCheck", project: "project", region: "region",  });

/*
Returns the specified HealthCheck resource. Gets a list of available health checks by making a list() request.
*/
await gapi.client.compute.regionHealthChecks.get({ healthCheck: "healthCheck", project: "project", region: "region",  });

/*
Creates a HealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.regionHealthChecks.insert({ project: "project", region: "region",  });

/*
Retrieves the list of HealthCheck resources available to the specified project.
*/
await gapi.client.compute.regionHealthChecks.list({ project: "project", region: "region",  });

/*
Updates a HealthCheck resource in the specified project using the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.regionHealthChecks.patch({ healthCheck: "healthCheck", project: "project", region: "region",  });

/*
Updates a HealthCheck resource in the specified project using the data included in the request.
*/
await gapi.client.compute.regionHealthChecks.update({ healthCheck: "healthCheck", project: "project", region: "region",  });

/*
Deletes the specified regional HealthCheckService.
*/
await gapi.client.compute.regionHealthCheckServices.delete({ healthCheckService: "healthCheckService", project: "project", region: "region",  });

/*
Returns the specified regional HealthCheckService resource.
*/
await gapi.client.compute.regionHealthCheckServices.get({ healthCheckService: "healthCheckService", project: "project", region: "region",  });

/*
Creates a regional HealthCheckService resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.regionHealthCheckServices.insert({ project: "project", region: "region",  });

/*
Lists all the HealthCheckService resources that have been configured for the specified project in the given region.
*/
await gapi.client.compute.regionHealthCheckServices.list({ project: "project", region: "region",  });

/*
Updates the specified regional HealthCheckService resource with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.regionHealthCheckServices.patch({ healthCheckService: "healthCheckService", project: "project", region: "region",  });

/*
Flags the specified instances to be immediately removed from the managed instance group. Abandoning an instance does not delete the instance, but it does remove the instance from any target pools that are applied by the managed instance group. This method reduces the targetSize of the managed instance group by the number of instances that you abandon. This operation is marked as DONE when the action is scheduled even if the instances have not yet been removed from the group. You must separately verify the status of the abandoning action with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.

You can specify a maximum of 1000 instances with this method per request.
*/
await gapi.client.compute.regionInstanceGroupManagers.abandonInstances({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Apply updates to selected instances the managed instance group.
*/
await gapi.client.compute.regionInstanceGroupManagers.applyUpdatesToInstances({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Creates instances with per-instance configs in this regional managed instance group. Instances are created using the current instance template. The create instances operation is marked DONE if the createInstances request is successful. The underlying actions take additional time. You must separately verify the status of the creating or actions with the listmanagedinstances method.
*/
await gapi.client.compute.regionInstanceGroupManagers.createInstances({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Deletes the specified managed instance group and all of the instances in that group.
*/
await gapi.client.compute.regionInstanceGroupManagers.delete({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Flags the specified instances in the managed instance group to be immediately deleted. The instances are also removed from any target pools of which they were a member. This method reduces the targetSize of the managed instance group by the number of instances that you delete. The deleteInstances operation is marked DONE if the deleteInstances request is successful. The underlying actions take additional time. You must separately verify the status of the deleting action with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.

You can specify a maximum of 1000 instances with this method per request.
*/
await gapi.client.compute.regionInstanceGroupManagers.deleteInstances({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Deletes selected per-instance configs for the managed instance group.
*/
await gapi.client.compute.regionInstanceGroupManagers.deletePerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Returns all of the details about the specified managed instance group.
*/
await gapi.client.compute.regionInstanceGroupManagers.get({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Creates a managed instance group using the information that you specify in the request. After the group is created, instances in the group are created using the specified instance template. This operation is marked as DONE when the group is created even if the instances in the group have not yet been created. You must separately verify the status of the individual instances with the listmanagedinstances method.

A regional managed instance group can contain up to 2000 instances.
*/
await gapi.client.compute.regionInstanceGroupManagers.insert({ project: "project", region: "region",  });

/*
Retrieves the list of managed instance groups that are contained within the specified region.
*/
await gapi.client.compute.regionInstanceGroupManagers.list({ project: "project", region: "region",  });

/*
Lists all errors thrown by actions on instances for a given regional managed instance group. The filter and orderBy query parameters are not supported.
*/
await gapi.client.compute.regionInstanceGroupManagers.listErrors({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Lists the instances in the managed instance group and instances that are scheduled to be created. The list includes any current actions that the group has scheduled for its instances. The orderBy query parameter is not supported.
*/
await gapi.client.compute.regionInstanceGroupManagers.listManagedInstances({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Lists all of the per-instance configs defined for the managed instance group. The orderBy query parameter is not supported.
*/
await gapi.client.compute.regionInstanceGroupManagers.listPerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Updates a managed instance group using the information that you specify in the request. This operation is marked as DONE when the group is patched even if the instances in the group are still in the process of being patched. You must separately verify the status of the individual instances with the listmanagedinstances method. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.regionInstanceGroupManagers.patch({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Insert or patch (for the ones that already exist) per-instance configs for the managed instance group. perInstanceConfig.instance serves as a key used to distinguish whether to perform insert or patch.
*/
await gapi.client.compute.regionInstanceGroupManagers.patchPerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Flags the specified instances in the managed instance group to be immediately recreated. The instances are deleted and recreated using the current instance template for the managed instance group. This operation is marked as DONE when the flag is set even if the instances have not yet been recreated. You must separately verify the status of the recreating action with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.

You can specify a maximum of 1000 instances with this method per request.
*/
await gapi.client.compute.regionInstanceGroupManagers.recreateInstances({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Changes the intended size of the managed instance group. If you increase the size, the group creates new instances using the current instance template. If you decrease the size, the group deletes one or more instances.

The resize operation is marked DONE if the resize request is successful. The underlying actions take additional time. You must separately verify the status of the creating or deleting actions with the listmanagedinstances method.

If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.
*/
await gapi.client.compute.regionInstanceGroupManagers.resize({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region", size: 1,  });

/*
Sets the instance template to use when creating new instances or recreating instances in this group. Existing instances are not affected.
*/
await gapi.client.compute.regionInstanceGroupManagers.setInstanceTemplate({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Modifies the target pools to which all new instances in this group are assigned. Existing instances in the group are not affected.
*/
await gapi.client.compute.regionInstanceGroupManagers.setTargetPools({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Insert or update (for the ones that already exist) per-instance configs for the managed instance group. perInstanceConfig.instance serves as a key used to distinguish whether to perform insert or patch.
*/
await gapi.client.compute.regionInstanceGroupManagers.updatePerInstanceConfigs({ instanceGroupManager: "instanceGroupManager", project: "project", region: "region",  });

/*
Returns the specified instance group resource.
*/
await gapi.client.compute.regionInstanceGroups.get({ instanceGroup: "instanceGroup", project: "project", region: "region",  });

/*
Retrieves the list of instance group resources contained within the specified region.
*/
await gapi.client.compute.regionInstanceGroups.list({ project: "project", region: "region",  });

/*
Lists the instances in the specified instance group and displays information about the named ports. Depending on the specified options, this method can list all instances or only the instances that are running. The orderBy query parameter is not supported.
*/
await gapi.client.compute.regionInstanceGroups.listInstances({ instanceGroup: "instanceGroup", project: "project", region: "region",  });

/*
Sets the named ports for the specified regional instance group.
*/
await gapi.client.compute.regionInstanceGroups.setNamedPorts({ instanceGroup: "instanceGroup", project: "project", region: "region",  });

/*
Deletes the specified network endpoint group. Note that the NEG cannot be deleted if it is configured as a backend of a backend service.
*/
await gapi.client.compute.regionNetworkEndpointGroups.delete({ networkEndpointGroup: "networkEndpointGroup", project: "project", region: "region",  });

/*
Returns the specified network endpoint group. Gets a list of available network endpoint groups by making a list() request.
*/
await gapi.client.compute.regionNetworkEndpointGroups.get({ networkEndpointGroup: "networkEndpointGroup", project: "project", region: "region",  });

/*
Creates a network endpoint group in the specified project using the parameters that are included in the request.
*/
await gapi.client.compute.regionNetworkEndpointGroups.insert({ project: "project", region: "region",  });

/*
Retrieves the list of regional network endpoint groups available to the specified project in the given region.
*/
await gapi.client.compute.regionNetworkEndpointGroups.list({ project: "project", region: "region",  });

/*
Deletes the specified NotificationEndpoint in the given region
*/
await gapi.client.compute.regionNotificationEndpoints.delete({ notificationEndpoint: "notificationEndpoint", project: "project", region: "region",  });

/*
Returns the specified NotificationEndpoint resource in the given region.
*/
await gapi.client.compute.regionNotificationEndpoints.get({ notificationEndpoint: "notificationEndpoint", project: "project", region: "region",  });

/*
Create a NotificationEndpoint in the specified project in the given region using the parameters that are included in the request.
*/
await gapi.client.compute.regionNotificationEndpoints.insert({ project: "project", region: "region",  });

/*
Lists the NotificationEndpoints for a project in the given region.
*/
await gapi.client.compute.regionNotificationEndpoints.list({ project: "project", region: "region",  });

/*
Deletes the specified region-specific Operations resource.
*/
await gapi.client.compute.regionOperations.delete({ operation: "operation", project: "project", region: "region",  });

/*
Retrieves the specified region-specific Operations resource.
*/
await gapi.client.compute.regionOperations.get({ operation: "operation", project: "project", region: "region",  });

/*
Retrieves a list of Operation resources contained within the specified region.
*/
await gapi.client.compute.regionOperations.list({ project: "project", region: "region",  });

/*
Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method differs from the `GET` method in that it waits for no more than the default deadline (2 minutes) and then returns the current state of the operation, which might be `DONE` or still in progress.

This method is called on a best-effort basis. Specifically:  
- In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds. 
- If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
*/
await gapi.client.compute.regionOperations.wait({ operation: "operation", project: "project", region: "region",  });

/*
Returns the specified Region resource. Gets a list of available regions by making a list() request.
*/
await gapi.client.compute.regions.get({ project: "project", region: "region",  });

/*
Retrieves the list of region resources available to the specified project.
*/
await gapi.client.compute.regions.list({ project: "project",  });

/*
Deletes the specified SslCertificate resource in the region.
*/
await gapi.client.compute.regionSslCertificates.delete({ project: "project", region: "region", sslCertificate: "sslCertificate",  });

/*
Returns the specified SslCertificate resource in the specified region. Get a list of available SSL certificates by making a list() request.
*/
await gapi.client.compute.regionSslCertificates.get({ project: "project", region: "region", sslCertificate: "sslCertificate",  });

/*
Creates a SslCertificate resource in the specified project and region using the data included in the request
*/
await gapi.client.compute.regionSslCertificates.insert({ project: "project", region: "region",  });

/*
Retrieves the list of SslCertificate resources available to the specified project in the specified region.
*/
await gapi.client.compute.regionSslCertificates.list({ project: "project", region: "region",  });

/*
Deletes the specified TargetHttpProxy resource.
*/
await gapi.client.compute.regionTargetHttpProxies.delete({ project: "project", region: "region", targetHttpProxy: "targetHttpProxy",  });

/*
Returns the specified TargetHttpProxy resource in the specified region. Gets a list of available target HTTP proxies by making a list() request.
*/
await gapi.client.compute.regionTargetHttpProxies.get({ project: "project", region: "region", targetHttpProxy: "targetHttpProxy",  });

/*
Creates a TargetHttpProxy resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.regionTargetHttpProxies.insert({ project: "project", region: "region",  });

/*
Retrieves the list of TargetHttpProxy resources available to the specified project in the specified region.
*/
await gapi.client.compute.regionTargetHttpProxies.list({ project: "project", region: "region",  });

/*
Changes the URL map for TargetHttpProxy.
*/
await gapi.client.compute.regionTargetHttpProxies.setUrlMap({ project: "project", region: "region", targetHttpProxy: "targetHttpProxy",  });

/*
Deletes the specified TargetHttpsProxy resource.
*/
await gapi.client.compute.regionTargetHttpsProxies.delete({ project: "project", region: "region", targetHttpsProxy: "targetHttpsProxy",  });

/*
Returns the specified TargetHttpsProxy resource in the specified region. Gets a list of available target HTTP proxies by making a list() request.
*/
await gapi.client.compute.regionTargetHttpsProxies.get({ project: "project", region: "region", targetHttpsProxy: "targetHttpsProxy",  });

/*
Creates a TargetHttpsProxy resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.regionTargetHttpsProxies.insert({ project: "project", region: "region",  });

/*
Retrieves the list of TargetHttpsProxy resources available to the specified project in the specified region.
*/
await gapi.client.compute.regionTargetHttpsProxies.list({ project: "project", region: "region",  });

/*
Replaces SslCertificates for TargetHttpsProxy.
*/
await gapi.client.compute.regionTargetHttpsProxies.setSslCertificates({ project: "project", region: "region", targetHttpsProxy: "targetHttpsProxy",  });

/*
Changes the URL map for TargetHttpsProxy.
*/
await gapi.client.compute.regionTargetHttpsProxies.setUrlMap({ project: "project", region: "region", targetHttpsProxy: "targetHttpsProxy",  });

/*
Deletes the specified UrlMap resource.
*/
await gapi.client.compute.regionUrlMaps.delete({ project: "project", region: "region", urlMap: "urlMap",  });

/*
Returns the specified UrlMap resource. Gets a list of available URL maps by making a list() request.
*/
await gapi.client.compute.regionUrlMaps.get({ project: "project", region: "region", urlMap: "urlMap",  });

/*
Creates a UrlMap resource in the specified project using the data included in the request.
*/
await gapi.client.compute.regionUrlMaps.insert({ project: "project", region: "region",  });

/*
Retrieves the list of UrlMap resources available to the specified project in the specified region.
*/
await gapi.client.compute.regionUrlMaps.list({ project: "project", region: "region",  });

/*
Patches the specified UrlMap resource with the data included in the request. This method supports PATCH semantics and uses JSON merge patch format and processing rules.
*/
await gapi.client.compute.regionUrlMaps.patch({ project: "project", region: "region", urlMap: "urlMap",  });

/*
Updates the specified UrlMap resource with the data included in the request.
*/
await gapi.client.compute.regionUrlMaps.update({ project: "project", region: "region", urlMap: "urlMap",  });

/*
Runs static validation for the UrlMap. In particular, the tests of the provided UrlMap will be run. Calling this method does NOT create the UrlMap.
*/
await gapi.client.compute.regionUrlMaps.validate({ project: "project", region: "region", urlMap: "urlMap",  });

/*
Retrieves an aggregated list of reservations.
*/
await gapi.client.compute.reservations.aggregatedList({ project: "project",  });

/*
Deletes the specified reservation.
*/
await gapi.client.compute.reservations.delete({ project: "project", reservation: "reservation", zone: "zone",  });

/*
Retrieves information about the specified reservation.
*/
await gapi.client.compute.reservations.get({ project: "project", reservation: "reservation", zone: "zone",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.reservations.getIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Creates a new reservation. For more information, read Reserving zonal resources.
*/
await gapi.client.compute.reservations.insert({ project: "project", zone: "zone",  });

/*
A list of all the reservations that have been configured for the specified project in specified zone.
*/
await gapi.client.compute.reservations.list({ project: "project", zone: "zone",  });

/*
Resizes the reservation (applicable to standalone reservations only). For more information, read Modifying reservations.
*/
await gapi.client.compute.reservations.resize({ project: "project", reservation: "reservation", zone: "zone",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.reservations.setIamPolicy({ project: "project", resource: "resource", zone: "zone",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.reservations.testIamPermissions({ project: "project", resource: "resource", zone: "zone",  });

/*
Retrieves an aggregated list of resource policies.
*/
await gapi.client.compute.resourcePolicies.aggregatedList({ project: "project",  });

/*
Deletes the specified resource policy.
*/
await gapi.client.compute.resourcePolicies.delete({ project: "project", region: "region", resourcePolicy: "resourcePolicy",  });

/*
Retrieves all information of the specified resource policy.
*/
await gapi.client.compute.resourcePolicies.get({ project: "project", region: "region", resourcePolicy: "resourcePolicy",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.resourcePolicies.getIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Creates a new resource policy.
*/
await gapi.client.compute.resourcePolicies.insert({ project: "project", region: "region",  });

/*
A list all the resource policies that have been configured for the specified project in specified region.
*/
await gapi.client.compute.resourcePolicies.list({ project: "project", region: "region",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.resourcePolicies.setIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.resourcePolicies.testIamPermissions({ project: "project", region: "region", resource: "resource",  });

/*
Retrieves an aggregated list of routers.
*/
await gapi.client.compute.routers.aggregatedList({ project: "project",  });

/*
Deletes the specified Router resource.
*/
await gapi.client.compute.routers.delete({ project: "project", region: "region", router: "router",  });

/*
Returns the specified Router resource. Gets a list of available routers by making a list() request.
*/
await gapi.client.compute.routers.get({ project: "project", region: "region", router: "router",  });

/*
Retrieves runtime Nat mapping information of VM endpoints.
*/
await gapi.client.compute.routers.getNatMappingInfo({ project: "project", region: "region", router: "router",  });

/*
Retrieves runtime information of the specified router.
*/
await gapi.client.compute.routers.getRouterStatus({ project: "project", region: "region", router: "router",  });

/*
Creates a Router resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.routers.insert({ project: "project", region: "region",  });

/*
Retrieves a list of Router resources available to the specified project.
*/
await gapi.client.compute.routers.list({ project: "project", region: "region",  });

/*
Patches the specified Router resource with the data included in the request. This method supports PATCH semantics and uses JSON merge patch format and processing rules.
*/
await gapi.client.compute.routers.patch({ project: "project", region: "region", router: "router",  });

/*
Preview fields auto-generated during router create and update operations. Calling this method does NOT create or update the router.
*/
await gapi.client.compute.routers.preview({ project: "project", region: "region", router: "router",  });

/*
Updates the specified Router resource with the data included in the request. This method conforms to PUT semantics, which requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload.
*/
await gapi.client.compute.routers.update({ project: "project", region: "region", router: "router",  });

/*
Deletes the specified Route resource.
*/
await gapi.client.compute.routes.delete({ project: "project", route: "route",  });

/*
Returns the specified Route resource. Gets a list of available routes by making a list() request.
*/
await gapi.client.compute.routes.get({ project: "project", route: "route",  });

/*
Creates a Route resource in the specified project using the data included in the request.
*/
await gapi.client.compute.routes.insert({ project: "project",  });

/*
Retrieves the list of Route resources available to the specified project.
*/
await gapi.client.compute.routes.list({ project: "project",  });

/*
Inserts a rule into a security policy.
*/
await gapi.client.compute.securityPolicies.addRule({ project: "project", securityPolicy: "securityPolicy",  });

/*
Deletes the specified policy.
*/
await gapi.client.compute.securityPolicies.delete({ project: "project", securityPolicy: "securityPolicy",  });

/*
List all of the ordered rules present in a single specified policy.
*/
await gapi.client.compute.securityPolicies.get({ project: "project", securityPolicy: "securityPolicy",  });

/*
Gets a rule at the specified priority.
*/
await gapi.client.compute.securityPolicies.getRule({ project: "project", securityPolicy: "securityPolicy",  });

/*
Creates a new policy in the specified project using the data included in the request.
*/
await gapi.client.compute.securityPolicies.insert({ project: "project",  });

/*
List all the policies that have been configured for the specified project.
*/
await gapi.client.compute.securityPolicies.list({ project: "project",  });

/*
Gets the current list of preconfigured Web Application Firewall (WAF) expressions.
*/
await gapi.client.compute.securityPolicies.listPreconfiguredExpressionSets({ project: "project",  });

/*
Patches the specified policy with the data included in the request.
*/
await gapi.client.compute.securityPolicies.patch({ project: "project", securityPolicy: "securityPolicy",  });

/*
Patches a rule at the specified priority.
*/
await gapi.client.compute.securityPolicies.patchRule({ project: "project", securityPolicy: "securityPolicy",  });

/*
Deletes a rule at the specified priority.
*/
await gapi.client.compute.securityPolicies.removeRule({ project: "project", securityPolicy: "securityPolicy",  });

/*
Deletes the specified Snapshot resource. Keep in mind that deleting a single snapshot might not necessarily delete all the data on that snapshot. If any data on the snapshot that is marked for deletion is needed for subsequent snapshots, the data will be moved to the next corresponding snapshot.

For more information, see Deleting snapshots.
*/
await gapi.client.compute.snapshots.delete({ project: "project", snapshot: "snapshot",  });

/*
Returns the specified Snapshot resource. Gets a list of available snapshots by making a list() request.
*/
await gapi.client.compute.snapshots.get({ project: "project", snapshot: "snapshot",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.snapshots.getIamPolicy({ project: "project", resource: "resource",  });

/*
Retrieves the list of Snapshot resources contained within the specified project.
*/
await gapi.client.compute.snapshots.list({ project: "project",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.snapshots.setIamPolicy({ project: "project", resource: "resource",  });

/*
Sets the labels on a snapshot. To learn more about labels, read the Labeling Resources documentation.
*/
await gapi.client.compute.snapshots.setLabels({ project: "project", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.snapshots.testIamPermissions({ project: "project", resource: "resource",  });

/*
Retrieves the list of all SslCertificate resources, regional and global, available to the specified project.
*/
await gapi.client.compute.sslCertificates.aggregatedList({ project: "project",  });

/*
Deletes the specified SslCertificate resource.
*/
await gapi.client.compute.sslCertificates.delete({ project: "project", sslCertificate: "sslCertificate",  });

/*
Returns the specified SslCertificate resource. Gets a list of available SSL certificates by making a list() request.
*/
await gapi.client.compute.sslCertificates.get({ project: "project", sslCertificate: "sslCertificate",  });

/*
Creates a SslCertificate resource in the specified project using the data included in the request.
*/
await gapi.client.compute.sslCertificates.insert({ project: "project",  });

/*
Retrieves the list of SslCertificate resources available to the specified project.
*/
await gapi.client.compute.sslCertificates.list({ project: "project",  });

/*
Deletes the specified SSL policy. The SSL policy resource can be deleted only if it is not in use by any TargetHttpsProxy or TargetSslProxy resources.
*/
await gapi.client.compute.sslPolicies.delete({ project: "project", sslPolicy: "sslPolicy",  });

/*
Lists all of the ordered rules present in a single specified policy.
*/
await gapi.client.compute.sslPolicies.get({ project: "project", sslPolicy: "sslPolicy",  });

/*
Returns the specified SSL policy resource. Gets a list of available SSL policies by making a list() request.
*/
await gapi.client.compute.sslPolicies.insert({ project: "project",  });

/*
Lists all the SSL policies that have been configured for the specified project.
*/
await gapi.client.compute.sslPolicies.list({ project: "project",  });

/*
Lists all features that can be specified in the SSL policy when using custom profile.
*/
await gapi.client.compute.sslPolicies.listAvailableFeatures({ project: "project",  });

/*
Patches the specified SSL policy with the data included in the request.
*/
await gapi.client.compute.sslPolicies.patch({ project: "project", sslPolicy: "sslPolicy",  });

/*
Retrieves an aggregated list of subnetworks.
*/
await gapi.client.compute.subnetworks.aggregatedList({ project: "project",  });

/*
Deletes the specified subnetwork.
*/
await gapi.client.compute.subnetworks.delete({ project: "project", region: "region", subnetwork: "subnetwork",  });

/*
Expands the IP CIDR range of the subnetwork to a specified value.
*/
await gapi.client.compute.subnetworks.expandIpCidrRange({ project: "project", region: "region", subnetwork: "subnetwork",  });

/*
Returns the specified subnetwork. Gets a list of available subnetworks list() request.
*/
await gapi.client.compute.subnetworks.get({ project: "project", region: "region", subnetwork: "subnetwork",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.compute.subnetworks.getIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Creates a subnetwork in the specified project using the data included in the request.
*/
await gapi.client.compute.subnetworks.insert({ project: "project", region: "region",  });

/*
Retrieves a list of subnetworks available to the specified project.
*/
await gapi.client.compute.subnetworks.list({ project: "project", region: "region",  });

/*
Retrieves an aggregated list of all usable subnetworks in the project.
*/
await gapi.client.compute.subnetworks.listUsable({ project: "project",  });

/*
Patches the specified subnetwork with the data included in the request. Only certain fields can up updated with a patch request as indicated in the field descriptions. You must specify the current fingerprint of the subnetwork resource being patched.
*/
await gapi.client.compute.subnetworks.patch({ project: "project", region: "region", subnetwork: "subnetwork",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.compute.subnetworks.setIamPolicy({ project: "project", region: "region", resource: "resource",  });

/*
Set whether VMs in this subnet can access Google services without assigning external IP addresses through Private Google Access.
*/
await gapi.client.compute.subnetworks.setPrivateIpGoogleAccess({ project: "project", region: "region", subnetwork: "subnetwork",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.subnetworks.testIamPermissions({ project: "project", region: "region", resource: "resource",  });

/*
Deletes the specified TargetGrpcProxy in the given scope
*/
await gapi.client.compute.targetGrpcProxies.delete({ project: "project", targetGrpcProxy: "targetGrpcProxy",  });

/*
Returns the specified TargetGrpcProxy resource in the given scope.
*/
await gapi.client.compute.targetGrpcProxies.get({ project: "project", targetGrpcProxy: "targetGrpcProxy",  });

/*
Creates a TargetGrpcProxy in the specified project in the given scope using the parameters that are included in the request.
*/
await gapi.client.compute.targetGrpcProxies.insert({ project: "project",  });

/*
Lists the TargetGrpcProxies for a project in the given scope.
*/
await gapi.client.compute.targetGrpcProxies.list({ project: "project",  });

/*
Patches the specified TargetGrpcProxy resource with the data included in the request. This method supports PATCH semantics and uses JSON merge patch format and processing rules.
*/
await gapi.client.compute.targetGrpcProxies.patch({ project: "project", targetGrpcProxy: "targetGrpcProxy",  });

/*
Retrieves the list of all TargetHttpProxy resources, regional and global, available to the specified project.
*/
await gapi.client.compute.targetHttpProxies.aggregatedList({ project: "project",  });

/*
Deletes the specified TargetHttpProxy resource.
*/
await gapi.client.compute.targetHttpProxies.delete({ project: "project", targetHttpProxy: "targetHttpProxy",  });

/*
Returns the specified TargetHttpProxy resource. Gets a list of available target HTTP proxies by making a list() request.
*/
await gapi.client.compute.targetHttpProxies.get({ project: "project", targetHttpProxy: "targetHttpProxy",  });

/*
Creates a TargetHttpProxy resource in the specified project using the data included in the request.
*/
await gapi.client.compute.targetHttpProxies.insert({ project: "project",  });

/*
Retrieves the list of TargetHttpProxy resources available to the specified project.
*/
await gapi.client.compute.targetHttpProxies.list({ project: "project",  });

/*
Changes the URL map for TargetHttpProxy.
*/
await gapi.client.compute.targetHttpProxies.setUrlMap({ project: "project", targetHttpProxy: "targetHttpProxy",  });

/*
Retrieves the list of all TargetHttpsProxy resources, regional and global, available to the specified project.
*/
await gapi.client.compute.targetHttpsProxies.aggregatedList({ project: "project",  });

/*
Deletes the specified TargetHttpsProxy resource.
*/
await gapi.client.compute.targetHttpsProxies.delete({ project: "project", targetHttpsProxy: "targetHttpsProxy",  });

/*
Returns the specified TargetHttpsProxy resource. Gets a list of available target HTTPS proxies by making a list() request.
*/
await gapi.client.compute.targetHttpsProxies.get({ project: "project", targetHttpsProxy: "targetHttpsProxy",  });

/*
Creates a TargetHttpsProxy resource in the specified project using the data included in the request.
*/
await gapi.client.compute.targetHttpsProxies.insert({ project: "project",  });

/*
Retrieves the list of TargetHttpsProxy resources available to the specified project.
*/
await gapi.client.compute.targetHttpsProxies.list({ project: "project",  });

/*
Sets the QUIC override policy for TargetHttpsProxy.
*/
await gapi.client.compute.targetHttpsProxies.setQuicOverride({ project: "project", targetHttpsProxy: "targetHttpsProxy",  });

/*
Replaces SslCertificates for TargetHttpsProxy.
*/
await gapi.client.compute.targetHttpsProxies.setSslCertificates({ project: "project", targetHttpsProxy: "targetHttpsProxy",  });

/*
Sets the SSL policy for TargetHttpsProxy. The SSL policy specifies the server-side support for SSL features. This affects connections between clients and the HTTPS proxy load balancer. They do not affect the connection between the load balancer and the backends.
*/
await gapi.client.compute.targetHttpsProxies.setSslPolicy({ project: "project", targetHttpsProxy: "targetHttpsProxy",  });

/*
Changes the URL map for TargetHttpsProxy.
*/
await gapi.client.compute.targetHttpsProxies.setUrlMap({ project: "project", targetHttpsProxy: "targetHttpsProxy",  });

/*
Retrieves an aggregated list of target instances.
*/
await gapi.client.compute.targetInstances.aggregatedList({ project: "project",  });

/*
Deletes the specified TargetInstance resource.
*/
await gapi.client.compute.targetInstances.delete({ project: "project", targetInstance: "targetInstance", zone: "zone",  });

/*
Returns the specified TargetInstance resource. Gets a list of available target instances by making a list() request.
*/
await gapi.client.compute.targetInstances.get({ project: "project", targetInstance: "targetInstance", zone: "zone",  });

/*
Creates a TargetInstance resource in the specified project and zone using the data included in the request.
*/
await gapi.client.compute.targetInstances.insert({ project: "project", zone: "zone",  });

/*
Retrieves a list of TargetInstance resources available to the specified project and zone.
*/
await gapi.client.compute.targetInstances.list({ project: "project", zone: "zone",  });

/*
Adds health check URLs to a target pool.
*/
await gapi.client.compute.targetPools.addHealthCheck({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Adds an instance to a target pool.
*/
await gapi.client.compute.targetPools.addInstance({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Retrieves an aggregated list of target pools.
*/
await gapi.client.compute.targetPools.aggregatedList({ project: "project",  });

/*
Deletes the specified target pool.
*/
await gapi.client.compute.targetPools.delete({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Returns the specified target pool. Gets a list of available target pools by making a list() request.
*/
await gapi.client.compute.targetPools.get({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Gets the most recent health check results for each IP for the instance that is referenced by the given target pool.
*/
await gapi.client.compute.targetPools.getHealth({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Creates a target pool in the specified project and region using the data included in the request.
*/
await gapi.client.compute.targetPools.insert({ project: "project", region: "region",  });

/*
Retrieves a list of target pools available to the specified project and region.
*/
await gapi.client.compute.targetPools.list({ project: "project", region: "region",  });

/*
Removes health check URL from a target pool.
*/
await gapi.client.compute.targetPools.removeHealthCheck({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Removes instance URL from a target pool.
*/
await gapi.client.compute.targetPools.removeInstance({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Changes a backup target pool's configurations.
*/
await gapi.client.compute.targetPools.setBackup({ project: "project", region: "region", targetPool: "targetPool",  });

/*
Deletes the specified TargetSslProxy resource.
*/
await gapi.client.compute.targetSslProxies.delete({ project: "project", targetSslProxy: "targetSslProxy",  });

/*
Returns the specified TargetSslProxy resource. Gets a list of available target SSL proxies by making a list() request.
*/
await gapi.client.compute.targetSslProxies.get({ project: "project", targetSslProxy: "targetSslProxy",  });

/*
Creates a TargetSslProxy resource in the specified project using the data included in the request.
*/
await gapi.client.compute.targetSslProxies.insert({ project: "project",  });

/*
Retrieves the list of TargetSslProxy resources available to the specified project.
*/
await gapi.client.compute.targetSslProxies.list({ project: "project",  });

/*
Changes the BackendService for TargetSslProxy.
*/
await gapi.client.compute.targetSslProxies.setBackendService({ project: "project", targetSslProxy: "targetSslProxy",  });

/*
Changes the ProxyHeaderType for TargetSslProxy.
*/
await gapi.client.compute.targetSslProxies.setProxyHeader({ project: "project", targetSslProxy: "targetSslProxy",  });

/*
Changes SslCertificates for TargetSslProxy.
*/
await gapi.client.compute.targetSslProxies.setSslCertificates({ project: "project", targetSslProxy: "targetSslProxy",  });

/*
Sets the SSL policy for TargetSslProxy. The SSL policy specifies the server-side support for SSL features. This affects connections between clients and the SSL proxy load balancer. They do not affect the connection between the load balancer and the backends.
*/
await gapi.client.compute.targetSslProxies.setSslPolicy({ project: "project", targetSslProxy: "targetSslProxy",  });

/*
Deletes the specified TargetTcpProxy resource.
*/
await gapi.client.compute.targetTcpProxies.delete({ project: "project", targetTcpProxy: "targetTcpProxy",  });

/*
Returns the specified TargetTcpProxy resource. Gets a list of available target TCP proxies by making a list() request.
*/
await gapi.client.compute.targetTcpProxies.get({ project: "project", targetTcpProxy: "targetTcpProxy",  });

/*
Creates a TargetTcpProxy resource in the specified project using the data included in the request.
*/
await gapi.client.compute.targetTcpProxies.insert({ project: "project",  });

/*
Retrieves the list of TargetTcpProxy resources available to the specified project.
*/
await gapi.client.compute.targetTcpProxies.list({ project: "project",  });

/*
Changes the BackendService for TargetTcpProxy.
*/
await gapi.client.compute.targetTcpProxies.setBackendService({ project: "project", targetTcpProxy: "targetTcpProxy",  });

/*
Changes the ProxyHeaderType for TargetTcpProxy.
*/
await gapi.client.compute.targetTcpProxies.setProxyHeader({ project: "project", targetTcpProxy: "targetTcpProxy",  });

/*
Retrieves an aggregated list of target VPN gateways.
*/
await gapi.client.compute.targetVpnGateways.aggregatedList({ project: "project",  });

/*
Deletes the specified target VPN gateway.
*/
await gapi.client.compute.targetVpnGateways.delete({ project: "project", region: "region", targetVpnGateway: "targetVpnGateway",  });

/*
Returns the specified target VPN gateway. Gets a list of available target VPN gateways by making a list() request.
*/
await gapi.client.compute.targetVpnGateways.get({ project: "project", region: "region", targetVpnGateway: "targetVpnGateway",  });

/*
Creates a target VPN gateway in the specified project and region using the data included in the request.
*/
await gapi.client.compute.targetVpnGateways.insert({ project: "project", region: "region",  });

/*
Retrieves a list of target VPN gateways available to the specified project and region.
*/
await gapi.client.compute.targetVpnGateways.list({ project: "project", region: "region",  });

/*
Retrieves the list of all UrlMap resources, regional and global, available to the specified project.
*/
await gapi.client.compute.urlMaps.aggregatedList({ project: "project",  });

/*
Deletes the specified UrlMap resource.
*/
await gapi.client.compute.urlMaps.delete({ project: "project", urlMap: "urlMap",  });

/*
Returns the specified UrlMap resource. Gets a list of available URL maps by making a list() request.
*/
await gapi.client.compute.urlMaps.get({ project: "project", urlMap: "urlMap",  });

/*
Creates a UrlMap resource in the specified project using the data included in the request.
*/
await gapi.client.compute.urlMaps.insert({ project: "project",  });

/*
Initiates a cache invalidation operation, invalidating the specified path, scoped to the specified UrlMap.
*/
await gapi.client.compute.urlMaps.invalidateCache({ project: "project", urlMap: "urlMap",  });

/*
Retrieves the list of UrlMap resources available to the specified project.
*/
await gapi.client.compute.urlMaps.list({ project: "project",  });

/*
Patches the specified UrlMap resource with the data included in the request. This method supports PATCH semantics and uses the JSON merge patch format and processing rules.
*/
await gapi.client.compute.urlMaps.patch({ project: "project", urlMap: "urlMap",  });

/*
Updates the specified UrlMap resource with the data included in the request.
*/
await gapi.client.compute.urlMaps.update({ project: "project", urlMap: "urlMap",  });

/*
Runs static validation for the UrlMap. In particular, the tests of the provided UrlMap will be run. Calling this method does NOT create the UrlMap.
*/
await gapi.client.compute.urlMaps.validate({ project: "project", urlMap: "urlMap",  });

/*
Retrieves an aggregated list of VPN gateways.
*/
await gapi.client.compute.vpnGateways.aggregatedList({ project: "project",  });

/*
Deletes the specified VPN gateway.
*/
await gapi.client.compute.vpnGateways.delete({ project: "project", region: "region", vpnGateway: "vpnGateway",  });

/*
Returns the specified VPN gateway. Gets a list of available VPN gateways by making a list() request.
*/
await gapi.client.compute.vpnGateways.get({ project: "project", region: "region", vpnGateway: "vpnGateway",  });

/*
Returns the status for the specified VPN gateway.
*/
await gapi.client.compute.vpnGateways.getStatus({ project: "project", region: "region", vpnGateway: "vpnGateway",  });

/*
Creates a VPN gateway in the specified project and region using the data included in the request.
*/
await gapi.client.compute.vpnGateways.insert({ project: "project", region: "region",  });

/*
Retrieves a list of VPN gateways available to the specified project and region.
*/
await gapi.client.compute.vpnGateways.list({ project: "project", region: "region",  });

/*
Sets the labels on a VpnGateway. To learn more about labels, read the Labeling Resources documentation.
*/
await gapi.client.compute.vpnGateways.setLabels({ project: "project", region: "region", resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.compute.vpnGateways.testIamPermissions({ project: "project", region: "region", resource: "resource",  });

/*
Retrieves an aggregated list of VPN tunnels.
*/
await gapi.client.compute.vpnTunnels.aggregatedList({ project: "project",  });

/*
Deletes the specified VpnTunnel resource.
*/
await gapi.client.compute.vpnTunnels.delete({ project: "project", region: "region", vpnTunnel: "vpnTunnel",  });

/*
Returns the specified VpnTunnel resource. Gets a list of available VPN tunnels by making a list() request.
*/
await gapi.client.compute.vpnTunnels.get({ project: "project", region: "region", vpnTunnel: "vpnTunnel",  });

/*
Creates a VpnTunnel resource in the specified project and region using the data included in the request.
*/
await gapi.client.compute.vpnTunnels.insert({ project: "project", region: "region",  });

/*
Retrieves a list of VpnTunnel resources contained in the specified project and region.
*/
await gapi.client.compute.vpnTunnels.list({ project: "project", region: "region",  });

/*
Deletes the specified zone-specific Operations resource.
*/
await gapi.client.compute.zoneOperations.delete({ operation: "operation", project: "project", zone: "zone",  });

/*
Retrieves the specified zone-specific Operations resource.
*/
await gapi.client.compute.zoneOperations.get({ operation: "operation", project: "project", zone: "zone",  });

/*
Retrieves a list of Operation resources contained within the specified zone.
*/
await gapi.client.compute.zoneOperations.list({ project: "project", zone: "zone",  });

/*
Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method differs from the `GET` method in that it waits for no more than the default deadline (2 minutes) and then returns the current state of the operation, which might be `DONE` or still in progress.

This method is called on a best-effort basis. Specifically:  
- In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds. 
- If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
*/
await gapi.client.compute.zoneOperations.wait({ operation: "operation", project: "project", zone: "zone",  });

/*
Returns the specified Zone resource. Gets a list of available zones by making a list() request.
*/
await gapi.client.compute.zones.get({ project: "project", zone: "zone",  });

/*
Retrieves the list of Zone resources available to the specified project.
*/
await gapi.client.compute.zones.list({ project: "project",  });
```
