# TypeScript typings for Google Site Verification API v1

Verifies ownership of websites or domains with Google.
For detailed description please check [documentation](https://developers.google.com/site-verification/).

## Installing

Install typings for Google Site Verification API:

```
npm install @types/gapi.client.site_verification-v1 --save-dev
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
gapi.client.load('https://siteverification.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.siteVerification
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('siteVerification', 'v1', () => {
  // now we can use:
  // gapi.client.siteVerification
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Manage the list of sites and domains you control
      'https://www.googleapis.com/auth/siteverification',

      // Manage your new site verifications with Google
      'https://www.googleapis.com/auth/siteverification.verify_only',
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

After that you can use Google Site Verification API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Relinquish ownership of a website or domain.
*/
await gapi.client.siteVerification.webResource.delete({ id: "id",  });

/*
Get the most current data for a website or domain.
*/
await gapi.client.siteVerification.webResource.get({ id: "id",  });

/*
Get a verification token for placing on a website or domain.
*/
await gapi.client.siteVerification.webResource.getToken({  });

/*
Attempt verification of a website or domain.
*/
await gapi.client.siteVerification.webResource.insert({ verificationMethod: "verificationMethod",  });

/*
Get the list of your verified websites and domains.
*/
await gapi.client.siteVerification.webResource.list({  });

/*
Modify the list of owners for your website or domain. This method supports patch semantics.
*/
await gapi.client.siteVerification.webResource.patch({ id: "id",  });

/*
Modify the list of owners for your website or domain.
*/
await gapi.client.siteVerification.webResource.update({ id: "id",  });
```
