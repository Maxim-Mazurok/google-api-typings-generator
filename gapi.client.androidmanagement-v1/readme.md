# TypeScript typings for Android Management API v1

The Android Management API provides remote enterprise management of Android devices and apps.
For detailed description please check [documentation](https://developers.google.com/android/management).

## Installing

Install typings for Android Management API:

```
npm install @types/gapi.client.androidmanagement-v1 --save-dev
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
gapi.client.load('https://androidmanagement.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.androidmanagement
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('androidmanagement', 'v1', () => {
  // now we can use:
  // gapi.client.androidmanagement
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Manage Android devices and apps for your customers
      'https://www.googleapis.com/auth/androidmanagement',
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

After that you can use Android Management API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Creates an enterprise. This is the last step in the enterprise signup flow.
*/
await gapi.client.androidmanagement.enterprises.create({  });

/*
Deletes an enterprise. Only available for EMM-managed enterprises.
*/
await gapi.client.androidmanagement.enterprises.delete({ name: "name",  });

/*
Gets an enterprise.
*/
await gapi.client.androidmanagement.enterprises.get({ name: "name",  });

/*
Lists EMM-managed enterprises. Only BASIC fields are returned.
*/
await gapi.client.androidmanagement.enterprises.list({  });

/*
Updates an enterprise.
*/
await gapi.client.androidmanagement.enterprises.patch({ name: "name",  });

/*
Creates an enterprise signup URL.
*/
await gapi.client.androidmanagement.signupUrls.create({  });
```
