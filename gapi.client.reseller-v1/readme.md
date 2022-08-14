# TypeScript typings for Google Workspace Reseller API v1

Perform common functions that are available on the Channel Services console at scale, like placing orders and viewing customer information
For detailed description please check [documentation](https://developers.google.com/google-apps/reseller/).

## Installing

Install typings for Google Workspace Reseller API:

```
npm install @types/gapi.client.reseller-v1 --save-dev
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
gapi.client.load('https://reseller.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.reseller
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('reseller', 'v1', () => {
  // now we can use:
  // gapi.client.reseller
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Manage users on your domain
      'https://www.googleapis.com/auth/apps.order',

      // Manage users on your domain
      'https://www.googleapis.com/auth/apps.order.readonly',
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

After that you can use Google Workspace Reseller API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets a customer account. Use this operation to see a customer account already in your reseller management, or to see the minimal account information for an existing customer that you do not manage. For more information about the API response for existing customers, see [retrieving a customer account](/admin-sdk/reseller/v1/how-tos/manage_customers#get_customer).
*/
await gapi.client.reseller.customers.get({ customerId: "customerId",  });

/*
Orders a new customer's account. Before ordering a new customer account, establish whether the customer account already exists using the [`customers.get`](/admin-sdk/reseller/v1/reference/customers/get) If the customer account exists as a direct Google account or as a resold customer account from another reseller, use the `customerAuthToken\` as described in [order a resold account for an existing customer](/admin-sdk/reseller/v1/how-tos/manage_customers#create_existing_customer). For more information about ordering a new customer account, see [order a new customer account](/admin-sdk/reseller/v1/how-tos/manage_customers#create_customer). After creating a new customer account, you must provision a user as an administrator. The customer's administrator is required to sign in to the Admin console and sign the G Suite via Reseller agreement to activate the account. Resellers are prohibited from signing the G Suite via Reseller agreement on the customer's behalf. For more information, see [order a new customer account](/admin-sdk/reseller/v1/how-tos/manage_customers#tos).
*/
await gapi.client.reseller.customers.insert({  });

/*
Updates a customer account's settings. This method supports patch semantics. You cannot update `customerType` via the Reseller API, but a `"team"` customer can verify their domain and become `customerType = "domain"`. For more information, see [Verify your domain to unlock Essentials features](https://support.google.com/a/answer/9122284).
*/
await gapi.client.reseller.customers.patch({ customerId: "customerId",  });

/*
Updates a customer account's settings. You cannot update `customerType` via the Reseller API, but a `"team"` customer can verify their domain and become `customerType = "domain"`. For more information, see [update a customer's settings](/admin-sdk/reseller/v1/how-tos/manage_customers#update_customer).
*/
await gapi.client.reseller.customers.update({ customerId: "customerId",  });

/*
Returns all the details of the watch corresponding to the reseller.
*/
await gapi.client.reseller.resellernotify.getwatchdetails({  });

/*
Registers a Reseller for receiving notifications.
*/
await gapi.client.reseller.resellernotify.register({  });

/*
Unregisters a Reseller for receiving notifications.
*/
await gapi.client.reseller.resellernotify.unregister({  });

/*
Activates a subscription previously suspended by the reseller. If you did not suspend the customer subscription and it is suspended for any other reason, such as for abuse or a pending ToS acceptance, this call will not reactivate the customer subscription.
*/
await gapi.client.reseller.subscriptions.activate({ customerId: "customerId", subscriptionId: "subscriptionId",  });

/*
Updates a subscription plan. Use this method to update a plan for a 30-day trial or a flexible plan subscription to an annual commitment plan with monthly or yearly payments. How a plan is updated differs depending on the plan and the products. For more information, see the description in [manage subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_subscription_plan).
*/
await gapi.client.reseller.subscriptions.changePlan({ customerId: "customerId", subscriptionId: "subscriptionId",  });

/*
Updates a user license's renewal settings. This is applicable for accounts with annual commitment plans only. For more information, see the description in [manage subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_renewal).
*/
await gapi.client.reseller.subscriptions.changeRenewalSettings({ customerId: "customerId", subscriptionId: "subscriptionId",  });

/*
Updates a subscription's user license settings. For more information about updating an annual commitment plan or a flexible plan subscription’s licenses, see [Manage Subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_subscription_seat).
*/
await gapi.client.reseller.subscriptions.changeSeats({ customerId: "customerId", subscriptionId: "subscriptionId",  });

/*
Cancels, suspends, or transfers a subscription to direct.
*/
await gapi.client.reseller.subscriptions.delete({ customerId: "customerId", deletionType: "deletionType", subscriptionId: "subscriptionId",  });

/*
Gets a specific subscription. The `subscriptionId` can be found using the [Retrieve all reseller subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#get_all_subscriptions) method. For more information about retrieving a specific subscription, see the information descrived in [manage subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#get_subscription).
*/
await gapi.client.reseller.subscriptions.get({ customerId: "customerId", subscriptionId: "subscriptionId",  });

/*
Creates or transfer a subscription. Create a subscription for a customer's account that you ordered using the [Order a new customer account](/admin-sdk/reseller/v1/reference/customers/insert.html) method. For more information about creating a subscription for different payment plans, see [manage subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#create_subscription).\ If you did not order the customer's account using the customer insert method, use the customer's `customerAuthToken` when creating a subscription for that customer. If transferring a G Suite subscription with an associated Google Drive or Google Vault subscription, use the [batch operation](/admin-sdk/reseller/v1/how-tos/batch.html) to transfer all of these subscriptions. For more information, see how to [transfer subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#transfer_a_subscription).
*/
await gapi.client.reseller.subscriptions.insert({ customerId: "customerId",  });

/*
Lists of subscriptions managed by the reseller. The list can be all subscriptions, all of a customer's subscriptions, or all of a customer's transferable subscriptions. Optionally, this method can filter the response by a `customerNamePrefix`. For more information, see [manage subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions).
*/
await gapi.client.reseller.subscriptions.list({  });

/*
Immediately move a 30-day free trial subscription to a paid service subscription. This method is only applicable if a payment plan has already been set up for the 30-day trial subscription. For more information, see [manage subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#paid_service).
*/
await gapi.client.reseller.subscriptions.startPaidService({ customerId: "customerId", subscriptionId: "subscriptionId",  });

/*
Suspends an active subscription. You can use this method to suspend a paid subscription that is currently in the `ACTIVE` state. * For `FLEXIBLE` subscriptions, billing is paused. * For `ANNUAL_MONTHLY_PAY` or `ANNUAL_YEARLY_PAY` subscriptions: * Suspending the subscription does not change the renewal date that was originally committed to. * A suspended subscription does not renew. If you activate the subscription after the original renewal date, a new annual subscription will be created, starting on the day of activation. We strongly encourage you to suspend subscriptions only for short periods of time as suspensions over 60 days may result in the subscription being cancelled.
*/
await gapi.client.reseller.subscriptions.suspend({ customerId: "customerId", subscriptionId: "subscriptionId",  });
```
