# TypeScript typings for Service Directory API v1

Service Directory is a platform for discovering, publishing, and connecting services. 
For detailed description please check [documentation](https://cloud.google.com/service-directory).

## Installing

Install typings for Service Directory API:

```
npm install @types/gapi.client.servicedirectory@v1 --save-dev
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
gapi.client.load('servicedirectory', 'v1', () => {
  // now we can use gapi.client.servicedirectory
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

After that you can use Service Directory API resources:

```typescript
```
