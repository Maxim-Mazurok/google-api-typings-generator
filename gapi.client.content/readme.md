# TypeScript typings for Content API for Shopping v2.1

Manages product items, inventory, and Merchant Center accounts for Google Shopping.
For detailed description please check [documentation](https://developers.google.com/shopping-content).

## Installing

Install typings for Content API for Shopping:

```
npm install @types/gapi.client.content@v2.1 --save-dev
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
gapi.client.load('content', 'v2.1', () => {
  // now we can use gapi.client.content
  // ...
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Content API for Shopping resources:

```typescript

/*
Returns information about the authenticated user.
*/
await gapi.client.content.accounts.authinfo({  });

/*
Claims the website of a Merchant Center sub-account.
*/
await gapi.client.content.accounts.claimwebsite({ accountId: "accountId", merchantId: "merchantId",  });

/*
Retrieves, inserts, updates, and deletes multiple Merchant Center (sub-)accounts in a single request.
*/
await gapi.client.content.accounts.custombatch({  });

/*
Deletes a Merchant Center sub-account.
*/
await gapi.client.content.accounts.delete({ accountId: "accountId", merchantId: "merchantId",  });

/*
Retrieves a Merchant Center account.
*/
await gapi.client.content.accounts.get({ accountId: "accountId", merchantId: "merchantId",  });

/*
Creates a Merchant Center sub-account.
*/
await gapi.client.content.accounts.insert({ merchantId: "merchantId",  });

/*
Performs an action on a link between two Merchant Center accounts, namely accountId and linkedAccountId.
*/
await gapi.client.content.accounts.link({ accountId: "accountId", merchantId: "merchantId",  });

/*
Lists the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.accounts.list({ merchantId: "merchantId",  });

/*
Returns the list of accounts linked to your Merchant Center account.
*/
await gapi.client.content.accounts.listlinks({ accountId: "accountId", merchantId: "merchantId",  });

/*
Updates a Merchant Center account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.accounts.update({ accountId: "accountId", merchantId: "merchantId",  });

/*
Updates labels that are assigned to the Merchant Center account by CSS user.
*/
await gapi.client.content.accounts.updatelabels({ accountId: "accountId", merchantId: "merchantId",  });

/*
Retrieves multiple Merchant Center account statuses in a single request.
*/
await gapi.client.content.accountstatuses.custombatch({  });

/*
Retrieves the status of a Merchant Center account. No itemLevelIssues are returned for multi-client accounts.
*/
await gapi.client.content.accountstatuses.get({ accountId: "accountId", merchantId: "merchantId",  });

/*
Lists the statuses of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.accountstatuses.list({ merchantId: "merchantId",  });

/*
Retrieves and updates tax settings of multiple accounts in a single request.
*/
await gapi.client.content.accounttax.custombatch({  });

/*
Retrieves the tax settings of the account.
*/
await gapi.client.content.accounttax.get({ accountId: "accountId", merchantId: "merchantId",  });

/*
Lists the tax settings of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.accounttax.list({ merchantId: "merchantId",  });

/*
Updates the tax settings of the account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.accounttax.update({ accountId: "accountId", merchantId: "merchantId",  });

/*
Deletes, fetches, gets, inserts and updates multiple datafeeds in a single request.
*/
await gapi.client.content.datafeeds.custombatch({  });

/*
Deletes a datafeed configuration from your Merchant Center account.
*/
await gapi.client.content.datafeeds.delete({ datafeedId: "datafeedId", merchantId: "merchantId",  });

/*
Invokes a fetch for the datafeed in your Merchant Center account.
*/
await gapi.client.content.datafeeds.fetchnow({ datafeedId: "datafeedId", merchantId: "merchantId",  });

/*
Retrieves a datafeed configuration from your Merchant Center account.
*/
await gapi.client.content.datafeeds.get({ datafeedId: "datafeedId", merchantId: "merchantId",  });

/*
Registers a datafeed configuration with your Merchant Center account.
*/
await gapi.client.content.datafeeds.insert({ merchantId: "merchantId",  });

/*
Lists the configurations for datafeeds in your Merchant Center account.
*/
await gapi.client.content.datafeeds.list({ merchantId: "merchantId",  });

/*
Updates a datafeed configuration of your Merchant Center account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.datafeeds.update({ datafeedId: "datafeedId", merchantId: "merchantId",  });

/*
Gets multiple Merchant Center datafeed statuses in a single request.
*/
await gapi.client.content.datafeedstatuses.custombatch({  });

/*
Retrieves the status of a datafeed from your Merchant Center account.
*/
await gapi.client.content.datafeedstatuses.get({ datafeedId: "datafeedId", merchantId: "merchantId",  });

/*
Lists the statuses of the datafeeds in your Merchant Center account.
*/
await gapi.client.content.datafeedstatuses.list({ merchantId: "merchantId",  });

/*
Retrieves and/or updates the LIA settings of multiple accounts in a single request.
*/
await gapi.client.content.liasettings.custombatch({  });

/*
Retrieves the LIA settings of the account.
*/
await gapi.client.content.liasettings.get({ accountId: "accountId", merchantId: "merchantId",  });

/*
Retrieves the list of accessible Google My Business accounts.
*/
await gapi.client.content.liasettings.getaccessiblegmbaccounts({ accountId: "accountId", merchantId: "merchantId",  });

/*
Lists the LIA settings of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.liasettings.list({ merchantId: "merchantId",  });

/*
Retrieves the list of POS data providers that have active settings for the all eiligible countries.
*/
await gapi.client.content.liasettings.listposdataproviders({  });

/*
Requests access to a specified Google My Business account.
*/
await gapi.client.content.liasettings.requestgmbaccess({ accountId: "accountId", gmbEmail: "gmbEmail", merchantId: "merchantId",  });

/*
Requests inventory validation for the specified country.
*/
await gapi.client.content.liasettings.requestinventoryverification({ accountId: "accountId", country: "country", merchantId: "merchantId",  });

/*
Sets the inventory verification contract for the specified country.
*/
await gapi.client.content.liasettings.setinventoryverificationcontact({ accountId: "accountId", contactEmail: "contactEmail", contactName: "contactName", country: "country", language: "language", merchantId: "merchantId",  });

/*
Sets the POS data provider for the specified country.
*/
await gapi.client.content.liasettings.setposdataprovider({ accountId: "accountId", country: "country", merchantId: "merchantId",  });

/*
Updates the LIA settings of the account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.liasettings.update({ accountId: "accountId", merchantId: "merchantId",  });

/*
Updates local inventory for multiple products or stores in a single request.
*/
await gapi.client.content.localinventory.custombatch({  });

/*
Update the local inventory of a product in your Merchant Center account.
*/
await gapi.client.content.localinventory.insert({ merchantId: "merchantId", productId: "productId",  });

/*
Creates a charge invoice for a shipment group, and triggers a charge capture for orderinvoice enabled orders.
*/
await gapi.client.content.orderinvoices.createchargeinvoice({ merchantId: "merchantId", orderId: "orderId",  });

/*
Creates a refund invoice for one or more shipment groups, and triggers a refund for orderinvoice enabled orders. This can only be used for line items that have previously been charged using `createChargeInvoice`. All amounts (except for the summary) are incremental with respect to the previous invoice.
*/
await gapi.client.content.orderinvoices.createrefundinvoice({ merchantId: "merchantId", orderId: "orderId",  });

/*
Retrieves a report for disbursements from your Merchant Center account.
*/
await gapi.client.content.orderreports.listdisbursements({ disbursementStartDate: "disbursementStartDate", merchantId: "merchantId",  });

/*
Retrieves a list of transactions for a disbursement from your Merchant Center account.
*/
await gapi.client.content.orderreports.listtransactions({ disbursementId: "disbursementId", merchantId: "merchantId", transactionStartDate: "transactionStartDate",  });

/*
Acks an order return in your Merchant Center account.
*/
await gapi.client.content.orderreturns.acknowledge({ merchantId: "merchantId", returnId: "returnId",  });

/*
Retrieves an order return from your Merchant Center account.
*/
await gapi.client.content.orderreturns.get({ merchantId: "merchantId", returnId: "returnId",  });

/*
Lists order returns in your Merchant Center account.
*/
await gapi.client.content.orderreturns.list({ merchantId: "merchantId",  });

/*
Processes return in your Merchant Center account.
*/
await gapi.client.content.orderreturns.process({ merchantId: "merchantId", returnId: "returnId",  });

/*
Marks an order as acknowledged.
*/
await gapi.client.content.orders.acknowledge({ merchantId: "merchantId", orderId: "orderId",  });

/*
Sandbox only. Moves a test order from state "`inProgress`" to state "`pendingShipment`".
*/
await gapi.client.content.orders.advancetestorder({ merchantId: "merchantId", orderId: "orderId",  });

/*
Cancels all line items in an order, making a full refund.
*/
await gapi.client.content.orders.cancel({ merchantId: "merchantId", orderId: "orderId",  });

/*
Cancels a line item, making a full refund.
*/
await gapi.client.content.orders.cancellineitem({ merchantId: "merchantId", orderId: "orderId",  });

/*
Sandbox only. Cancels a test order for customer-initiated cancellation.
*/
await gapi.client.content.orders.canceltestorderbycustomer({ merchantId: "merchantId", orderId: "orderId",  });

/*
Sandbox only. Creates a test order.
*/
await gapi.client.content.orders.createtestorder({ merchantId: "merchantId",  });

/*
Sandbox only. Creates a test return.
*/
await gapi.client.content.orders.createtestreturn({ merchantId: "merchantId", orderId: "orderId",  });

/*
Retrieves an order from your Merchant Center account.
*/
await gapi.client.content.orders.get({ merchantId: "merchantId", orderId: "orderId",  });

/*
Retrieves an order using merchant order ID.
*/
await gapi.client.content.orders.getbymerchantorderid({ merchantId: "merchantId", merchantOrderId: "merchantOrderId",  });

/*
Sandbox only. Retrieves an order template that can be used to quickly create a new order in sandbox.
*/
await gapi.client.content.orders.gettestordertemplate({ merchantId: "merchantId", templateName: "templateName",  });

/*
Deprecated. Notifies that item return and refund was handled directly by merchant outside of Google payments processing (e.g. cash refund done in store).
Note: We recommend calling the returnrefundlineitem method to refund in-store returns. We will issue the refund directly to the customer. This helps to prevent possible differences arising between merchant and Google transaction records. We also recommend having the point of sale system communicate with Google to ensure that customers do not receive a double refund by first refunding via Google then via an in-store return.
*/
await gapi.client.content.orders.instorerefundlineitem({ merchantId: "merchantId", orderId: "orderId",  });

/*
Lists the orders in your Merchant Center account.
*/
await gapi.client.content.orders.list({ merchantId: "merchantId",  });

/*
Issues a partial or total refund for items and shipment.
*/
await gapi.client.content.orders.refunditem({ merchantId: "merchantId", orderId: "orderId",  });

/*
Issues a partial or total refund for an order.
*/
await gapi.client.content.orders.refundorder({ merchantId: "merchantId", orderId: "orderId",  });

/*
Rejects return on an line item.
*/
await gapi.client.content.orders.rejectreturnlineitem({ merchantId: "merchantId", orderId: "orderId",  });

/*
Returns and refunds a line item. Note that this method can only be called on fully shipped orders. Please also note that the Orderreturns API is the preferred way to handle returns after you receive a return from a customer. You can use Orderreturns.list or Orderreturns.get to search for the return, and then use Orderreturns.processreturn to issue the refund. If the return cannot be found, then we recommend using this API to issue a refund.
*/
await gapi.client.content.orders.returnrefundlineitem({ merchantId: "merchantId", orderId: "orderId",  });

/*
Sets (or overrides if it already exists) merchant provided annotations in the form of key-value pairs. A common use case would be to supply us with additional structured information about a line item that cannot be provided via other methods. Submitted key-value pairs can be retrieved as part of the orders resource.
*/
await gapi.client.content.orders.setlineitemmetadata({ merchantId: "merchantId", orderId: "orderId",  });

/*
Marks line item(s) as shipped.
*/
await gapi.client.content.orders.shiplineitems({ merchantId: "merchantId", orderId: "orderId",  });

/*
Updates ship by and delivery by dates for a line item.
*/
await gapi.client.content.orders.updatelineitemshippingdetails({ merchantId: "merchantId", orderId: "orderId",  });

/*
Updates the merchant order ID for a given order.
*/
await gapi.client.content.orders.updatemerchantorderid({ merchantId: "merchantId", orderId: "orderId",  });

/*
Updates a shipment's status, carrier, and/or tracking ID.
*/
await gapi.client.content.orders.updateshipment({ merchantId: "merchantId", orderId: "orderId",  });

/*
Batches multiple POS-related calls in a single request.
*/
await gapi.client.content.pos.custombatch({  });

/*
Deletes a store for the given merchant.
*/
await gapi.client.content.pos.delete({ merchantId: "merchantId", storeCode: "storeCode", targetMerchantId: "targetMerchantId",  });

/*
Retrieves information about the given store.
*/
await gapi.client.content.pos.get({ merchantId: "merchantId", storeCode: "storeCode", targetMerchantId: "targetMerchantId",  });

/*
Creates a store for the given merchant.
*/
await gapi.client.content.pos.insert({ merchantId: "merchantId", targetMerchantId: "targetMerchantId",  });

/*
Submit inventory for the given merchant.
*/
await gapi.client.content.pos.inventory({ merchantId: "merchantId", targetMerchantId: "targetMerchantId",  });

/*
Lists the stores of the target merchant.
*/
await gapi.client.content.pos.list({ merchantId: "merchantId", targetMerchantId: "targetMerchantId",  });

/*
Submit a sale event for the given merchant.
*/
await gapi.client.content.pos.sale({ merchantId: "merchantId", targetMerchantId: "targetMerchantId",  });

/*
Retrieves, inserts, and deletes multiple products in a single request.
*/
await gapi.client.content.products.custombatch({  });

/*
Deletes a product from your Merchant Center account.
*/
await gapi.client.content.products.delete({ merchantId: "merchantId", productId: "productId",  });

/*
Retrieves a product from your Merchant Center account.
*/
await gapi.client.content.products.get({ merchantId: "merchantId", productId: "productId",  });

/*
Uploads a product to your Merchant Center account. If an item with the same channel, contentLanguage, offerId, and targetCountry already exists, this method updates that entry.
*/
await gapi.client.content.products.insert({ merchantId: "merchantId",  });

/*
Lists the products in your Merchant Center account. The response might contain fewer items than specified by maxResults. Rely on nextPageToken to determine if there are more items to be requested.
*/
await gapi.client.content.products.list({ merchantId: "merchantId",  });

/*
Gets the statuses of multiple products in a single request.
*/
await gapi.client.content.productstatuses.custombatch({  });

/*
Gets the status of a product from your Merchant Center account.
*/
await gapi.client.content.productstatuses.get({ merchantId: "merchantId", productId: "productId",  });

/*
Lists the statuses of the products in your Merchant Center account.
*/
await gapi.client.content.productstatuses.list({ merchantId: "merchantId",  });

/*
Retrieves a Merchant Center account's pubsub notification settings.
*/
await gapi.client.content.pubsubnotificationsettings.get({ merchantId: "merchantId",  });

/*
Register a Merchant Center account for pubsub notifications. Note that cloud topic name should not be provided as part of the request.
*/
await gapi.client.content.pubsubnotificationsettings.update({ merchantId: "merchantId",  });

/*
Updates regional inventory for multiple products or regions in a single request.
*/
await gapi.client.content.regionalinventory.custombatch({  });

/*
Update the regional inventory of a product in your Merchant Center account. If a regional inventory with the same region ID already exists, this method updates that entry.
*/
await gapi.client.content.regionalinventory.insert({ merchantId: "merchantId", productId: "productId",  });

/*
Batches multiple return address related calls in a single request.
*/
await gapi.client.content.returnaddress.custombatch({  });

/*
Deletes a return address for the given Merchant Center account.
*/
await gapi.client.content.returnaddress.delete({ merchantId: "merchantId", returnAddressId: "returnAddressId",  });

/*
Gets a return address of the Merchant Center account.
*/
await gapi.client.content.returnaddress.get({ merchantId: "merchantId", returnAddressId: "returnAddressId",  });

/*
Inserts a return address for the Merchant Center account.
*/
await gapi.client.content.returnaddress.insert({ merchantId: "merchantId",  });

/*
Lists the return addresses of the Merchant Center account.
*/
await gapi.client.content.returnaddress.list({ merchantId: "merchantId",  });

/*
Batches multiple return policy related calls in a single request.
*/
await gapi.client.content.returnpolicy.custombatch({  });

/*
Deletes a return policy for the given Merchant Center account.
*/
await gapi.client.content.returnpolicy.delete({ merchantId: "merchantId", returnPolicyId: "returnPolicyId",  });

/*
Gets a return policy of the Merchant Center account.
*/
await gapi.client.content.returnpolicy.get({ merchantId: "merchantId", returnPolicyId: "returnPolicyId",  });

/*
Inserts a return policy for the Merchant Center account.
*/
await gapi.client.content.returnpolicy.insert({ merchantId: "merchantId",  });

/*
Lists the return policies of the Merchant Center account.
*/
await gapi.client.content.returnpolicy.list({ merchantId: "merchantId",  });

/*
Retrieves a settlement report from your Merchant Center account.
*/
await gapi.client.content.settlementreports.get({ merchantId: "merchantId", settlementId: "settlementId",  });

/*
Retrieves a list of settlement reports from your Merchant Center account.
*/
await gapi.client.content.settlementreports.list({ merchantId: "merchantId",  });

/*
Retrieves a list of transactions for the settlement.
*/
await gapi.client.content.settlementtransactions.list({ merchantId: "merchantId", settlementId: "settlementId",  });

/*
Retrieves and updates the shipping settings of multiple accounts in a single request.
*/
await gapi.client.content.shippingsettings.custombatch({  });

/*
Retrieves the shipping settings of the account.
*/
await gapi.client.content.shippingsettings.get({ accountId: "accountId", merchantId: "merchantId",  });

/*
Retrieves supported carriers and carrier services for an account.
*/
await gapi.client.content.shippingsettings.getsupportedcarriers({ merchantId: "merchantId",  });

/*
Retrieves supported holidays for an account.
*/
await gapi.client.content.shippingsettings.getsupportedholidays({ merchantId: "merchantId",  });

/*
Retrieves supported pickup services for an account.
*/
await gapi.client.content.shippingsettings.getsupportedpickupservices({ merchantId: "merchantId",  });

/*
Lists the shipping settings of the sub-accounts in your Merchant Center account.
*/
await gapi.client.content.shippingsettings.list({ merchantId: "merchantId",  });

/*
Updates the shipping settings of the account. Any fields that are not provided are deleted from the resource.
*/
await gapi.client.content.shippingsettings.update({ accountId: "accountId", merchantId: "merchantId",  });
```
