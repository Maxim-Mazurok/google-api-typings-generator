# TypeScript typings for Address Validation API v1

The Address Validation API allows developers to verify the accuracy of addresses. Given an address, it returns information about the correctness of the components of the parsed address, a geocode, and a verdict on the deliverability of the parsed address.
For detailed description please check [documentation](https://developers.google.com/maps/documentation/addressvalidation).

## Installing

Install typings for Address Validation API:

```
npm install @types/gapi.client.addressvalidation-v1 --save-dev
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
  'https://addressvalidation.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.addressvalidation
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('addressvalidation', 'v1', () => {
  // now we can use:
  // gapi.client.addressvalidation
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // Private Service: https://www.googleapis.com/auth/maps-platform.addressvalidation
    'https://www.googleapis.com/auth/maps-platform.addressvalidation',
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

After that you can use Address Validation API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Feedback about the outcome of the sequence of validation attempts. This should be the last call made after a sequence of validation calls for the same address, and should be called once the transaction is concluded. This should only be sent once for the sequence of `ValidateAddress` requests needed to validate an address fully.
*/
await gapi.client.addressvalidation.provideValidationFeedback({});

/*
Validates an address.
*/
await gapi.client.addressvalidation.validateAddress({});
```
