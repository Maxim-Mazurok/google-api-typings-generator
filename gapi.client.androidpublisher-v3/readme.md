# TypeScript typings for Google Play Android Developer API v3

Lets Android application developers access their Google Play accounts. At a high level, the expected workflow is to "insert" an Edit, make changes as necessary, and then "commit" it.
For detailed description please check [documentation](https://developers.google.com/android-publisher).

## Installing

Install typings for Google Play Android Developer API:

```
npm install @types/gapi.client.androidpublisher-v3 --save-dev
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
  'https://androidpublisher.googleapis.com/$discovery/rest?version=v3',
  () => {
    // now we can use:
    // gapi.client.androidpublisher
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('androidpublisher', 'v3', () => {
  // now we can use:
  // gapi.client.androidpublisher
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your Google Play Developer account
    'https://www.googleapis.com/auth/androidpublisher',
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

After that you can use Google Play Android Developer API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Writes the Safety Labels declaration of an app.
*/
await gapi.client.androidpublisher.applications.dataSafety({
  packageName: 'packageName',
});

/*
Incrementally update targeting for a recovery action. Note that only the criteria selected during the creation of recovery action can be expanded.
*/
await gapi.client.androidpublisher.apprecovery.addTargeting({
  appRecoveryId: 'appRecoveryId',
  packageName: 'packageName',
});

/*
List all app recovery action resources associated with a particular package name and app version.
*/
await gapi.client.androidpublisher.apprecovery.appRecoveries({
  packageName: 'packageName',
});

/*
Cancel an already executing app recovery action. Note that this action changes status of the recovery action to CANCELED.
*/
await gapi.client.androidpublisher.apprecovery.cancel({
  appRecoveryId: 'appRecoveryId',
  packageName: 'packageName',
});

/*
Create an app recovery action with recovery status as DRAFT. Note that this action does not execute the recovery action.
*/
await gapi.client.androidpublisher.apprecovery.create({
  packageName: 'packageName',
});

/*
Deploy an already created app recovery action with recovery status DRAFT. Note that this action activates the recovery action for all targeted users and changes its status to ACTIVE.
*/
await gapi.client.androidpublisher.apprecovery.deploy({
  appRecoveryId: 'appRecoveryId',
  packageName: 'packageName',
});

/*
Commits an app edit.
*/
await gapi.client.androidpublisher.edits.commit({
  editId: 'editId',
  packageName: 'packageName',
});

/*
Deletes an app edit.
*/
await gapi.client.androidpublisher.edits.delete({
  editId: 'editId',
  packageName: 'packageName',
});

/*
Gets an app edit.
*/
await gapi.client.androidpublisher.edits.get({
  editId: 'editId',
  packageName: 'packageName',
});

/*
Creates a new edit for an app.
*/
await gapi.client.androidpublisher.edits.insert({packageName: 'packageName'});

/*
Validates an app edit.
*/
await gapi.client.androidpublisher.edits.validate({
  editId: 'editId',
  packageName: 'packageName',
});

/*
Creates a new external transaction.
*/
await gapi.client.androidpublisher.externaltransactions.createexternaltransaction(
  {parent: 'parent'}
);

/*
Gets an existing external transaction.
*/
await gapi.client.androidpublisher.externaltransactions.getexternaltransaction({
  name: 'name',
});

/*
Refunds or partially refunds an existing external transaction.
*/
await gapi.client.androidpublisher.externaltransactions.refundexternaltransaction(
  {name: 'name'}
);

/*
Downloads a single signed APK generated from an app bundle.
*/
await gapi.client.androidpublisher.generatedapks.download({
  downloadId: 'downloadId',
  packageName: 'packageName',
  versionCode: 1,
});

/*
Returns download metadata for all APKs that were generated from a given app bundle.
*/
await gapi.client.androidpublisher.generatedapks.list({
  packageName: 'packageName',
  versionCode: 1,
});

/*
Grant access for a user to the given package.
*/
await gapi.client.androidpublisher.grants.create({parent: 'parent'});

/*
Removes all access for the user to the given package or developer account.
*/
await gapi.client.androidpublisher.grants.delete({name: 'name'});

/*
Updates access for the user to the given package.
*/
await gapi.client.androidpublisher.grants.patch({name: 'name'});

/*
Deletes in-app products (managed products or subscriptions). Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. This method should not be used to delete subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.batchDelete({
  packageName: 'packageName',
});

/*
Reads multiple in-app products, which can be managed products or subscriptions. This method should not be used to retrieve subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.batchGet({
  packageName: 'packageName',
});

/*
Updates or inserts one or more in-app products (managed products or subscriptions). Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. This method should no longer be used to update subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.batchUpdate({
  packageName: 'packageName',
});

/*
Deletes an in-app product (a managed product or a subscription). This method should no longer be used to delete subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.delete({
  packageName: 'packageName',
  sku: 'sku',
});

/*
Gets an in-app product, which can be a managed product or a subscription. This method should no longer be used to retrieve subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.get({
  packageName: 'packageName',
  sku: 'sku',
});

/*
Creates an in-app product (a managed product or a subscription). This method should no longer be used to create subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.insert({
  packageName: 'packageName',
});

/*
Lists all in-app products - both managed products and subscriptions. If an app has a large number of in-app products, the response may be paginated. In this case the response field `tokenPagination.nextPageToken` will be set and the caller should provide its value as a `token` request parameter to retrieve the next page. This method should no longer be used to retrieve subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.list({
  packageName: 'packageName',
});

/*
Patches an in-app product (a managed product or a subscription). This method should no longer be used to update subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.patch({
  packageName: 'packageName',
  sku: 'sku',
});

/*
Updates an in-app product (a managed product or a subscription). This method should no longer be used to update subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information.
*/
await gapi.client.androidpublisher.inappproducts.update({
  packageName: 'packageName',
  sku: 'sku',
});

/*
Uploads an APK to internal app sharing. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See [Timeouts and Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors) for an example in java.
*/
await gapi.client.androidpublisher.internalappsharingartifacts.uploadapk({
  packageName: 'packageName',
});

/*
Uploads an app bundle to internal app sharing. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See [Timeouts and Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors) for an example in java.
*/
await gapi.client.androidpublisher.internalappsharingartifacts.uploadbundle({
  packageName: 'packageName',
});

/*
Calculates the region prices, using today's exchange rate and country-specific pricing patterns, based on the price in the request for a set of regions.
*/
await gapi.client.androidpublisher.monetization.convertRegionPrices({
  packageName: 'packageName',
});

/*
Refunds a user's subscription or in-app purchase order. Orders older than 3 years cannot be refunded.
*/
await gapi.client.androidpublisher.orders.refund({
  orderId: 'orderId',
  packageName: 'packageName',
});

/*
Gets a single review.
*/
await gapi.client.androidpublisher.reviews.get({
  packageName: 'packageName',
  reviewId: 'reviewId',
});

/*
Lists all reviews.
*/
await gapi.client.androidpublisher.reviews.list({packageName: 'packageName'});

/*
Replies to a single review, or updates an existing reply.
*/
await gapi.client.androidpublisher.reviews.reply({
  packageName: 'packageName',
  reviewId: 'reviewId',
});

/*
Grant access for a user to the given developer account.
*/
await gapi.client.androidpublisher.users.create({parent: 'parent'});

/*
Removes all access for the user to the given developer account.
*/
await gapi.client.androidpublisher.users.delete({name: 'name'});

/*
Lists all users with access to a developer account.
*/
await gapi.client.androidpublisher.users.list({parent: 'parent'});

/*
Updates access for the user to the developer account.
*/
await gapi.client.androidpublisher.users.patch({name: 'name'});
```