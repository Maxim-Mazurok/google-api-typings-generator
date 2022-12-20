# TypeScript typings for Cloud Source Repositories API v1

Accesses source code repositories hosted by Google.
For detailed description please check [documentation](https://cloud.google.com/source-repositories/docs/apis).

## Installing

Install typings for Cloud Source Repositories API:

```
npm install @types/gapi.client.sourcerepo-v1 --save-dev
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
gapi.client.load('https://sourcerepo.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.sourcerepo
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('sourcerepo', 'v1', () => {
  // now we can use:
  // gapi.client.sourcerepo
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Manage your source code repositories
      'https://www.googleapis.com/auth/source.full_control',

      // View the contents of your source code repositories
      'https://www.googleapis.com/auth/source.read_only',

      // Manage the contents of your source code repositories
      'https://www.googleapis.com/auth/source.read_write',
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

After that you can use Cloud Source Repositories API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns the Cloud Source Repositories configuration of the project.
*/
await gapi.client.sourcerepo.projects.getConfig({ name: "name",  });

/*
Updates the Cloud Source Repositories configuration of the project.
*/
await gapi.client.sourcerepo.projects.updateConfig({ name: "name",  });
```
