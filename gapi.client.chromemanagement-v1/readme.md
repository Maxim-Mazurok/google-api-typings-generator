# TypeScript typings for Chrome Management API v1

The Chrome Management API is a suite of services that allows Chrome administrators to view, manage and gain insights on their Chrome OS and Chrome Browser devices.
For detailed description please check [documentation](http://developers.google.com/chrome/management/).

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
gapi.client.load('https://chromemanagement.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.chromemanagement
});
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

      // See reports about devices and Chrome browsers managed within your organization
      'https://www.googleapis.com/auth/chrome.management.reports.readonly',

      // See basic device and telemetry information collected from Chrome OS devices or users managed within your organization
      'https://www.googleapis.com/auth/chrome.management.telemetry.readonly',
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

After that you can use Chrome Management API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
