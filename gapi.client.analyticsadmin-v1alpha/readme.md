# TypeScript typings for Google Analytics Admin API v1alpha

Manage properties in Google Analytics. Warning: Creating multiple Customer Applications, Accounts, or Projects to simulate or act as a single Customer Application, Account, or Project (respectively) or to circumvent Service-specific usage limits or quotas is a direct violation of Google Cloud Platform Terms of Service as well as Google APIs Terms of Service. These actions can result in immediate termination of your GCP project(s) without any warning.
For detailed description please check [documentation](http://code.google.com/apis/analytics/docs/mgmt/home.html).

## Installing

Install typings for Google Analytics Admin API:

```
npm install @types/gapi.client.analyticsadmin-v1alpha --save-dev
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
  'https://analyticsadmin.googleapis.com/$discovery/rest?version=v1alpha',
  () => {
    // now we can use:
    // gapi.client.analyticsadmin
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('analyticsadmin', 'v1alpha', () => {
  // now we can use:
  // gapi.client.analyticsadmin
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Edit Google Analytics management entities
    'https://www.googleapis.com/auth/analytics.edit',

    // Manage Google Analytics Account users by email address
    'https://www.googleapis.com/auth/analytics.manage.users',

    // View Google Analytics user permissions
    'https://www.googleapis.com/auth/analytics.manage.users.readonly',

    // See and download your Google Analytics data
    'https://www.googleapis.com/auth/analytics.readonly',
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

After that you can use Google Analytics Admin API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Marks target Account as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted accounts. However, they can be restored using the Trash Can UI. If the accounts are not restored before the expiration time, the account and all child resources (eg: Properties, GoogleAdsLinks, Streams, AccessBindings) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found.
*/
await gapi.client.analyticsadmin.accounts.delete({name: 'name'});

/*
Lookup for a single Account.
*/
await gapi.client.analyticsadmin.accounts.get({name: 'name'});

/*
Get data sharing settings on an account. Data sharing settings are singletons.
*/
await gapi.client.analyticsadmin.accounts.getDataSharingSettings({
  name: 'name',
});

/*
Returns all accounts accessible by the caller. Note that these accounts might not currently have GA properties. Soft-deleted (ie: "trashed") accounts are excluded by default. Returns an empty list if no relevant accounts are found.
*/
await gapi.client.analyticsadmin.accounts.list({});

/*
Updates an account.
*/
await gapi.client.analyticsadmin.accounts.patch({name: 'name'});

/*
Requests a ticket for creating an account.
*/
await gapi.client.analyticsadmin.accounts.provisionAccountTicket({});

/*
Returns a customized report of data access records. The report provides records of each time a user reads Google Analytics reporting data. Access records are retained for up to 2 years. Data Access Reports can be requested for a property. Reports may be requested for any property, but dimensions that aren't related to quota can only be requested on Google Analytics 360 properties. This method is only available to Administrators. These data access records include GA UI Reporting, GA UI Explorations, GA Data API, and other products like Firebase & Admob that can retrieve data from Google Analytics through a linkage. These records don't include property configuration changes like adding a stream or changing a property's time zone. For configuration change history, see [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents). To give your feedback on this API, complete the [Google Analytics Access Reports feedback](https://docs.google.com/forms/d/e/1FAIpQLSdmEBUrMzAEdiEKk5TV5dEHvDUZDRlgWYdQdAeSdtR4hVjEhw/viewform) form.
*/
await gapi.client.analyticsadmin.accounts.runAccessReport({entity: 'entity'});

/*
Searches through all changes to an account or its children given the specified set of filters. Only returns the subset of changes supported by the API. The UI may return additional changes.
*/
await gapi.client.analyticsadmin.accounts.searchChangeHistoryEvents({
  account: 'account',
});

/*
Returns summaries of all accounts accessible by the caller.
*/
await gapi.client.analyticsadmin.accountSummaries.list({});

/*
Acknowledges the terms of user data collection for the specified property. This acknowledgement must be completed (either in the Google Analytics UI or through this API) before MeasurementProtocolSecret resources may be created.
*/
await gapi.client.analyticsadmin.properties.acknowledgeUserDataCollection({
  property: 'property',
});

/*
Creates a Google Analytics property with the specified location and attributes.
*/
await gapi.client.analyticsadmin.properties.create({});

/*
Creates a connected site tag for a Universal Analytics property. You can create a maximum of 20 connected site tags per property. Note: This API cannot be used on GA4 properties.
*/
await gapi.client.analyticsadmin.properties.createConnectedSiteTag({});

/*
Create a roll-up property and all roll-up property source links.
*/
await gapi.client.analyticsadmin.properties.createRollupProperty({});

/*
Marks target Property as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted properties. However, they can be restored using the Trash Can UI. If the properties are not restored before the expiration time, the Property and all child resources (eg: GoogleAdsLinks, Streams, AccessBindings) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found.
*/
await gapi.client.analyticsadmin.properties.delete({name: 'name'});

/*
Deletes a connected site tag for a Universal Analytics property. Note: this has no effect on GA4 properties.
*/
await gapi.client.analyticsadmin.properties.deleteConnectedSiteTag({});

/*
Fetches the opt out status for the automated GA4 setup process for a UA property. Note: this has no effect on GA4 property.
*/
await gapi.client.analyticsadmin.properties.fetchAutomatedGa4ConfigurationOptOut(
  {},
);

/*
Given a specified UA property, looks up the GA4 property connected to it. Note: this cannot be used with GA4 properties.
*/
await gapi.client.analyticsadmin.properties.fetchConnectedGa4Property({});

/*
Lookup for a single GA Property.
*/
await gapi.client.analyticsadmin.properties.get({name: 'name'});

/*
Lookup for a AttributionSettings singleton.
*/
await gapi.client.analyticsadmin.properties.getAttributionSettings({
  name: 'name',
});

/*
Returns the singleton data retention settings for this property.
*/
await gapi.client.analyticsadmin.properties.getDataRetentionSettings({
  name: 'name',
});

/*
Lookup for Google Signals settings for a property.
*/
await gapi.client.analyticsadmin.properties.getGoogleSignalsSettings({
  name: 'name',
});

/*
Returns the singleton data retention settings for this property.
*/
await gapi.client.analyticsadmin.properties.getReportingIdentitySettings({
  name: 'name',
});

/*
Returns child Properties under the specified parent Account. Properties will be excluded if the caller does not have access. Soft-deleted (ie: "trashed") properties are excluded by default. Returns an empty list if no relevant properties are found.
*/
await gapi.client.analyticsadmin.properties.list({});

/*
Lists the connected site tags for a Universal Analytics property. A maximum of 20 connected site tags will be returned. Note: this has no effect on GA4 property.
*/
await gapi.client.analyticsadmin.properties.listConnectedSiteTags({});

/*
Updates a property.
*/
await gapi.client.analyticsadmin.properties.patch({name: 'name'});

/*
Create a subproperty and a subproperty event filter that applies to the created subproperty.
*/
await gapi.client.analyticsadmin.properties.provisionSubproperty({});

/*
Returns a customized report of data access records. The report provides records of each time a user reads Google Analytics reporting data. Access records are retained for up to 2 years. Data Access Reports can be requested for a property. Reports may be requested for any property, but dimensions that aren't related to quota can only be requested on Google Analytics 360 properties. This method is only available to Administrators. These data access records include GA UI Reporting, GA UI Explorations, GA Data API, and other products like Firebase & Admob that can retrieve data from Google Analytics through a linkage. These records don't include property configuration changes like adding a stream or changing a property's time zone. For configuration change history, see [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents). To give your feedback on this API, complete the [Google Analytics Access Reports feedback](https://docs.google.com/forms/d/e/1FAIpQLSdmEBUrMzAEdiEKk5TV5dEHvDUZDRlgWYdQdAeSdtR4hVjEhw/viewform) form.
*/
await gapi.client.analyticsadmin.properties.runAccessReport({entity: 'entity'});

/*
Sets the opt out status for the automated GA4 setup process for a UA property. Note: this has no effect on GA4 property.
*/
await gapi.client.analyticsadmin.properties.setAutomatedGa4ConfigurationOptOut(
  {},
);

/*
Updates attribution settings on a property.
*/
await gapi.client.analyticsadmin.properties.updateAttributionSettings({
  name: 'name',
});

/*
Updates the singleton data retention settings for this property.
*/
await gapi.client.analyticsadmin.properties.updateDataRetentionSettings({
  name: 'name',
});

/*
Updates Google Signals settings for a property.
*/
await gapi.client.analyticsadmin.properties.updateGoogleSignalsSettings({
  name: 'name',
});
```
