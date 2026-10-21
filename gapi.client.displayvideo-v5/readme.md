# TypeScript typings for Display & Video 360 API v5

Display & Video 360 API allows users to automate complex Display & Video 360 workflows, such as creating insertion orders and setting targeting options for individual line items.
For detailed description please check [documentation](https://developers.google.com/display-video/).

## Installing

Install typings for Display & Video 360 API:

```
npm install @types/gapi.client.displayvideo-v5 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.displayvideo-v5"
    ]
  }
}
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
  'https://displayvideo.googleapis.com/$discovery/rest?version=v5',
  () => {
    // now we can use:
    // gapi.client.displayvideo
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('displayvideo', 'v5', () => {
  // now we can use:
  // gapi.client.displayvideo
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Create, see, edit, and permanently delete your Display & Video 360 entities and reports
    'https://www.googleapis.com/auth/display-video',

    // View and manage your reports in DoubleClick Bid Manager
    'https://www.googleapis.com/auth/doubleclickbidmanager',
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

After that you can use Display & Video 360 API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Downloads media. Download is supported on the URI `/download/{resource_name=**}?alt=media.` **Note**: Download requests will not be successful without including `alt=media` query string.
*/
await gapi.client.displayvideo.media.download({resourceName: 'resourceName'});

/*
Uploads media. Upload is supported on the URI `/upload/media/{resource_name=**}?upload_type=media.` **Note**: Upload requests will not be successful without including `upload_type=media` query string.
*/
await gapi.client.displayvideo.media.upload({resourceName: 'resourceName'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.displayvideo-v5#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
