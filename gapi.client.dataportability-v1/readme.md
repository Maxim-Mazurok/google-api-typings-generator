# TypeScript typings for Data Portability API v1

The Data Portability API lets you build applications that request authorization from a user to move a copy of data from Google services into your application. This enables data portability and facilitates switching services.
For detailed description please check [documentation](https://developers.google.com/data-portability).

## Installing

Install typings for Data Portability API:

```
npm install @types/gapi.client.dataportability-v1 --save-dev
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
  'https://dataportability.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.dataportability
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('dataportability', 'v1', () => {
  // now we can use:
  // gapi.client.dataportability
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Move a copy of the Google Alerts subscriptions you created.
    'https://www.googleapis.com/auth/dataportability.alerts.subscriptions',

    // Move a copy of messages between you and the businesses you have conversations with across Google services.
    'https://www.googleapis.com/auth/dataportability.businessmessaging.conversations',

    // Move a copy of the information you entered into online forms in Chrome.
    'https://www.googleapis.com/auth/dataportability.chrome.autofill',

    // Move a copy of pages you bookmarked in Chrome.
    'https://www.googleapis.com/auth/dataportability.chrome.bookmarks',

    // Move a copy of words you added to Chrome's dictionary.
    'https://www.googleapis.com/auth/dataportability.chrome.dictionary',

    // Move a copy of extensions you installed from the Chrome Web Store.
    'https://www.googleapis.com/auth/dataportability.chrome.extensions',

    // Move a copy of sites you visited in Chrome.
    'https://www.googleapis.com/auth/dataportability.chrome.history',

    // Move a copy of pages you added to your reading list in Chrome.
    'https://www.googleapis.com/auth/dataportability.chrome.reading_list',

    // Move a copy of your settings in Chrome.
    'https://www.googleapis.com/auth/dataportability.chrome.settings',

    // Move a copy of searches and sites you follow, saved by Discover.
    'https://www.googleapis.com/auth/dataportability.discover.follows',

    // Move a copy of links to your liked documents, saved by Discover.
    'https://www.googleapis.com/auth/dataportability.discover.likes',

    // Move a copy of content you marked as not interested, saved by Discover.
    'https://www.googleapis.com/auth/dataportability.discover.not_interested',

    // Move a copy of the places you labeled on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.aliased_places',

    // Move a copy of your pinned trips on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.commute_routes',

    // Move a copy of your commute settings on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.commute_settings',

    // Move a copy of your electric vehicle profile on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.ev_profile',

    // Move a copy of the corrections you made to places or map information on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.factual_contributions',

    // Move a copy of your updates to places on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.offering_contributions',

    // Move a copy of the photos and videos you posted on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.photos_videos',

    // Move a copy of feedback you gave after completing trips using Maps directions.
    'https://www.googleapis.com/auth/dataportability.maps.post_trip_feedback',

    // Move a copy of the questions and answers you posted on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.questions_answers',

    // Move a copy of your reviews and posts on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.reviews',

    // Move a copy of your Starred places list on Maps.
    'https://www.googleapis.com/auth/dataportability.maps.starred_places',

    // Move a copy of your Maps activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.maps',

    // Move a copy of your My Ad Center activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.myadcenter',

    // Move a copy of your Google Play activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.play',

    // Move a copy of your Google Search activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.search',

    // Move a copy of your Shopping activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.shopping',

    // Move a copy of your YouTube activity.
    'https://www.googleapis.com/auth/dataportability.myactivity.youtube',

    // Move a copy of the maps you created in My Maps.
    'https://www.googleapis.com/auth/dataportability.mymaps.maps',

    // Move a copy of your food purchase and reservation activity.
    'https://www.googleapis.com/auth/dataportability.order_reserve.purchases_reservations',

    // Move a copy of information about your devices with Google Play Store installed.
    'https://www.googleapis.com/auth/dataportability.play.devices',

    // Move a copy of your Google Play Store Grouping tags created by app developers.
    'https://www.googleapis.com/auth/dataportability.play.grouping',

    // Move a copy of your Google Play Store app installations.
    'https://www.googleapis.com/auth/dataportability.play.installs',

    // Move a copy of your Google Play Store downloads, including books, games, and apps.
    'https://www.googleapis.com/auth/dataportability.play.library',

    // Move a copy of information about your Google Play Store Points.
    'https://www.googleapis.com/auth/dataportability.play.playpoints',

    // Move a copy of information about your Google Play Store promotions.
    'https://www.googleapis.com/auth/dataportability.play.promotions',

    // Move a copy of your Google Play Store purchases.
    'https://www.googleapis.com/auth/dataportability.play.purchases',

    // Move a copy of your Google Play Store redemption activities.
    'https://www.googleapis.com/auth/dataportability.play.redemptions',

    // Move a copy of your Google Play Store subscriptions.
    'https://www.googleapis.com/auth/dataportability.play.subscriptions',

    // Move a copy of your Google Play Store user settings and preferences.
    'https://www.googleapis.com/auth/dataportability.play.usersettings',

    // Move a copy of your saved links, images, places, and collections from your use of Google services.
    'https://www.googleapis.com/auth/dataportability.saved.collections',

    // Move a copy of your media reviews on Google Search.
    'https://www.googleapis.com/auth/dataportability.search_ugc.media.reviews_and_stars',

    // Move a copy of your self-reported video streaming provider preferences from Google Search and Google TV.
    'https://www.googleapis.com/auth/dataportability.search_ugc.media.streaming_video_providers',

    // Move a copy of your indicated thumbs up and thumbs down on media in Google Search and Google TV.
    'https://www.googleapis.com/auth/dataportability.search_ugc.media.thumbs',

    // Move a copy of information about the movies and TV shows you marked as watched on Google Search and Google TV.
    'https://www.googleapis.com/auth/dataportability.search_ugc.media.watched',

    // Move a copy of your notification settings on the Google Search app.
    'https://www.googleapis.com/auth/dataportability.searchnotifications.settings',

    // Move a copy of your notification subscriptions on Google Search app.
    'https://www.googleapis.com/auth/dataportability.searchnotifications.subscriptions',

    // Move a copy of your shipping information on Shopping.
    'https://www.googleapis.com/auth/dataportability.shopping.addresses',

    // Move a copy of reviews you wrote about products or online stores on Google Search.
    'https://www.googleapis.com/auth/dataportability.shopping.reviews',

    // Move a copy of the images and videos you uploaded to Street View.
    'https://www.googleapis.com/auth/dataportability.streetview.imagery',

    // Move a copy of information about your YouTube channel.
    'https://www.googleapis.com/auth/dataportability.youtube.channel',

    // Move a copy of your YouTube comments.
    'https://www.googleapis.com/auth/dataportability.youtube.comments',

    // Move a copy of your YouTube messages in live chat.
    'https://www.googleapis.com/auth/dataportability.youtube.live_chat',

    // Move a copy of your uploaded YouTube music tracks and your YouTube music library.
    'https://www.googleapis.com/auth/dataportability.youtube.music',

    // Move a copy of your YouTube playables saved game progress files.
    'https://www.googleapis.com/auth/dataportability.youtube.playable',

    // Move a copy of your YouTube posts.
    'https://www.googleapis.com/auth/dataportability.youtube.posts',

    // Move a copy of your YouTube private playlists.
    'https://www.googleapis.com/auth/dataportability.youtube.private_playlists',

    // Move a copy of your private YouTube videos and information about them.
    'https://www.googleapis.com/auth/dataportability.youtube.private_videos',

    // Move a copy of your public YouTube playlists.
    'https://www.googleapis.com/auth/dataportability.youtube.public_playlists',

    // Move a copy of your public YouTube videos and information about them.
    'https://www.googleapis.com/auth/dataportability.youtube.public_videos',

    // Move a copy of your YouTube shopping wishlists, and wishlist items.
    'https://www.googleapis.com/auth/dataportability.youtube.shopping',

    // Move a copy of your YouTube channel subscriptions, even if they're private.
    'https://www.googleapis.com/auth/dataportability.youtube.subscriptions',

    // Move a copy of your unlisted YouTube playlists.
    'https://www.googleapis.com/auth/dataportability.youtube.unlisted_playlists',

    // Move a copy of your unlisted YouTube videos and information about them.
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
Retrieves the state of an Archive job for the Portability API.
*/
await gapi.client.dataportability.archiveJobs.getPortabilityArchiveState({
  name: 'name',
});

/*
Retries a failed Portability Archive job.
*/
await gapi.client.dataportability.archiveJobs.retry({name: 'name'});

/*
Revokes OAuth tokens and resets exhausted scopes for a user/project pair. This method allows you to initiate a request after a new consent is granted. This method also indicates that previous archives can be garbage collected. You should call this method when all jobs are complete and all archives are downloaded. Do not call it only when you start a new job.
*/
await gapi.client.dataportability.authorization.reset({});

/*
Initiates a new Archive job for the Portability API.
*/
await gapi.client.dataportability.portabilityArchive.initiate({});
```
