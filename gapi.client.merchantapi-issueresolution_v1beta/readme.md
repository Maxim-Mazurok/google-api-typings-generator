# TypeScript typings for Merchant API issueresolution_v1beta

Programmatically manage your Merchant Center Accounts.
For detailed description please check [documentation](https://developers.devsite.corp.google.com/merchant/api).

## Installing

Install typings for Merchant API:

```
npm install @types/gapi.client.merchantapi-issueresolution_v1beta --save-dev
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
  'https://merchantapi.googleapis.com/$discovery/rest?version=issueresolution_v1beta',
  () => {
    // now we can use:
    // gapi.client.merchantapi
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('merchantapi', 'issueresolution_v1beta', () => {
  // now we can use:
  // gapi.client.merchantapi
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

After that you can use Merchant API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Provide a list of business's account issues with an issue resolution content and available actions. This content and actions are meant to be rendered and shown in third-party applications.
*/
await gapi.client.merchantapi.issueresolution.renderaccountissues({
  name: 'name',
});

/*
Provide a list of issues for business's product with an issue resolution content and available actions. This content and actions are meant to be rendered and shown in third-party applications.
*/
await gapi.client.merchantapi.issueresolution.renderproductissues({
  name: 'name',
});

/*
Start an action. The action can be requested by a business in third-party application. Before the business can request the action, the third-party application needs to show them action specific content and display a user input form. The action can be successfully started only once all `required` inputs are provided. If any `required` input is missing, or invalid value was provided, the service will return 400 error. Validation errors will contain Ids for all problematic field together with translated, human readable error messages that can be shown to the user.
*/
await gapi.client.merchantapi.issueresolution.triggeraction({name: 'name'});
```
