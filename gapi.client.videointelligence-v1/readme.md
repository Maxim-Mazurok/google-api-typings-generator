# TypeScript typings for Cloud Video Intelligence API v1

Detects objects, explicit content, and scene changes in videos. It also specifies the region for annotation and transcribes speech to text. Supports both asynchronous API and streaming API.
For detailed description please check [documentation](https://cloud.google.com/video-intelligence/docs/).

## Installing

Install typings for Cloud Video Intelligence API:

```
npm install @types/gapi.client.videointelligence-v1 --save-dev
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
  'https://videointelligence.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.videointelligence
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('videointelligence', 'v1', () => {
  // now we can use:
  // gapi.client.videointelligence
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

After that you can use Cloud Video Intelligence API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Performs asynchronous video annotation. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `AnnotateVideoProgress` (progress). `Operation.response` contains `AnnotateVideoResponse` (results).
*/
await gapi.client.videointelligence.videos.annotate({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.videointelligence-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
