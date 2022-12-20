# TypeScript typings for Cloud Billing API v1beta

Allows developers to manage billing for their Google Cloud Platform projects programmatically.
For detailed description please check [documentation](https://cloud.google.com/billing/).

## Installing

Install typings for Cloud Billing API:

```
npm install @types/gapi.client.cloudbilling-v1beta --save-dev
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
gapi.client.load('https://cloudbilling.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.cloudbilling
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudbilling', 'v1beta', () => {
  // now we can use:
  // gapi.client.cloudbilling
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your Google Cloud Platform billing accounts
      'https://www.googleapis.com/auth/cloud-billing',

      // View your Google Cloud Platform billing accounts
      'https://www.googleapis.com/auth/cloud-billing.readonly',

      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',
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

After that you can use Cloud Billing API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Use custom pricing in the estimate, using a `CostScenario` with a defined `billingAccount`.
*/
await gapi.client.cloudbilling.billingAccounts.estimateCostScenario({ billingAccount: "billingAccount",  });

/*
Estimate list prices using a `CostScenario` without a defined `billingAccount`.
*/
await gapi.client.cloudbilling.estimateCostScenario({  });
```
