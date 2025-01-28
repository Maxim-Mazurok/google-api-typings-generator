# TypeScript typings for Firebase Data Connect API v1beta

Firebase Data Connect is a relational database service for mobile and web apps that lets you build and scale using a fully-managed PostgreSQL database powered by Cloud SQL. The REST API lets developers manage the connections to their database, change the schema of their database, and query the database.
For detailed description please check [documentation](https://firebase.google.com/docs/data-connect).

## Installing

Install typings for Firebase Data Connect API:

```
npm install @types/gapi.client.firebasedataconnect-v1beta --save-dev
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
  'https://firebasedataconnect.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.firebasedataconnect
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebasedataconnect', 'v1beta', () => {
  // now we can use:
  // gapi.client.firebasedataconnect
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

After that you can use Firebase Data Connect API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
