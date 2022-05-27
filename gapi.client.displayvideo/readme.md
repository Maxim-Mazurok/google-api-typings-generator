# TypeScript typings for Display & Video 360 API v1

Display & Video 360 API allows users to automate complex Display & Video 360 workflows, such as creating insertion orders and setting targeting options for individual line items.
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

      // Create, see, and edit Display & Video 360 Campaign entities and see billing invoices
      'https://www.googleapis.com/auth/display-video-mediaplanning',

      // Private Service: https://www.googleapis.com/auth/display-video-user-management
      'https://www.googleapis.com/auth/display-video-user-management',

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
Audits an advertiser. Returns the counts of used entities per resource type under the advertiser provided. Used entities count towards their respective resource limit. See https://support.google.com/displayvideo/answer/6071450.
*/
await gapi.client.displayvideo.advertisers.audit({ advertiserId: "advertiserId",  });

/*
Bulk edits targeting options under a single advertiser. The operation will delete the assigned targeting options provided in BulkEditAdvertiserAssignedTargetingOptionsRequest.delete_requests and then create the assigned targeting options provided in BulkEditAdvertiserAssignedTargetingOptionsRequest.create_requests .
*/
await gapi.client.displayvideo.advertisers.bulkEditAdvertiserAssignedTargetingOptions({ advertiserId: "advertiserId",  });

/*
Lists assigned targeting options of an advertiser across targeting types.
*/
await gapi.client.displayvideo.advertisers.bulkListAdvertiserAssignedTargetingOptions({ advertiserId: "advertiserId",  });

/*
Creates a new advertiser. Returns the newly created advertiser if successful. This method can take up to 180 seconds to complete.
*/
await gapi.client.displayvideo.advertisers.create({  });

/*
Deletes an advertiser. Deleting an advertiser will delete all of its child resources, for example, campaigns, insertion orders and line items. A deleted advertiser cannot be recovered.
*/
await gapi.client.displayvideo.advertisers.delete({ advertiserId: "advertiserId",  });

/*
Gets an advertiser.
*/
await gapi.client.displayvideo.advertisers.get({ advertiserId: "advertiserId",  });

/*
Lists advertisers that are accessible to the current user. The order is defined by the order_by parameter. A single partner_id is required. Cross-partner listing is not supported.
*/
await gapi.client.displayvideo.advertisers.list({  });

/*
Updates an existing advertiser. Returns the updated advertiser if successful.
*/
await gapi.client.displayvideo.advertisers.patch({ advertiserId: "advertiserId",  });

/*
Gets a combined audience.
*/
await gapi.client.displayvideo.combinedAudiences.get({ combinedAudienceId: "combinedAudienceId",  });

/*
Lists combined audiences. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.combinedAudiences.list({  });

/*
Creates a new custom bidding algorithm. Returns the newly created custom bidding algorithm if successful.
*/
await gapi.client.displayvideo.customBiddingAlgorithms.create({  });

/*
Gets a custom bidding algorithm.
*/
await gapi.client.displayvideo.customBiddingAlgorithms.get({ customBiddingAlgorithmId: "customBiddingAlgorithmId",  });

/*
Lists custom bidding algorithms that are accessible to the current user and can be used in bidding stratgies. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.customBiddingAlgorithms.list({  });

/*
Updates an existing custom bidding algorithm. Returns the updated custom bidding algorithm if successful.
*/
await gapi.client.displayvideo.customBiddingAlgorithms.patch({ customBiddingAlgorithmId: "customBiddingAlgorithmId",  });

/*
Creates a custom bidding script reference object for a script file. The resulting reference object provides a resource path to which the script file should be uploaded. This reference object should be included in when creating a new custom bidding script object.
*/
await gapi.client.displayvideo.customBiddingAlgorithms.uploadScript({ customBiddingAlgorithmId: "customBiddingAlgorithmId",  });

/*
Gets a custom list.
*/
await gapi.client.displayvideo.customLists.get({ customListId: "customListId",  });

/*
Lists custom lists. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.customLists.list({  });

/*
Creates a FirstAndThirdPartyAudience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`
*/
await gapi.client.displayvideo.firstAndThirdPartyAudiences.create({  });

/*
Updates the member list of a Customer Match audience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`
*/
await gapi.client.displayvideo.firstAndThirdPartyAudiences.editCustomerMatchMembers({ firstAndThirdPartyAudienceId: "firstAndThirdPartyAudienceId",  });

/*
Gets a first and third party audience.
*/
await gapi.client.displayvideo.firstAndThirdPartyAudiences.get({ firstAndThirdPartyAudienceId: "firstAndThirdPartyAudienceId",  });

/*
Lists first and third party audiences. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.firstAndThirdPartyAudiences.list({  });

/*
Updates an existing FirstAndThirdPartyAudience. Only supported for the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`
*/
await gapi.client.displayvideo.firstAndThirdPartyAudiences.patch({ firstAndThirdPartyAudienceId: "firstAndThirdPartyAudienceId",  });

/*
Gets a Floodlight group.
*/
await gapi.client.displayvideo.floodlightGroups.get({ floodlightGroupId: "floodlightGroupId",  });

/*
Updates an existing Floodlight group. Returns the updated Floodlight group if successful.
*/
await gapi.client.displayvideo.floodlightGroups.patch({ floodlightGroupId: "floodlightGroupId",  });

/*
Gets a Google audience.
*/
await gapi.client.displayvideo.googleAudiences.get({ googleAudienceId: "googleAudienceId",  });

/*
Lists Google audiences. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.googleAudiences.list({  });

/*
Creates a new guaranteed order. Returns the newly created guaranteed order if successful.
*/
await gapi.client.displayvideo.guaranteedOrders.create({  });

/*
Edits read advertisers of a guaranteed order.
*/
await gapi.client.displayvideo.guaranteedOrders.editGuaranteedOrderReadAccessors({ guaranteedOrderId: "guaranteedOrderId",  });

/*
Gets a guaranteed order.
*/
await gapi.client.displayvideo.guaranteedOrders.get({ guaranteedOrderId: "guaranteedOrderId",  });

/*
Lists guaranteed orders that are accessible to the current user. The order is defined by the order_by parameter. If a filter by entity_status is not specified, guaranteed orders with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results.
*/
await gapi.client.displayvideo.guaranteedOrders.list({  });

/*
Updates an existing guaranteed order. Returns the updated guaranteed order if successful.
*/
await gapi.client.displayvideo.guaranteedOrders.patch({ guaranteedOrderId: "guaranteedOrderId",  });

/*
Creates a new inventory source group. Returns the newly created inventory source group if successful.
*/
await gapi.client.displayvideo.inventorySourceGroups.create({  });

/*
Deletes an inventory source group.
*/
await gapi.client.displayvideo.inventorySourceGroups.delete({ inventorySourceGroupId: "inventorySourceGroupId",  });

/*
Gets an inventory source group.
*/
await gapi.client.displayvideo.inventorySourceGroups.get({ inventorySourceGroupId: "inventorySourceGroupId",  });

/*
Lists inventory source groups that are accessible to the current user. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.inventorySourceGroups.list({  });

/*
Updates an inventory source group. Returns the updated inventory source group if successful.
*/
await gapi.client.displayvideo.inventorySourceGroups.patch({ inventorySourceGroupId: "inventorySourceGroupId",  });

/*
Creates a new inventory source. Returns the newly created inventory source if successful.
*/
await gapi.client.displayvideo.inventorySources.create({  });

/*
Edits read/write accessors of an inventory source. Returns the updated read_write_accessors for the inventory source.
*/
await gapi.client.displayvideo.inventorySources.editInventorySourceReadWriteAccessors({ inventorySourceId: "inventorySourceId",  });

/*
Gets an inventory source.
*/
await gapi.client.displayvideo.inventorySources.get({ inventorySourceId: "inventorySourceId",  });

/*
Lists inventory sources that are accessible to the current user. The order is defined by the order_by parameter. If a filter by entity_status is not specified, inventory sources with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results.
*/
await gapi.client.displayvideo.inventorySources.list({  });

/*
Updates an existing inventory source. Returns the updated inventory source if successful.
*/
await gapi.client.displayvideo.inventorySources.patch({ inventorySourceId: "inventorySourceId",  });

/*
Downloads media. Download is supported on the URI `/download/{resource_name=**}?alt=media.` **Note**: Download requests will not be successful without including `alt=media` query string.
*/
await gapi.client.displayvideo.media.download({ resourceName: "resourceName",  });

/*
Uploads media. Upload is supported on the URI `/upload/media/{resource_name=**}?upload_type=media.` **Note**: Upload requests will not be successful without including `upload_type=media` query string.
*/
await gapi.client.displayvideo.media.upload({ resourceName: "resourceName",  });

/*
Bulk edits targeting options under a single partner. The operation will delete the assigned targeting options provided in BulkEditPartnerAssignedTargetingOptionsRequest.deleteRequests and then create the assigned targeting options provided in BulkEditPartnerAssignedTargetingOptionsRequest.createRequests .
*/
await gapi.client.displayvideo.partners.bulkEditPartnerAssignedTargetingOptions({ partnerId: "partnerId",  });

/*
Gets a partner.
*/
await gapi.client.displayvideo.partners.get({ partnerId: "partnerId",  });

/*
Lists partners that are accessible to the current user. The order is defined by the order_by parameter.
*/
await gapi.client.displayvideo.partners.list({  });

/*
Creates an SDF Download Task. Returns an Operation. An SDF Download Task is a long-running, asynchronous operation. The metadata type of this operation is SdfDownloadTaskMetadata. If the request is successful, the response type of the operation is SdfDownloadTask. The response will not include the download files, which must be retrieved with media.download. The state of operation can be retrieved with sdfdownloadtask.operations.get. Any errors can be found in the error.message. Note that error.details is expected to be empty.
*/
await gapi.client.displayvideo.sdfdownloadtasks.create({  });

/*
Bulk edits user roles for a user. The operation will delete the assigned user roles provided in BulkEditAssignedUserRolesRequest.deletedAssignedUserRoles and then assign the user roles provided in BulkEditAssignedUserRolesRequest.createdAssignedUserRoles.
*/
await gapi.client.displayvideo.users.bulkEditAssignedUserRoles({ userId: "userId",  });

/*
Creates a new user. Returns the newly created user if successful.
*/
await gapi.client.displayvideo.users.create({  });

/*
Deletes a user.
*/
await gapi.client.displayvideo.users.delete({ userId: "userId",  });

/*
Gets a user.
*/
await gapi.client.displayvideo.users.get({ userId: "userId",  });

/*
Lists users that are accessible to the current user. If two users have user roles on the same partner or advertiser, they can access each other.
*/
await gapi.client.displayvideo.users.list({  });

/*
Updates an existing user. Returns the updated user if successful.
*/
await gapi.client.displayvideo.users.patch({ userId: "userId",  });
```
