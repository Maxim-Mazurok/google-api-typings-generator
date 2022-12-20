# TypeScript typings for Cloud Testing API v1

Allows developers to run automated tests for their mobile applications on Google infrastructure.
For detailed description please check [documentation](https://developers.google.com/cloud-test-lab/).

## Installing

Install typings for Cloud Testing API:

```
npm install @types/gapi.client.testing-v1 --save-dev
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
gapi.client.load('https://testing.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.testing
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('testing', 'v1', () => {
  // now we can use:
  // gapi.client.testing
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud services and see the email address of your Google Account
      'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use Cloud Testing API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the details of an Android application APK.
*/
await gapi.client.testing.applicationDetailService.getApkDetails({  });

/*
Gets the catalog of supported test environments. May return any of the following canonical error codes: - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the environment type does not exist - INTERNAL - if an internal error occurred
*/
await gapi.client.testing.testEnvironmentCatalog.get({ environmentType: "environmentType",  });
```
