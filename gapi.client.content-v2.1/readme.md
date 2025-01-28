# TypeScript typings for Content API for Shopping v2.1

Manage your product listings and accounts for Google Shopping
For detailed description please check [documentation](https://developers.google.com/shopping-content/v2/).

## Installing

Install typings for Content API for Shopping:

```
npm install @types/gapi.client.content-v2.1 --save-dev
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
  'https://shoppingcontent.googleapis.com/$discovery/rest?version=v2.1',
  () => {
    // now we can use:
    // gapi.client.content
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('content', 'v2.1', () => {
  // now we can use:
  // gapi.client.content
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Manage your product listings and accounts for Google Shopping
    'https://www.googleapis.com/auth/content',
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

After that you can use Content API for Shopping resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Returns information about the authenticated user.
*/
await gapi.client.content.accounts.authinfo({});

/*
Claims the website of a Merchant Center sub-account. Merchant accounts with approved third-party CSSs aren't required to claim a website.
*/
await gapi.client.content.accounts.claimwebsite({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Retrieves, inserts, updates, and deletes multiple Merchant Center (sub-)accounts in a single request.
*/
await gapi.client.content.accounts.custombatch({});

/*
Deletes a Merchant Center sub-account.
*/
await gapi.client.content.accounts.delete({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Retrieves a Merchant Center account.
*/
await gapi.client.content.accounts.get({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Creates a Merchant Center sub-account.
*/
await gapi.client.content.accounts.insert({merchantId: 'merchantId'});

/*
Performs an action on a link between two Merchant Center accounts, namely accountId and linkedAccountId.
*/
await gapi.client.content.accounts.link({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Lists the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.accounts.list({merchantId: 'merchantId'});

/*
Returns the list of accounts linked to your Merchant Center account.
*/
await gapi.client.content.accounts.listlinks({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Request verification code to start phone verification.
*/
await gapi.client.content.accounts.requestphoneverification({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Updates a Merchant Center account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.accounts.update({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Updates labels that are assigned to the Merchant Center account by CSS user.
*/
await gapi.client.content.accounts.updatelabels({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Validates verification code to verify phone number for the account. If successful this will overwrite the value of `accounts.businessinformation.phoneNumber`. Only verified phone number will replace an existing verified phone number.
*/
await gapi.client.content.accounts.verifyphonenumber({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Retrieves multiple Merchant Center account statuses in a single request.
*/
await gapi.client.content.accountstatuses.custombatch({});

/*
Retrieves the status of a Merchant Center account. No itemLevelIssues are returned for multi-client accounts.
*/
await gapi.client.content.accountstatuses.get({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Lists the statuses of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.accountstatuses.list({merchantId: 'merchantId'});

/*
Retrieves and updates tax settings of multiple accounts in a single request.
*/
await gapi.client.content.accounttax.custombatch({});

/*
Retrieves the tax settings of the account.
*/
await gapi.client.content.accounttax.get({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Lists the tax settings of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.accounttax.list({merchantId: 'merchantId'});

/*
Updates the tax settings of the account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.accounttax.update({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Uploads a collection to your Merchant Center account. If a collection with the same collectionId already exists, this method updates that entry. In each update, the collection is completely replaced by the fields in the body of the update request.
*/
await gapi.client.content.collections.create({merchantId: 'merchantId'});

/*
Deletes a collection from your Merchant Center account.
*/
await gapi.client.content.collections.delete({
  collectionId: 'collectionId',
  merchantId: 'merchantId',
});

/*
Retrieves a collection from your Merchant Center account.
*/
await gapi.client.content.collections.get({
  collectionId: 'collectionId',
  merchantId: 'merchantId',
});

/*
Lists the collections in your Merchant Center account. The response might contain fewer items than specified by page_size. Rely on next_page_token to determine if there are more items to be requested.
*/
await gapi.client.content.collections.list({merchantId: 'merchantId'});

/*
Gets the status of a collection from your Merchant Center account.
*/
await gapi.client.content.collectionstatuses.get({
  collectionId: 'collectionId',
  merchantId: 'merchantId',
});

/*
Lists the statuses of the collections in your Merchant Center account.
*/
await gapi.client.content.collectionstatuses.list({merchantId: 'merchantId'});

/*
Creates a new conversion source.
*/
await gapi.client.content.conversionsources.create({merchantId: 'merchantId'});

/*
Archives an existing conversion source. It will be recoverable for 30 days. This archiving behavior is not typical in the Content API and unique to this service.
*/
await gapi.client.content.conversionsources.delete({
  conversionSourceId: 'conversionSourceId',
  merchantId: 'merchantId',
});

/*
Fetches a conversion source.
*/
await gapi.client.content.conversionsources.get({
  conversionSourceId: 'conversionSourceId',
  merchantId: 'merchantId',
});

/*
Retrieves the list of conversion sources the caller has access to.
*/
await gapi.client.content.conversionsources.list({merchantId: 'merchantId'});

/*
Updates information of an existing conversion source.
*/
await gapi.client.content.conversionsources.patch({
  conversionSourceId: 'conversionSourceId',
  merchantId: 'merchantId',
});

/*
Re-enables an archived conversion source.
*/
await gapi.client.content.conversionsources.undelete({
  conversionSourceId: 'conversionSourceId',
  merchantId: 'merchantId',
});

/*
Retrieves a single CSS domain by ID.
*/
await gapi.client.content.csses.get({
  cssDomainId: 'cssDomainId',
  cssGroupId: 'cssGroupId',
});

/*
Lists CSS domains affiliated with a CSS group.
*/
await gapi.client.content.csses.list({cssGroupId: 'cssGroupId'});

/*
Updates labels that are assigned to a CSS domain by its CSS group.
*/
await gapi.client.content.csses.updatelabels({
  cssDomainId: 'cssDomainId',
  cssGroupId: 'cssGroupId',
});

/*
Deletes, fetches, gets, inserts and updates multiple datafeeds in a single request.
*/
await gapi.client.content.datafeeds.custombatch({});

/*
Deletes a datafeed configuration from your Merchant Center account.
*/
await gapi.client.content.datafeeds.delete({
  datafeedId: 'datafeedId',
  merchantId: 'merchantId',
});

/*
Invokes a fetch for the datafeed in your Merchant Center account. If you need to call this method more than once per day, we recommend you use the [Products service](https://developers.google.com/shopping-content/reference/rest/v2.1/products) to update your product data.
*/
await gapi.client.content.datafeeds.fetchnow({
  datafeedId: 'datafeedId',
  merchantId: 'merchantId',
});

/*
Retrieves a datafeed configuration from your Merchant Center account.
*/
await gapi.client.content.datafeeds.get({
  datafeedId: 'datafeedId',
  merchantId: 'merchantId',
});

/*
Registers a datafeed configuration with your Merchant Center account.
*/
await gapi.client.content.datafeeds.insert({merchantId: 'merchantId'});

/*
Lists the configurations for datafeeds in your Merchant Center account.
*/
await gapi.client.content.datafeeds.list({merchantId: 'merchantId'});

/*
Updates a datafeed configuration of your Merchant Center account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.datafeeds.update({
  datafeedId: 'datafeedId',
  merchantId: 'merchantId',
});

/*
Gets multiple Merchant Center datafeed statuses in a single request.
*/
await gapi.client.content.datafeedstatuses.custombatch({});

/*
Retrieves the status of a datafeed from your Merchant Center account.
*/
await gapi.client.content.datafeedstatuses.get({
  datafeedId: 'datafeedId',
  merchantId: 'merchantId',
});

/*
Lists the statuses of the datafeeds in your Merchant Center account.
*/
await gapi.client.content.datafeedstatuses.list({merchantId: 'merchantId'});

/*
Retrieves the status and review eligibility for the free listing program. Returns errors and warnings if they require action to resolve, will become disapprovals, or impact impressions. Use `accountstatuses` to view all issues for an account.
*/
await gapi.client.content.freelistingsprogram.get({merchantId: 'merchantId'});

/*
Requests a review of free listings in a specific region. This method deprecated. Use the `MerchantSupportService` to view product and account issues and request a review.
*/
await gapi.client.content.freelistingsprogram.requestreview({
  merchantId: 'merchantId',
});

/*
Retrieves and/or updates the LIA settings of multiple accounts in a single request.
*/
await gapi.client.content.liasettings.custombatch({});

/*
Retrieves the LIA settings of the account.
*/
await gapi.client.content.liasettings.get({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Retrieves the list of accessible Business Profiles.
*/
await gapi.client.content.liasettings.getaccessiblegmbaccounts({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Lists the LIA settings of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.liasettings.list({merchantId: 'merchantId'});

/*
Retrieves the list of POS data providers that have active settings for the all eiligible countries.
*/
await gapi.client.content.liasettings.listposdataproviders({});

/*
Requests access to a specified Business Profile.
*/
await gapi.client.content.liasettings.requestgmbaccess({
  accountId: 'accountId',
  gmbEmail: 'gmbEmail',
  merchantId: 'merchantId',
});

/*
Requests inventory validation for the specified country.
*/
await gapi.client.content.liasettings.requestinventoryverification({
  accountId: 'accountId',
  country: 'country',
  merchantId: 'merchantId',
});

/*
Sets the inventory verification contract for the specified country.
*/
await gapi.client.content.liasettings.setinventoryverificationcontact({
  accountId: 'accountId',
  contactEmail: 'contactEmail',
  contactName: 'contactName',
  country: 'country',
  language: 'language',
  merchantId: 'merchantId',
});

/*
Sets the omnichannel experience for the specified country. Only supported for merchants whose POS data provider is trusted to enable the corresponding experience. For more context, see these help articles [about LFP](https://support.google.com/merchants/answer/7676652) and [how to get started](https://support.google.com/merchants/answer/7676578) with it.
*/
await gapi.client.content.liasettings.setomnichannelexperience({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Sets the POS data provider for the specified country.
*/
await gapi.client.content.liasettings.setposdataprovider({
  accountId: 'accountId',
  country: 'country',
  merchantId: 'merchantId',
});

/*
Updates the LIA settings of the account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.liasettings.update({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Updates local inventory for multiple products or stores in a single request.
*/
await gapi.client.content.localinventory.custombatch({});

/*
Updates the local inventory of a product in your Merchant Center account.
*/
await gapi.client.content.localinventory.insert({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Provide a list of merchant's issues with a support content and available actions. This content and actions are meant to be rendered and shown in third-party applications.
*/
await gapi.client.content.merchantsupport.renderaccountissues({
  merchantId: 'merchantId',
});

/*
Provide a list of issues for merchant's product with a support content and available actions. This content and actions are meant to be rendered and shown in third-party applications.
*/
await gapi.client.content.merchantsupport.renderproductissues({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Start an action. The action can be requested by merchants in third-party application. Before merchants can request the action, the third-party application needs to show them action specific content and display a user input form. The action can be successfully started only once all `required` inputs are provided. If any `required` input is missing, or invalid value was provided, the service will return 400 error. Validation errors will contain Ids for all problematic field together with translated, human readable error messages that can be shown to the user.
*/
await gapi.client.content.merchantsupport.triggeraction({
  merchantId: 'merchantId',
});

/*
Creates new order tracking signal.
*/
await gapi.client.content.ordertrackingsignals.create({
  merchantId: 'merchantId',
});

/*
Batches multiple POS-related calls in a single request.
*/
await gapi.client.content.pos.custombatch({});

/*
Deletes a store for the given merchant.
*/
await gapi.client.content.pos.delete({
  merchantId: 'merchantId',
  storeCode: 'storeCode',
  targetMerchantId: 'targetMerchantId',
});

/*
Retrieves information about the given store.
*/
await gapi.client.content.pos.get({
  merchantId: 'merchantId',
  storeCode: 'storeCode',
  targetMerchantId: 'targetMerchantId',
});

/*
Creates a store for the given merchant.
*/
await gapi.client.content.pos.insert({
  merchantId: 'merchantId',
  targetMerchantId: 'targetMerchantId',
});

/*
Submit inventory for the given merchant.
*/
await gapi.client.content.pos.inventory({
  merchantId: 'merchantId',
  targetMerchantId: 'targetMerchantId',
});

/*
Lists the stores of the target merchant.
*/
await gapi.client.content.pos.list({
  merchantId: 'merchantId',
  targetMerchantId: 'targetMerchantId',
});

/*
Submit a sale event for the given merchant.
*/
await gapi.client.content.pos.sale({
  merchantId: 'merchantId',
  targetMerchantId: 'targetMerchantId',
});

/*
Creates or updates the delivery time of a product.
*/
await gapi.client.content.productdeliverytime.create({
  merchantId: 'merchantId',
});

/*
Deletes the delivery time of a product.
*/
await gapi.client.content.productdeliverytime.delete({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Gets `productDeliveryTime` by `productId`.
*/
await gapi.client.content.productdeliverytime.get({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Retrieves, inserts, and deletes multiple products in a single request.
*/
await gapi.client.content.products.custombatch({});

/*
Deletes a product from your Merchant Center account.
*/
await gapi.client.content.products.delete({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Retrieves a product from your Merchant Center account.
*/
await gapi.client.content.products.get({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Uploads a product to your Merchant Center account. If an item with the same channel, contentLanguage, offerId, and targetCountry already exists, this method updates that entry.
*/
await gapi.client.content.products.insert({merchantId: 'merchantId'});

/*
Lists the products in your Merchant Center account. The response might contain fewer items than specified by maxResults. Rely on nextPageToken to determine if there are more items to be requested.
*/
await gapi.client.content.products.list({merchantId: 'merchantId'});

/*
Updates an existing product in your Merchant Center account. Only updates attributes provided in the request.
*/
await gapi.client.content.products.update({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Gets the statuses of multiple products in a single request.
*/
await gapi.client.content.productstatuses.custombatch({});

/*
Gets the status of a product from your Merchant Center account.
*/
await gapi.client.content.productstatuses.get({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Lists the statuses of the products in your Merchant Center account.
*/
await gapi.client.content.productstatuses.list({merchantId: 'merchantId'});

/*
Inserts a promotion for your Merchant Center account. If the promotion already exists, then it updates the promotion instead. To [end or delete] (https://developers.google.com/shopping-content/guides/promotions#end_a_promotion) a promotion update the time period of the promotion to a time that has already passed.
*/
await gapi.client.content.promotions.create({merchantId: 'merchantId'});

/*
Retrieves a promotion from your Merchant Center account.
*/
await gapi.client.content.promotions.get({id: 'id', merchantId: 'merchantId'});

/*
List all promotions from your Merchant Center account.
*/
await gapi.client.content.promotions.list({merchantId: 'merchantId'});

/*
Retrieves a Merchant Center account's pubsub notification settings.
*/
await gapi.client.content.pubsubnotificationsettings.get({
  merchantId: 'merchantId',
});

/*
Register a Merchant Center account for pubsub notifications. Note that cloud topic name shouldn't be provided as part of the request.
*/
await gapi.client.content.pubsubnotificationsettings.update({
  merchantId: 'merchantId',
});

/*
Lists the daily call quota and usage per method for your Merchant Center account.
*/
await gapi.client.content.quotas.list({merchantId: 'merchantId'});

/*
Generates recommendations for a merchant.
*/
await gapi.client.content.recommendations.generate({merchantId: 'merchantId'});

/*
Reports an interaction on a recommendation for a merchant.
*/
await gapi.client.content.recommendations.reportInteraction({
  merchantId: 'merchantId',
});

/*
Updates regional inventory for multiple products or regions in a single request.
*/
await gapi.client.content.regionalinventory.custombatch({});

/*
Updates the regional inventory of a product in your Merchant Center account. If a regional inventory with the same region ID already exists, this method updates that entry.
*/
await gapi.client.content.regionalinventory.insert({
  merchantId: 'merchantId',
  productId: 'productId',
});

/*
Creates a region definition in your Merchant Center account.
*/
await gapi.client.content.regions.create({merchantId: 'merchantId'});

/*
Deletes a region definition from your Merchant Center account.
*/
await gapi.client.content.regions.delete({
  merchantId: 'merchantId',
  regionId: 'regionId',
});

/*
Retrieves a region defined in your Merchant Center account.
*/
await gapi.client.content.regions.get({
  merchantId: 'merchantId',
  regionId: 'regionId',
});

/*
Lists the regions in your Merchant Center account.
*/
await gapi.client.content.regions.list({merchantId: 'merchantId'});

/*
Updates a region definition in your Merchant Center account.
*/
await gapi.client.content.regions.patch({
  merchantId: 'merchantId',
  regionId: 'regionId',
});

/*
Retrieves merchant performance metrics matching the search query and optionally segmented by selected dimensions.
*/
await gapi.client.content.reports.search({merchantId: 'merchantId'});

/*
Batches multiple return address related calls in a single request.
*/
await gapi.client.content.returnaddress.custombatch({});

/*
Deletes a return address for the given Merchant Center account.
*/
await gapi.client.content.returnaddress.delete({
  merchantId: 'merchantId',
  returnAddressId: 'returnAddressId',
});

/*
Gets a return address of the Merchant Center account.
*/
await gapi.client.content.returnaddress.get({
  merchantId: 'merchantId',
  returnAddressId: 'returnAddressId',
});

/*
Inserts a return address for the Merchant Center account.
*/
await gapi.client.content.returnaddress.insert({merchantId: 'merchantId'});

/*
Lists the return addresses of the Merchant Center account.
*/
await gapi.client.content.returnaddress.list({merchantId: 'merchantId'});

/*
Batches multiple return policy related calls in a single request.
*/
await gapi.client.content.returnpolicy.custombatch({});

/*
Deletes a return policy for the given Merchant Center account.
*/
await gapi.client.content.returnpolicy.delete({
  merchantId: 'merchantId',
  returnPolicyId: 'returnPolicyId',
});

/*
Gets a return policy of the Merchant Center account.
*/
await gapi.client.content.returnpolicy.get({
  merchantId: 'merchantId',
  returnPolicyId: 'returnPolicyId',
});

/*
Inserts a return policy for the Merchant Center account.
*/
await gapi.client.content.returnpolicy.insert({merchantId: 'merchantId'});

/*
Lists the return policies of the Merchant Center account.
*/
await gapi.client.content.returnpolicy.list({merchantId: 'merchantId'});

/*
Creates a new return policy.
*/
await gapi.client.content.returnpolicyonline.create({merchantId: 'merchantId'});

/*
Deletes an existing return policy.
*/
await gapi.client.content.returnpolicyonline.delete({
  merchantId: 'merchantId',
  returnPolicyId: 'returnPolicyId',
});

/*
Gets an existing return policy.
*/
await gapi.client.content.returnpolicyonline.get({
  merchantId: 'merchantId',
  returnPolicyId: 'returnPolicyId',
});

/*
Lists all existing return policies.
*/
await gapi.client.content.returnpolicyonline.list({merchantId: 'merchantId'});

/*
Updates an existing return policy.
*/
await gapi.client.content.returnpolicyonline.patch({
  merchantId: 'merchantId',
  returnPolicyId: 'returnPolicyId',
});

/*
Retrieves and updates the shipping settings of multiple accounts in a single request.
*/
await gapi.client.content.shippingsettings.custombatch({});

/*
Retrieves the shipping settings of the account.
*/
await gapi.client.content.shippingsettings.get({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Retrieves supported carriers and carrier services for an account.
*/
await gapi.client.content.shippingsettings.getsupportedcarriers({
  merchantId: 'merchantId',
});

/*
Retrieves supported holidays for an account.
*/
await gapi.client.content.shippingsettings.getsupportedholidays({
  merchantId: 'merchantId',
});

/*
Retrieves supported pickup services for an account.
*/
await gapi.client.content.shippingsettings.getsupportedpickupservices({
  merchantId: 'merchantId',
});

/*
Lists the shipping settings of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.shippingsettings.list({merchantId: 'merchantId'});

/*
Updates the shipping settings of the account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.shippingsettings.update({
  accountId: 'accountId',
  merchantId: 'merchantId',
});

/*
Retrieves the status and review eligibility for the Shopping Ads program. Returns errors and warnings if they require action to resolve, will become disapprovals, or impact impressions. Use `accountstatuses` to view all issues for an account.
*/
await gapi.client.content.shoppingadsprogram.get({merchantId: 'merchantId'});

/*
Requests a review of Shopping ads in a specific region. This method deprecated. Use the `MerchantSupportService` to view product and account issues and request a review.
*/
await gapi.client.content.shoppingadsprogram.requestreview({
  merchantId: 'merchantId',
});
```
