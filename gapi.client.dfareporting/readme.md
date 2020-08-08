# TypeScript typings for DCM/DFA Reporting And Trafficking API v3.4

Manage your DoubleClick Campaign Manager ad campaigns and reports.
For detailed description please check [documentation](https://developers.google.com/doubleclick-advertisers/).

## Installing

Install typings for DCM/DFA Reporting And Trafficking API:

```
npm install @types/gapi.client.dfareporting@v3.4 --save-dev
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
gapi.client.load('dfareporting', 'v3.4', () => {
  // now we can use gapi.client.dfareporting
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Manage DoubleClick Digital Marketing conversions
      'https://www.googleapis.com/auth/ddmconversions',

      // View and manage DoubleClick for Advertisers reports
      'https://www.googleapis.com/auth/dfareporting',

      // View and manage your DoubleClick Campaign Manager's (DCM) display ad campaigns
      'https://www.googleapis.com/auth/dfatrafficking',
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

After that you can use DCM/DFA Reporting And Trafficking API resources:

```typescript

/*
Gets the account's active ad summary by account ID.
*/
await gapi.client.dfareporting.accountActiveAdSummaries.get({ profileId: "profileId", summaryAccountId: "summaryAccountId",  });

/*
Gets one account permission group by ID.
*/
await gapi.client.dfareporting.accountPermissionGroups.get({ id: "id", profileId: "profileId",  });

/*
Retrieves the list of account permission groups.
*/
await gapi.client.dfareporting.accountPermissionGroups.list({ profileId: "profileId",  });

/*
Gets one account permission by ID.
*/
await gapi.client.dfareporting.accountPermissions.get({ id: "id", profileId: "profileId",  });

/*
Retrieves the list of account permissions.
*/
await gapi.client.dfareporting.accountPermissions.list({ profileId: "profileId",  });

/*
Gets one account by ID.
*/
await gapi.client.dfareporting.accounts.get({ id: "id", profileId: "profileId",  });

/*
Retrieves the list of accounts, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.accounts.list({ profileId: "profileId",  });

/*
Updates an existing account. This method supports patch semantics.
*/
await gapi.client.dfareporting.accounts.patch({ profileId: "profileId",  });

/*
Updates an existing account.
*/
await gapi.client.dfareporting.accounts.update({ profileId: "profileId",  });

/*
Gets one account user profile by ID.
*/
await gapi.client.dfareporting.accountUserProfiles.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new account user profile.
*/
await gapi.client.dfareporting.accountUserProfiles.insert({ profileId: "profileId",  });

/*
Retrieves a list of account user profiles, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.accountUserProfiles.list({ profileId: "profileId",  });

/*
Updates an existing account user profile. This method supports patch semantics.
*/
await gapi.client.dfareporting.accountUserProfiles.patch({ profileId: "profileId",  });

/*
Updates an existing account user profile.
*/
await gapi.client.dfareporting.accountUserProfiles.update({ profileId: "profileId",  });

/*
Gets one ad by ID.
*/
await gapi.client.dfareporting.ads.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new ad.
*/
await gapi.client.dfareporting.ads.insert({ profileId: "profileId",  });

/*
Retrieves a list of ads, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.ads.list({ profileId: "profileId",  });

/*
Updates an existing ad. This method supports patch semantics.
*/
await gapi.client.dfareporting.ads.patch({ profileId: "profileId",  });

/*
Updates an existing ad.
*/
await gapi.client.dfareporting.ads.update({ profileId: "profileId",  });

/*
Deletes an existing advertiser group.
*/
await gapi.client.dfareporting.advertiserGroups.delete({ id: "id", profileId: "profileId",  });

/*
Gets one advertiser group by ID.
*/
await gapi.client.dfareporting.advertiserGroups.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new advertiser group.
*/
await gapi.client.dfareporting.advertiserGroups.insert({ profileId: "profileId",  });

/*
Retrieves a list of advertiser groups, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.advertiserGroups.list({ profileId: "profileId",  });

/*
Updates an existing advertiser group. This method supports patch semantics.
*/
await gapi.client.dfareporting.advertiserGroups.patch({ profileId: "profileId",  });

/*
Updates an existing advertiser group.
*/
await gapi.client.dfareporting.advertiserGroups.update({ profileId: "profileId",  });

/*
Gets one landing page by ID.
*/
await gapi.client.dfareporting.advertiserLandingPages.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new landing page.
*/
await gapi.client.dfareporting.advertiserLandingPages.insert({ profileId: "profileId",  });

/*
Retrieves a list of landing pages.
*/
await gapi.client.dfareporting.advertiserLandingPages.list({ profileId: "profileId",  });

/*
Updates an existing advertiser landing page. This method supports patch semantics.
*/
await gapi.client.dfareporting.advertiserLandingPages.patch({ profileId: "profileId",  });

/*
Updates an existing landing page.
*/
await gapi.client.dfareporting.advertiserLandingPages.update({ profileId: "profileId",  });

/*
Gets one advertiser by ID.
*/
await gapi.client.dfareporting.advertisers.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new advertiser.
*/
await gapi.client.dfareporting.advertisers.insert({ profileId: "profileId",  });

/*
Retrieves a list of advertisers, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.advertisers.list({ profileId: "profileId",  });

/*
Updates an existing advertiser. This method supports patch semantics.
*/
await gapi.client.dfareporting.advertisers.patch({ profileId: "profileId",  });

/*
Updates an existing advertiser.
*/
await gapi.client.dfareporting.advertisers.update({ profileId: "profileId",  });

/*
Retrieves a list of browsers.
*/
await gapi.client.dfareporting.browsers.list({ profileId: "profileId",  });

/*
Associates a creative with the specified campaign. This method creates a default ad with dimensions matching the creative in the campaign if such a default ad does not exist already.
*/
await gapi.client.dfareporting.campaignCreativeAssociations.insert({ campaignId: "campaignId", profileId: "profileId",  });

/*
Retrieves the list of creative IDs associated with the specified campaign. This method supports paging.
*/
await gapi.client.dfareporting.campaignCreativeAssociations.list({ campaignId: "campaignId", profileId: "profileId",  });

/*
Gets one campaign by ID.
*/
await gapi.client.dfareporting.campaigns.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new campaign.
*/
await gapi.client.dfareporting.campaigns.insert({ profileId: "profileId",  });

/*
Retrieves a list of campaigns, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.campaigns.list({ profileId: "profileId",  });

/*
Updates an existing campaign. This method supports patch semantics.
*/
await gapi.client.dfareporting.campaigns.patch({ profileId: "profileId",  });

/*
Updates an existing campaign.
*/
await gapi.client.dfareporting.campaigns.update({ profileId: "profileId",  });

/*
Gets one change log by ID.
*/
await gapi.client.dfareporting.changeLogs.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of change logs. This method supports paging.
*/
await gapi.client.dfareporting.changeLogs.list({ profileId: "profileId",  });

/*
Retrieves a list of cities, possibly filtered.
*/
await gapi.client.dfareporting.cities.list({ profileId: "profileId",  });

/*
Gets one connection type by ID.
*/
await gapi.client.dfareporting.connectionTypes.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of connection types.
*/
await gapi.client.dfareporting.connectionTypes.list({ profileId: "profileId",  });

/*
Deletes an existing content category.
*/
await gapi.client.dfareporting.contentCategories.delete({ id: "id", profileId: "profileId",  });

/*
Gets one content category by ID.
*/
await gapi.client.dfareporting.contentCategories.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new content category.
*/
await gapi.client.dfareporting.contentCategories.insert({ profileId: "profileId",  });

/*
Retrieves a list of content categories, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.contentCategories.list({ profileId: "profileId",  });

/*
Updates an existing content category. This method supports patch semantics.
*/
await gapi.client.dfareporting.contentCategories.patch({ profileId: "profileId",  });

/*
Updates an existing content category.
*/
await gapi.client.dfareporting.contentCategories.update({ profileId: "profileId",  });

/*
Inserts conversions.
*/
await gapi.client.dfareporting.conversions.batchinsert({ profileId: "profileId",  });

/*
Updates existing conversions.
*/
await gapi.client.dfareporting.conversions.batchupdate({ profileId: "profileId",  });

/*
Gets one country by ID.
*/
await gapi.client.dfareporting.countries.get({ dartId: "dartId", profileId: "profileId",  });

/*
Retrieves a list of countries.
*/
await gapi.client.dfareporting.countries.list({ profileId: "profileId",  });

/*
Inserts a new creative asset.
*/
await gapi.client.dfareporting.creativeAssets.insert({ advertiserId: "advertiserId", profileId: "profileId",  });

/*
Deletes an existing creative field.
*/
await gapi.client.dfareporting.creativeFields.delete({ id: "id", profileId: "profileId",  });

/*
Gets one creative field by ID.
*/
await gapi.client.dfareporting.creativeFields.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new creative field.
*/
await gapi.client.dfareporting.creativeFields.insert({ profileId: "profileId",  });

/*
Retrieves a list of creative fields, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.creativeFields.list({ profileId: "profileId",  });

/*
Updates an existing creative field. This method supports patch semantics.
*/
await gapi.client.dfareporting.creativeFields.patch({ profileId: "profileId",  });

/*
Updates an existing creative field.
*/
await gapi.client.dfareporting.creativeFields.update({ profileId: "profileId",  });

/*
Deletes an existing creative field value.
*/
await gapi.client.dfareporting.creativeFieldValues.delete({ creativeFieldId: "creativeFieldId", id: "id", profileId: "profileId",  });

/*
Gets one creative field value by ID.
*/
await gapi.client.dfareporting.creativeFieldValues.get({ creativeFieldId: "creativeFieldId", id: "id", profileId: "profileId",  });

/*
Inserts a new creative field value.
*/
await gapi.client.dfareporting.creativeFieldValues.insert({ creativeFieldId: "creativeFieldId", profileId: "profileId",  });

/*
Retrieves a list of creative field values, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.creativeFieldValues.list({ creativeFieldId: "creativeFieldId", profileId: "profileId",  });

/*
Updates an existing creative field value. This method supports patch semantics.
*/
await gapi.client.dfareporting.creativeFieldValues.patch({ creativeFieldId: "creativeFieldId", profileId: "profileId",  });

/*
Updates an existing creative field value.
*/
await gapi.client.dfareporting.creativeFieldValues.update({ creativeFieldId: "creativeFieldId", profileId: "profileId",  });

/*
Gets one creative group by ID.
*/
await gapi.client.dfareporting.creativeGroups.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new creative group.
*/
await gapi.client.dfareporting.creativeGroups.insert({ profileId: "profileId",  });

/*
Retrieves a list of creative groups, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.creativeGroups.list({ profileId: "profileId",  });

/*
Updates an existing creative group. This method supports patch semantics.
*/
await gapi.client.dfareporting.creativeGroups.patch({ profileId: "profileId",  });

/*
Updates an existing creative group.
*/
await gapi.client.dfareporting.creativeGroups.update({ profileId: "profileId",  });

/*
Gets one creative by ID.
*/
await gapi.client.dfareporting.creatives.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new creative.
*/
await gapi.client.dfareporting.creatives.insert({ profileId: "profileId",  });

/*
Retrieves a list of creatives, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.creatives.list({ profileId: "profileId",  });

/*
Updates an existing creative. This method supports patch semantics.
*/
await gapi.client.dfareporting.creatives.patch({ profileId: "profileId",  });

/*
Updates an existing creative.
*/
await gapi.client.dfareporting.creatives.update({ profileId: "profileId",  });

/*
Inserts custom events.
*/
await gapi.client.dfareporting.customEvents.batchinsert({ profileId: "profileId",  });

/*
Retrieves list of report dimension values for a list of filters.
*/
await gapi.client.dfareporting.dimensionValues.query({ profileId: "profileId",  });

/*
Gets one directory site by ID.
*/
await gapi.client.dfareporting.directorySites.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new directory site.
*/
await gapi.client.dfareporting.directorySites.insert({ profileId: "profileId",  });

/*
Retrieves a list of directory sites, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.directorySites.list({ profileId: "profileId",  });

/*
Deletes an existing dynamic targeting key.
*/
await gapi.client.dfareporting.dynamicTargetingKeys.delete({ name: "name", objectId: "objectId", objectType: "objectType", profileId: "profileId",  });

/*
Inserts a new dynamic targeting key. Keys must be created at the advertiser level before being assigned to the advertiser's ads, creatives, or placements. There is a maximum of 1000 keys per advertiser, out of which a maximum of 20 keys can be assigned per ad, creative, or placement.
*/
await gapi.client.dfareporting.dynamicTargetingKeys.insert({ profileId: "profileId",  });

/*
Retrieves a list of dynamic targeting keys.
*/
await gapi.client.dfareporting.dynamicTargetingKeys.list({ profileId: "profileId",  });

/*
Deletes an existing event tag.
*/
await gapi.client.dfareporting.eventTags.delete({ id: "id", profileId: "profileId",  });

/*
Gets one event tag by ID.
*/
await gapi.client.dfareporting.eventTags.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new event tag.
*/
await gapi.client.dfareporting.eventTags.insert({ profileId: "profileId",  });

/*
Retrieves a list of event tags, possibly filtered.
*/
await gapi.client.dfareporting.eventTags.list({ profileId: "profileId",  });

/*
Updates an existing event tag. This method supports patch semantics.
*/
await gapi.client.dfareporting.eventTags.patch({ profileId: "profileId",  });

/*
Updates an existing event tag.
*/
await gapi.client.dfareporting.eventTags.update({ profileId: "profileId",  });

/*
Retrieves a report file by its report ID and file ID. This method supports media download.
*/
await gapi.client.dfareporting.files.get({ fileId: "fileId", reportId: "reportId",  });

/*
Lists files for a user profile.
*/
await gapi.client.dfareporting.files.list({ profileId: "profileId",  });

/*
Deletes an existing floodlight activity.
*/
await gapi.client.dfareporting.floodlightActivities.delete({ id: "id", profileId: "profileId",  });

/*
Generates a tag for a floodlight activity.
*/
await gapi.client.dfareporting.floodlightActivities.generatetag({ profileId: "profileId",  });

/*
Gets one floodlight activity by ID.
*/
await gapi.client.dfareporting.floodlightActivities.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new floodlight activity.
*/
await gapi.client.dfareporting.floodlightActivities.insert({ profileId: "profileId",  });

/*
Retrieves a list of floodlight activities, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.floodlightActivities.list({ profileId: "profileId",  });

/*
Updates an existing floodlight activity. This method supports patch semantics.
*/
await gapi.client.dfareporting.floodlightActivities.patch({ profileId: "profileId",  });

/*
Updates an existing floodlight activity.
*/
await gapi.client.dfareporting.floodlightActivities.update({ profileId: "profileId",  });

/*
Gets one floodlight activity group by ID.
*/
await gapi.client.dfareporting.floodlightActivityGroups.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new floodlight activity group.
*/
await gapi.client.dfareporting.floodlightActivityGroups.insert({ profileId: "profileId",  });

/*
Retrieves a list of floodlight activity groups, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.floodlightActivityGroups.list({ profileId: "profileId",  });

/*
Updates an existing floodlight activity group. This method supports patch semantics.
*/
await gapi.client.dfareporting.floodlightActivityGroups.patch({ profileId: "profileId",  });

/*
Updates an existing floodlight activity group.
*/
await gapi.client.dfareporting.floodlightActivityGroups.update({ profileId: "profileId",  });

/*
Gets one floodlight configuration by ID.
*/
await gapi.client.dfareporting.floodlightConfigurations.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of floodlight configurations, possibly filtered.
*/
await gapi.client.dfareporting.floodlightConfigurations.list({ profileId: "profileId",  });

/*
Updates an existing floodlight configuration. This method supports patch semantics.
*/
await gapi.client.dfareporting.floodlightConfigurations.patch({ profileId: "profileId",  });

/*
Updates an existing floodlight configuration.
*/
await gapi.client.dfareporting.floodlightConfigurations.update({ profileId: "profileId",  });

/*
Gets one inventory item by ID.
*/
await gapi.client.dfareporting.inventoryItems.get({ id: "id", profileId: "profileId", projectId: "projectId",  });

/*
Retrieves a list of inventory items, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.inventoryItems.list({ profileId: "profileId", projectId: "projectId",  });

/*
Retrieves a list of languages.
*/
await gapi.client.dfareporting.languages.list({ profileId: "profileId",  });

/*
Retrieves a list of metros.
*/
await gapi.client.dfareporting.metros.list({ profileId: "profileId",  });

/*
Gets one mobile app by ID.
*/
await gapi.client.dfareporting.mobileApps.get({ id: "id", profileId: "profileId",  });

/*
Retrieves list of available mobile apps.
*/
await gapi.client.dfareporting.mobileApps.list({ profileId: "profileId",  });

/*
Gets one mobile carrier by ID.
*/
await gapi.client.dfareporting.mobileCarriers.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of mobile carriers.
*/
await gapi.client.dfareporting.mobileCarriers.list({ profileId: "profileId",  });

/*
Gets one operating system by DART ID.
*/
await gapi.client.dfareporting.operatingSystems.get({ dartId: "dartId", profileId: "profileId",  });

/*
Retrieves a list of operating systems.
*/
await gapi.client.dfareporting.operatingSystems.list({ profileId: "profileId",  });

/*
Gets one operating system version by ID.
*/
await gapi.client.dfareporting.operatingSystemVersions.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of operating system versions.
*/
await gapi.client.dfareporting.operatingSystemVersions.list({ profileId: "profileId",  });

/*
Gets one order document by ID.
*/
await gapi.client.dfareporting.orderDocuments.get({ id: "id", profileId: "profileId", projectId: "projectId",  });

/*
Retrieves a list of order documents, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.orderDocuments.list({ profileId: "profileId", projectId: "projectId",  });

/*
Gets one order by ID.
*/
await gapi.client.dfareporting.orders.get({ id: "id", profileId: "profileId", projectId: "projectId",  });

/*
Retrieves a list of orders, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.orders.list({ profileId: "profileId", projectId: "projectId",  });

/*
Gets one placement group by ID.
*/
await gapi.client.dfareporting.placementGroups.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new placement group.
*/
await gapi.client.dfareporting.placementGroups.insert({ profileId: "profileId",  });

/*
Retrieves a list of placement groups, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.placementGroups.list({ profileId: "profileId",  });

/*
Updates an existing placement group. This method supports patch semantics.
*/
await gapi.client.dfareporting.placementGroups.patch({ profileId: "profileId",  });

/*
Updates an existing placement group.
*/
await gapi.client.dfareporting.placementGroups.update({ profileId: "profileId",  });

/*
Generates tags for a placement.
*/
await gapi.client.dfareporting.placements.generatetags({ profileId: "profileId",  });

/*
Gets one placement by ID.
*/
await gapi.client.dfareporting.placements.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new placement.
*/
await gapi.client.dfareporting.placements.insert({ profileId: "profileId",  });

/*
Retrieves a list of placements, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.placements.list({ profileId: "profileId",  });

/*
Updates an existing placement. This method supports patch semantics.
*/
await gapi.client.dfareporting.placements.patch({ profileId: "profileId",  });

/*
Updates an existing placement.
*/
await gapi.client.dfareporting.placements.update({ profileId: "profileId",  });

/*
Deletes an existing placement strategy.
*/
await gapi.client.dfareporting.placementStrategies.delete({ id: "id", profileId: "profileId",  });

/*
Gets one placement strategy by ID.
*/
await gapi.client.dfareporting.placementStrategies.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new placement strategy.
*/
await gapi.client.dfareporting.placementStrategies.insert({ profileId: "profileId",  });

/*
Retrieves a list of placement strategies, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.placementStrategies.list({ profileId: "profileId",  });

/*
Updates an existing placement strategy. This method supports patch semantics.
*/
await gapi.client.dfareporting.placementStrategies.patch({ profileId: "profileId",  });

/*
Updates an existing placement strategy.
*/
await gapi.client.dfareporting.placementStrategies.update({ profileId: "profileId",  });

/*
Gets one platform type by ID.
*/
await gapi.client.dfareporting.platformTypes.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of platform types.
*/
await gapi.client.dfareporting.platformTypes.list({ profileId: "profileId",  });

/*
Gets one postal code by ID.
*/
await gapi.client.dfareporting.postalCodes.get({ code: "code", profileId: "profileId",  });

/*
Retrieves a list of postal codes.
*/
await gapi.client.dfareporting.postalCodes.list({ profileId: "profileId",  });

/*
Gets one project by ID.
*/
await gapi.client.dfareporting.projects.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of projects, possibly filtered. This method supports paging .
*/
await gapi.client.dfareporting.projects.list({ profileId: "profileId",  });

/*
Retrieves a list of regions.
*/
await gapi.client.dfareporting.regions.list({ profileId: "profileId",  });

/*
Gets one remarketing list by ID.
*/
await gapi.client.dfareporting.remarketingLists.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new remarketing list.
*/
await gapi.client.dfareporting.remarketingLists.insert({ profileId: "profileId",  });

/*
Retrieves a list of remarketing lists, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.remarketingLists.list({ advertiserId: "advertiserId", profileId: "profileId",  });

/*
Updates an existing remarketing list. This method supports patch semantics.
*/
await gapi.client.dfareporting.remarketingLists.patch({ profileId: "profileId",  });

/*
Updates an existing remarketing list.
*/
await gapi.client.dfareporting.remarketingLists.update({ profileId: "profileId",  });

/*
Gets one remarketing list share by remarketing list ID.
*/
await gapi.client.dfareporting.remarketingListShares.get({ profileId: "profileId", remarketingListId: "remarketingListId",  });

/*
Updates an existing remarketing list share. This method supports patch semantics.
*/
await gapi.client.dfareporting.remarketingListShares.patch({ profileId: "profileId", remarketingListId: "remarketingListId",  });

/*
Updates an existing remarketing list share.
*/
await gapi.client.dfareporting.remarketingListShares.update({ profileId: "profileId",  });

/*
Deletes a report by its ID.
*/
await gapi.client.dfareporting.reports.delete({ profileId: "profileId", reportId: "reportId",  });

/*
Retrieves a report by its ID.
*/
await gapi.client.dfareporting.reports.get({ profileId: "profileId", reportId: "reportId",  });

/*
Creates a report.
*/
await gapi.client.dfareporting.reports.insert({ profileId: "profileId",  });

/*
Retrieves list of reports.
*/
await gapi.client.dfareporting.reports.list({ profileId: "profileId",  });

/*
Updates an existing report. This method supports patch semantics.
*/
await gapi.client.dfareporting.reports.patch({ profileId: "profileId", reportId: "reportId",  });

/*
Runs a report.
*/
await gapi.client.dfareporting.reports.run({ profileId: "profileId", reportId: "reportId",  });

/*
Updates a report.
*/
await gapi.client.dfareporting.reports.update({ profileId: "profileId", reportId: "reportId",  });

/*
Gets one site by ID.
*/
await gapi.client.dfareporting.sites.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new site.
*/
await gapi.client.dfareporting.sites.insert({ profileId: "profileId",  });

/*
Retrieves a list of sites, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.sites.list({ profileId: "profileId",  });

/*
Updates an existing site. This method supports patch semantics.
*/
await gapi.client.dfareporting.sites.patch({ profileId: "profileId",  });

/*
Updates an existing site.
*/
await gapi.client.dfareporting.sites.update({ profileId: "profileId",  });

/*
Gets one size by ID.
*/
await gapi.client.dfareporting.sizes.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new size.
*/
await gapi.client.dfareporting.sizes.insert({ profileId: "profileId",  });

/*
Retrieves a list of sizes, possibly filtered. Retrieved sizes are globally unique and may include values not currently in use by your account. Due to this, the list of sizes returned by this method may differ from the list seen in the Trafficking UI.
*/
await gapi.client.dfareporting.sizes.list({ profileId: "profileId",  });

/*
Gets one subaccount by ID.
*/
await gapi.client.dfareporting.subaccounts.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new subaccount.
*/
await gapi.client.dfareporting.subaccounts.insert({ profileId: "profileId",  });

/*
Gets a list of subaccounts, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.subaccounts.list({ profileId: "profileId",  });

/*
Updates an existing subaccount. This method supports patch semantics.
*/
await gapi.client.dfareporting.subaccounts.patch({ profileId: "profileId",  });

/*
Updates an existing subaccount.
*/
await gapi.client.dfareporting.subaccounts.update({ profileId: "profileId",  });

/*
Gets one remarketing list by ID.
*/
await gapi.client.dfareporting.targetableRemarketingLists.get({ id: "id", profileId: "profileId",  });

/*
Retrieves a list of targetable remarketing lists, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.targetableRemarketingLists.list({ advertiserId: "advertiserId", profileId: "profileId",  });

/*
Gets one targeting template by ID.
*/
await gapi.client.dfareporting.targetingTemplates.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new targeting template.
*/
await gapi.client.dfareporting.targetingTemplates.insert({ profileId: "profileId",  });

/*
Retrieves a list of targeting templates, optionally filtered. This method supports paging.
*/
await gapi.client.dfareporting.targetingTemplates.list({ profileId: "profileId",  });

/*
Updates an existing targeting template. This method supports patch semantics.
*/
await gapi.client.dfareporting.targetingTemplates.patch({ profileId: "profileId",  });

/*
Updates an existing targeting template.
*/
await gapi.client.dfareporting.targetingTemplates.update({ profileId: "profileId",  });

/*
Gets one user profile by ID.
*/
await gapi.client.dfareporting.userProfiles.get({ profileId: "profileId",  });

/*
Retrieves list of user profiles for a user.
*/
await gapi.client.dfareporting.userProfiles.list({  });

/*
Gets one user role permission group by ID.
*/
await gapi.client.dfareporting.userRolePermissionGroups.get({ id: "id", profileId: "profileId",  });

/*
Gets a list of all supported user role permission groups.
*/
await gapi.client.dfareporting.userRolePermissionGroups.list({ profileId: "profileId",  });

/*
Gets one user role permission by ID.
*/
await gapi.client.dfareporting.userRolePermissions.get({ id: "id", profileId: "profileId",  });

/*
Gets a list of user role permissions, possibly filtered.
*/
await gapi.client.dfareporting.userRolePermissions.list({ profileId: "profileId",  });

/*
Deletes an existing user role.
*/
await gapi.client.dfareporting.userRoles.delete({ id: "id", profileId: "profileId",  });

/*
Gets one user role by ID.
*/
await gapi.client.dfareporting.userRoles.get({ id: "id", profileId: "profileId",  });

/*
Inserts a new user role.
*/
await gapi.client.dfareporting.userRoles.insert({ profileId: "profileId",  });

/*
Retrieves a list of user roles, possibly filtered. This method supports paging.
*/
await gapi.client.dfareporting.userRoles.list({ profileId: "profileId",  });

/*
Updates an existing user role. This method supports patch semantics.
*/
await gapi.client.dfareporting.userRoles.patch({ profileId: "profileId",  });

/*
Updates an existing user role.
*/
await gapi.client.dfareporting.userRoles.update({ profileId: "profileId",  });

/*
Gets one video format by ID.
*/
await gapi.client.dfareporting.videoFormats.get({ id: 1, profileId: "profileId",  });

/*
Lists available video formats.
*/
await gapi.client.dfareporting.videoFormats.list({ profileId: "profileId",  });
```
