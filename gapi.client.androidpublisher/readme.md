# TypeScript typings for Google Play Developer API v3

Accesses Android application developers' Google Play accounts.
For detailed description please check [documentation](https://developers.google.com/android-publisher).

## Installing

Install typings for Google Play Developer API:

```
npm install @types/gapi.client.androidpublisher@v3 --save-dev
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
gapi.client.load('androidpublisher', 'v3', () => {
  // now we can use gapi.client.androidpublisher
  // ...
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Google Play Developer API resources:

```typescript

/*
Commits/applies the changes made in this edit back to the app.
*/
await gapi.client.edits.commit({ editId: "editId", packageName: "packageName",  });

/*
Deletes an edit for an app. Creating a new edit will automatically delete any of your previous edits so this method need only be called if you want to preemptively abandon an edit.
*/
await gapi.client.edits.delete({ editId: "editId", packageName: "packageName",  });

/*
Returns information about the edit specified. Calls will fail if the edit is no long active (e.g. has been deleted, superseded or expired).
*/
await gapi.client.edits.get({ editId: "editId", packageName: "packageName",  });

/*
Creates a new edit for an app, populated with the app's current state.
*/
await gapi.client.edits.insert({ packageName: "packageName",  });

/*
Checks that the edit can be successfully committed. The edit's changes are not applied to the live app.
*/
await gapi.client.edits.validate({ editId: "editId", packageName: "packageName",  });

/*
Delete an in-app product for an app.
*/
await gapi.client.inappproducts.delete({ packageName: "packageName", sku: "sku",  });

/*
Returns information about the in-app product specified.
*/
await gapi.client.inappproducts.get({ packageName: "packageName", sku: "sku",  });

/*
Creates a new in-app product for an app.
*/
await gapi.client.inappproducts.insert({ packageName: "packageName",  });

/*
List all the in-app products for an Android app, both subscriptions and managed in-app products..
*/
await gapi.client.inappproducts.list({ packageName: "packageName",  });

/*
Updates the details of an in-app product. This method supports patch semantics.
*/
await gapi.client.inappproducts.patch({ packageName: "packageName", sku: "sku",  });

/*
Updates the details of an in-app product.
*/
await gapi.client.inappproducts.update({ packageName: "packageName", sku: "sku",  });

/*
Uploads an APK to internal app sharing. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See: https://developers.google.com/api-client-library/java/google-api-java-client/errors for an example in java.
*/
await gapi.client.internalappsharingartifacts.uploadapk({ packageName: "packageName",  });

/*
Uploads an app bundle to internal app sharing. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See: https://developers.google.com/api-client-library/java/google-api-java-client/errors for an example in java.
*/
await gapi.client.internalappsharingartifacts.uploadbundle({ packageName: "packageName",  });

/*
Refund a user's subscription or in-app purchase order.
*/
await gapi.client.orders.refund({ orderId: "orderId", packageName: "packageName",  });

/*
Returns a single review.
*/
await gapi.client.reviews.get({ packageName: "packageName", reviewId: "reviewId",  });

/*
Returns a list of reviews. Only reviews from last week will be returned.
*/
await gapi.client.reviews.list({ packageName: "packageName",  });

/*
Reply to a single review, or update an existing reply.
*/
await gapi.client.reviews.reply({ packageName: "packageName", reviewId: "reviewId",  });
```
