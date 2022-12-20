# TypeScript typings for Identity Toolkit API v2

The Google Identity Toolkit API lets you use open standards to verify a user's identity.
For detailed description please check [documentation](https://cloud.google.com/identity-platform).

## Installing

Install typings for Identity Toolkit API:

```
npm install @types/gapi.client.identitytoolkit-v2 --save-dev
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
gapi.client.load('https://identitytoolkit.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.identitytoolkit
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('identitytoolkit', 'v2', () => {
  // now we can use:
  // gapi.client.identitytoolkit
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and administer all your Firebase data and settings
      'https://www.googleapis.com/auth/firebase',
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

After that you can use Identity Toolkit API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
List all default supported Idps.
*/
await gapi.client.identitytoolkit.defaultSupportedIdps.list({  });

/*
Retrieve an Identity Toolkit project configuration.
*/
await gapi.client.identitytoolkit.projects.getConfig({ name: "name",  });

/*
Update an Identity Toolkit project configuration.
*/
await gapi.client.identitytoolkit.projects.updateConfig({ name: "name",  });
```
