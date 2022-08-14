# TypeScript typings for Cloud Billing Budget API v1beta1

The Cloud Billing Budget API stores Cloud Billing budgets, which define a budget plan and the rules to execute as spend is tracked against that plan.
For detailed description please check [documentation](https://cloud.google.com/billing/docs/how-to/budget-api-overview).

## Installing

Install typings for Cloud Billing Budget API:

```
npm install @types/gapi.client.billingbudgets-v1beta1 --save-dev
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
gapi.client.load('https://billingbudgets.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.billingbudgets
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('billingbudgets', 'v1beta1', () => {
  // now we can use:
  // gapi.client.billingbudgets
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your Google Cloud Platform billing accounts
      'https://www.googleapis.com/auth/cloud-billing',

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

After that you can use Cloud Billing Budget API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
