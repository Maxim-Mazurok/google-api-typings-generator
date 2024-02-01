# TypeScript typings for Data Portability API v1beta

The Data Portability API lets you build applications that request authorization from a user to move a copy of data from Google services into your application. This enables data portability and facilitates switching services.
For detailed description please check [documentation](https://developers.google.com/data-portability).

## Installing

Install typings for Data Portability API:

```
npm install @types/gapi.client.dataportability-v1beta --save-dev
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
  'https://dataportability.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.dataportability
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('dataportability', 'v1beta', () => {
  // now we can use:
  // gapi.client.dataportability
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Move a copy of messages between you and the businesses you have conversations with.
    'https://www.googleapis.com/auth/dataportability.businessmessaging.conversations',

    // Move a copy of your search activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.search',

    // Move a copy of your Shopping activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.shopping',

    // Move a copy of your YouTube activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.youtube',

    // Move a copy of your shipping information.
    'https://www.googleapis.com/auth/dataportability.shopping.addresses',

    // Move a copy of reviews you wrote about products or online stores.
    'https://www.googleapis.com/auth/dataportability.shopping.reviews',

    // Move a copy of information about your channel.
    'https://www.googleapis.com/auth/dataportability.youtube.channel',

    // Move a copy of your comments.
    'https://www.googleapis.com/auth/dataportability.youtube.comments',

    // Move a copy of your messages in live chat.
    'https://www.googleapis.com/auth/dataportability.youtube.live_chat',

    // Move a copy of your uploaded YouTube Music tracks and your YouTube Music library.
    'https://www.googleapis.com/auth/dataportability.youtube.music',

    // Move a copy of your private playlists.
    'https://www.googleapis.com/auth/dataportability.youtube.private_playlists',

    // Move a copy of your private videos and information about them.
    'https://www.googleapis.com/auth/dataportability.youtube.private_videos',

    // Move a copy of your public playlists.
    'https://www.googleapis.com/auth/dataportability.youtube.public_playlists',

    // Move a copy of your public videos and information about them.
    'https://www.googleapis.com/auth/dataportability.youtube.public_videos',

    // Move a copy of YouTube Shopping Wishlists, and wishlist items.
    'https://www.googleapis.com/auth/dataportability.youtube.shopping',

    // Move a copy of your channel subscriptions, even if they're private.
    'https://www.googleapis.com/auth/dataportability.youtube.subscriptions',

    // Move a copy of your unlisted playlists.
    'https://www.googleapis.com/auth/dataportability.youtube.unlisted_playlists',

    // Move a copy of your unlisted videos and information about them.
    'https://www.googleapis.com/auth/dataportability.youtube.unlisted_videos',
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

After that you can use Data Portability API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Retrieves the state of a Takeout Archive job for the Portability API.
*/
await gapi.client.dataportability.archiveJobs.getPortabilityArchiveState({
  name: 'name',
});

/*
Retries a failed Portability Archive job.
*/
await gapi.client.dataportability.archiveJobs.retry({name: 'name'});

/*
Revokes OAuth tokens and resets exhausted scopes for a user/project pair. This method allows you to initiate a Takeout request after a new consent is granted. This method also indicates that previous archives can be garbage collected. You should call this method when all jobs are complete and all archives are downloaded. Do not call it only when you start a new job.
*/
await gapi.client.dataportability.authorization.reset({});

/*
Initiates a new Takeout Archive job for the Portability API.
*/
await gapi.client.dataportability.portabilityArchive.initiate({});
```
