# TypeScript typings for Cloud Debugger API v2

Examines the call stack and variables of a running application without stopping or slowing it down. 
For detailed description please check [documentation](https://cloud.google.com/debugger).

## Installing

Install typings for Cloud Debugger API:

```
npm install @types/gapi.client.clouddebugger@v2 --save-dev
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
gapi.client.load('clouddebugger', 'v2', () => {
  // now we can use gapi.client.clouddebugger
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Use Stackdriver Debugger
      'https://www.googleapis.com/auth/cloud_debugger',

      // View and manage your data across Google Cloud Platform services
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

After that you can use Cloud Debugger API resources:

```typescript
```
