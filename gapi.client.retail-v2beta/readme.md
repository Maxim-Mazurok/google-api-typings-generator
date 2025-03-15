# TypeScript typings for Vertex AI Search for commerce API v2beta

Vertex AI Search for commerce API is made up of Retail Search, Browse and Recommendations. These discovery AI solutions help you implement personalized search, browse and recommendations, based on machine learning models, across your websites and mobile applications.
For detailed description please check [documentation](https://cloud.google.com/recommendations).

## Installing

Install typings for Vertex AI Search for commerce API:

```
npm install @types/gapi.client.retail-v2beta --save-dev
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
  'https://retail.googleapis.com/$discovery/rest?version=v2beta',
  () => {
    // now we can use:
    // gapi.client.retail
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('retail', 'v2beta', () => {
  // now we can use:
  // gapi.client.retail
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

After that you can use Vertex AI Search for commerce API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Get the AlertConfig of the requested project.
*/
await gapi.client.retail.projects.getAlertConfig({name: 'name'});

/*
Update the alert config of the requested project.
*/
await gapi.client.retail.projects.updateAlertConfig({name: 'name'});
```
