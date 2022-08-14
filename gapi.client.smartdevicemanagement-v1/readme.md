# TypeScript typings for Smart Device Management API v1

Allow select enterprise partners to access, control, and manage Google and Nest devices programmatically.
For detailed description please check [documentation](https://developers.google.com/nest/device-access).

## Installing

Install typings for Smart Device Management API:

```
npm install @types/gapi.client.smartdevicemanagement-v1 --save-dev
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
gapi.client.load('https://smartdevicemanagement.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.smartdevicemanagement
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('smartdevicemanagement', 'v1', () => {
  // now we can use:
  // gapi.client.smartdevicemanagement
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See and/or control the devices that you selected
      'https://www.googleapis.com/auth/sdm.service',

      // See and control the Nest thermostats that you select
      'https://www.googleapis.com/auth/sdm.thermostat.service',
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

After that you can use Smart Device Management API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
