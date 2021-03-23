# TypeScript typings for Policy Troubleshooter API v1


For detailed description please check [documentation](https://cloud.google.com/iam/).

## Installing

Install typings for Policy Troubleshooter API:

```
npm install @types/gapi.client.policytroubleshooter@v1 --save-dev
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
gapi.client.load('policytroubleshooter', 'v1', () => {
  // now we can use gapi.client.policytroubleshooter
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

After that you can use Policy Troubleshooter API resources:

```typescript

/*
Checks whether a member has a specific permission for a specific resource, and explains why the member does or does not have that permission.
*/
await gapi.client.policytroubleshooter.iam.troubleshoot({  });
```
