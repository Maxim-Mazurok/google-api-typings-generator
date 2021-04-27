# TypeScript typings for Workflows API v1

Manage workflow definitions. To execute workflows and manage executions, see the Workflows Executions API.
For detailed description please check [documentation](https://cloud.google.com/workflows).

## Installing

Install typings for Workflows API:

```
npm install @types/gapi.client.workflows@v1 --save-dev
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
gapi.client.load('workflows', 'v1', () => {
  // now we can use gapi.client.workflows
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, configure, and delete your Google Cloud Platform data
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

After that you can use Workflows API resources:

```typescript
```
