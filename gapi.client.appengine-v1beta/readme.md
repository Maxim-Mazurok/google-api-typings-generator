# TypeScript typings for App Engine Admin API v1beta

Provisions and manages developers' App Engine applications.
For detailed description please check [documentation](https://cloud.google.com/appengine/docs/admin-api/).

## Installing

Install typings for App Engine Admin API:

```
npm install @types/gapi.client.appengine-v1beta --save-dev
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
  'https://appengine.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.appengine
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('appengine', 'v1beta', () => {
  // now we can use:
  // gapi.client.appengine
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your applications deployed on Google App Engine
    'https://www.googleapis.com/auth/appengine.admin',

    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View your data across Google Cloud services and see the email address of your Google Account
    'https://www.googleapis.com/auth/cloud-platform.read-only',
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
  }
);
```

After that you can use App Engine Admin API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Creates an App Engine application for a Google Cloud Platform project. Required fields: id - The ID of the target Cloud Platform project. location - The region (https://cloud.google.com/appengine/docs/locations) where you want the App Engine application located.For more information about App Engine applications, see Managing Projects, Applications, and Billing (https://cloud.google.com/appengine/docs/standard/python/console/).
*/
await gapi.client.appengine.apps.create({});

/*
Gets information about an application.
*/
await gapi.client.appengine.apps.get({appsId: 'appsId'});

/*
Lists all the available runtimes for the application.
*/
await gapi.client.appengine.apps.listRuntimes({appsId: 'appsId'});

/*
Updates the specified Application resource. You can update the following fields: auth_domain - Google authentication domain for controlling user access to the application. default_cookie_expiration - Cookie expiration policy for the application. iap - Identity-Aware Proxy properties for the application.
*/
await gapi.client.appengine.apps.patch({appsId: 'appsId'});

/*
Recreates the required App Engine features for the specified App Engine application, for example a Cloud Storage bucket or App Engine service account. Use this method if you receive an error message about a missing feature, for example, Error retrieving the App Engine service account. If you have deleted your App Engine service account, this will not be able to recreate it. Instead, you should attempt to use the IAM undelete API if possible at https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/undelete?apix_params=%7B"name"%3A"projects%2F-%2FserviceAccounts%2Funique_id"%2C"resource"%3A%7B%7D%7D . If the deletion was recent, the numeric ID can be found in the Cloud Console Activity Log.
*/
await gapi.client.appengine.apps.repair({appsId: 'appsId'});
```