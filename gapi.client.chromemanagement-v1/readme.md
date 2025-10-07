# TypeScript typings for Chrome Management API v1

The Chrome Management API is a suite of services that allows Chrome administrators to view, manage and gain insights on their Chrome OS and Chrome Browser devices.
For detailed description please check [documentation](https://developers.google.com/chrome/management/).

## Installing

Install typings for Chrome Management API:

```
npm install @types/gapi.client.chromemanagement-v1 --save-dev
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
  'https://chromemanagement.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.chromemanagement
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('chromemanagement', 'v1', () => {
  // now we can use:
  // gapi.client.chromemanagement
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See detailed information about apps installed on Chrome browsers and devices managed by your organization
    'https://www.googleapis.com/auth/chrome.management.appdetails.readonly',

    // See, edit, delete, and take other necessary actions on Chrome browser profiles managed by your organization
    'https://www.googleapis.com/auth/chrome.management.profiles',

    // See Chrome browser profiles managed by your organization
    'https://www.googleapis.com/auth/chrome.management.profiles.readonly',

    // See reports about devices and Chrome browsers managed within your organization
    'https://www.googleapis.com/auth/chrome.management.reports.readonly',

    // See basic device and telemetry information collected from ChromeOS devices or users managed within your organization
    'https://www.googleapis.com/auth/chrome.management.telemetry.readonly',
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

After that you can use Chrome Management API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
*/
await gapi.client.chromemanagement.operations.cancel({name: 'name'});

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.chromemanagement.operations.delete({name: 'name'});

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.chromemanagement.operations.list({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.chromemanagement-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
