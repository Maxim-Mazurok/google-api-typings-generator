# TypeScript typings for Organization Policy API v2

The Org Policy API allows users to configure governance rules on their GCP resources across the Cloud Resource Hierarchy.
For detailed description please check [documentation](https://cloud.google.com/orgpolicy/docs/reference/rest/index.html).

## Installing

Install typings for Organization Policy API:

```
npm install @types/gapi.client.orgpolicy@v2 --save-dev
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
gapi.client.load('orgpolicy', 'v2', () => {
  // now we can use gapi.client.orgpolicy
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
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

After that you can use Organization Policy API resources:

```typescript
```
