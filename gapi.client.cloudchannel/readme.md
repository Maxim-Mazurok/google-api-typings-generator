# TypeScript typings for Cloud Channel API v1


For detailed description please check [documentation](https://cloud.google.com/channel).

## Installing

Install typings for Cloud Channel API:

```
npm install @types/gapi.client.cloudchannel@v1 --save-dev
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
gapi.client.load('cloudchannel', 'v1', () => {
  // now we can use gapi.client.cloudchannel
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Manage users on your domain
      'https://www.googleapis.com/auth/apps.order',
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

After that you can use Cloud Channel API resources:

```typescript

/*
Confirms the existence of Cloud Identity accounts, based on the domain and whether the Cloud Identity accounts are owned by the reseller. Possible Error Codes: * PERMISSION_DENIED: If the reseller account making the request and the reseller account being queried for are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. * INVALID_VALUE: Invalid domain value in the request. Return Value: List of CloudIdentityCustomerAccount resources for the domain. List may be empty. Note: in the v1alpha1 version of the API, a NOT_FOUND error is returned if no CloudIdentityCustomerAccount resources match the domain.
*/
await gapi.client.cloudchannel.accounts.checkCloudIdentityAccountsExist({ parent: "parent",  });

/*
Lists service accounts with subscriber privileges on the Cloud Pub/Sub topic created for this Channel Services account. Possible Error Codes: * PERMISSION_DENIED: If the reseller account making the request and the reseller account being provided are different, or if the account is not a super admin. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. * NOT_FOUND: If the topic resource doesn't exist. * INTERNAL: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. Return Value: List of service email addresses if successful, otherwise error is returned.
*/
await gapi.client.cloudchannel.accounts.listSubscribers({ account: "account",  });

/*
List TransferableOffers of a customer based on Cloud Identity ID or Customer Name in the request. This method is used when a reseller gets the entitlement information of a customer that is not owned. The reseller should provide the customer's Cloud Identity ID or Customer Name. Possible Error Codes: * PERMISSION_DENIED: Appears because of one of the following: * If the customer doesn't belong to the reseller and no auth token or invalid auth token is supplied. * If the reseller account making the request and the reseller account being queried for are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. Return Value: List of TransferableOffer for the given customer and SKU.
*/
await gapi.client.cloudchannel.accounts.listTransferableOffers({ parent: "parent",  });

/*
List TransferableSkus of a customer based on Cloud Identity ID or Customer Name in the request. This method is used when a reseller lists the entitlements information of a customer that is not owned. The reseller should provide the customer's Cloud Identity ID or Customer Name. Possible Error Codes: * PERMISSION_DENIED: Appears because of one of the following - * The customer doesn't belong to the reseller and no auth token. * The supplied auth token is invalid. * The reseller account making the request and the queries reseller account are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. Return Value: List of TransferableSku for the given customer.
*/
await gapi.client.cloudchannel.accounts.listTransferableSkus({ parent: "parent",  });

/*
Registers a service account with subscriber privileges on the Cloud Pub/Sub topic created for this Channel Services account. Once you create a subscriber, you will get the events as per SubscriberEvent Possible Error Codes: * PERMISSION_DENIED: If the reseller account making the request and the reseller account being provided are different, or if the impersonated user is not a super admin. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. * INTERNAL: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. Return Value: Topic name with service email address registered if successful, otherwise error is returned.
*/
await gapi.client.cloudchannel.accounts.register({ account: "account",  });

/*
Unregisters a service account with subscriber privileges on the Cloud Pub/Sub topic created for this Channel Services account. If there are no more service account left with sunbscriber privileges, the topic will be deleted. You can check this by calling ListSubscribers api. Possible Error Codes: * PERMISSION_DENIED: If the reseller account making the request and the reseller account being provided are different, or if the impersonated user is not a super admin. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. * NOT_FOUND: If the topic resource doesn't exist. * INTERNAL: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. Return Value: Topic name from which service email address has been unregistered if successful, otherwise error is returned. If the service email was already not associated with the topic, the success response will be returned.
*/
await gapi.client.cloudchannel.accounts.unregister({ account: "account",  });

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.cloudchannel.operations.cancel({ name: "name",  });

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.cloudchannel.operations.delete({ name: "name",  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudchannel.operations.get({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/*/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/*}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
*/
await gapi.client.cloudchannel.operations.list({ name: "name",  });

/*
Lists the Products the reseller is authorized to sell. Possible Error Codes: * INVALID_ARGUMENT: Missing or invalid required parameters in the request.
*/
await gapi.client.cloudchannel.products.list({  });
```
