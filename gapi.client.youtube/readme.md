# TypeScript typings for YouTube Data API v3 v3

The YouTube Data API v3 is an API that provides access to YouTube data, such as videos, playlists, and channels.
For detailed description please check [documentation](https://developers.google.com/youtube/).

## Installing

Install typings for YouTube Data API v3:

```
npm install @types/gapi.client.youtube@v3 --save-dev
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
gapi.client.load('youtube', 'v3', () => {
  // now we can use gapi.client.youtube
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Manage your YouTube account
      'https://www.googleapis.com/auth/youtube',

      // See a list of your current active channel members, their current level, and when they became a member
      'https://www.googleapis.com/auth/youtube.channel-memberships.creator',

      // See, edit, and permanently delete your YouTube videos, ratings, comments and captions
      'https://www.googleapis.com/auth/youtube.force-ssl',

      // View your YouTube account
      'https://www.googleapis.com/auth/youtube.readonly',

      // Manage your YouTube videos
      'https://www.googleapis.com/auth/youtube.upload',

      // View and manage your assets and associated content on YouTube
      'https://www.googleapis.com/auth/youtubepartner',

      // View private information of your YouTube channel relevant during the audit process with a YouTube partner
      'https://www.googleapis.com/auth/youtubepartner-channel-audit',
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

After that you can use YouTube Data API v3 resources:

```typescript

/*
Inserts a new resource into this collection.
*/
await gapi.client.activities.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.activities.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.captions.delete({ id: "id",  });

/*
Downloads a caption track.
*/
await gapi.client.captions.download({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.captions.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.captions.list({ part: "part", videoId: "videoId",  });

/*
Updates an existing resource.
*/
await gapi.client.captions.update({ part: "part",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.channelBanners.insert({  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.channels.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.channels.update({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.channelSections.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.channelSections.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.channelSections.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.channelSections.update({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.comments.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.comments.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.comments.list({ part: "part",  });

/*
Expresses the caller's opinion that one or more comments should be flagged
as spam.
*/
await gapi.client.comments.markAsSpam({ id: "id",  });

/*
Sets the moderation status of one or more comments.
*/
await gapi.client.comments.setModerationStatus({ id: "id", moderationStatus: "moderationStatus",  });

/*
Updates an existing resource.
*/
await gapi.client.comments.update({ part: "part",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.commentThreads.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.commentThreads.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.commentThreads.update({ part: "part",  });

/*
Retrieves a list of guide categories.
*/
await gapi.client.guideCategories.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.i18nLanguages.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.i18nRegions.list({ part: "part",  });

/*
Bind a broadcast to a stream.
*/
await gapi.client.liveBroadcasts.bind({ id: "id", part: "part",  });

/*
Slate and recording control of the live broadcast.
Support actions: slate on/off, recording start/stop/pause/resume.
Design doc: goto/yt-api-liveBroadcast-control
*/
await gapi.client.liveBroadcasts.control({ id: "id", part: "part",  });

/*
Delete a given broadcast.
*/
await gapi.client.liveBroadcasts.delete({ id: "id",  });

/*
Inserts a new stream for the authenticated user.
*/
await gapi.client.liveBroadcasts.insert({ part: "part",  });

/*
Retrieve the list of broadcasts associated with the given channel.
*/
await gapi.client.liveBroadcasts.list({ part: "part",  });

/*
Transition a broadcast to a given status.
*/
await gapi.client.liveBroadcasts.transition({ broadcastStatus: "broadcastStatus", id: "id", part: "part",  });

/*
Updates an existing broadcast for the authenticated user.
*/
await gapi.client.liveBroadcasts.update({ part: "part",  });

/*
Deletes a chat ban.
*/
await gapi.client.liveChatBans.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.liveChatBans.insert({ part: "part",  });

/*
Deletes a chat message.
*/
await gapi.client.liveChatMessages.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.liveChatMessages.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.liveChatMessages.list({ liveChatId: "liveChatId", part: "part",  });

/*
Deletes a chat moderator.
*/
await gapi.client.liveChatModerators.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.liveChatModerators.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.liveChatModerators.list({ liveChatId: "liveChatId", part: "part",  });

/*
Deletes an existing stream for the authenticated user.
*/
await gapi.client.liveStreams.delete({ id: "id",  });

/*
Inserts a new stream for the authenticated user.
*/
await gapi.client.liveStreams.insert({ part: "part",  });

/*
Retrieve the list of streams associated with the given channel. --
*/
await gapi.client.liveStreams.list({ part: "part",  });

/*
Updates an existing stream for the authenticated user.
*/
await gapi.client.liveStreams.update({ part: "part",  });

/*
Retrieves a list of members that match the request criteria for a channel.
*/
await gapi.client.members.list({ part: "part",  });

/*
Retrieves a list of all pricing levels offered by a creator to the fans.
*/
await gapi.client.membershipsLevels.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.playlistItems.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.playlistItems.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.playlistItems.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.playlistItems.update({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.playlists.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.playlists.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.playlists.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.playlists.update({ part: "part",  });

/*
Retrieves a list of search resources
*/
await gapi.client.search.list({ part: "part",  });

/*
Retrieves a list of sponsors that match the request criteria for a
channel.
*/
await gapi.client.sponsors.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.subscriptions.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.subscriptions.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.subscriptions.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.superChatEvents.list({ part: "part",  });

/*
As this is not an insert in a strict sense (it supports uploading/setting
of a thumbnail for multiple videos, which doesn't result in creation of a
single resource), I use a custom verb here.
*/
await gapi.client.thumbnails.set({ videoId: "videoId",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.videoAbuseReportReasons.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.videoCategories.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.videos.delete({ id: "id",  });

/*
Retrieves the ratings that the authorized user gave to a list of specified
videos.
*/
await gapi.client.videos.getRating({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.videos.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.videos.list({ part: "part",  });

/*
Adds a like or dislike rating to a video or removes a rating from a video.
*/
await gapi.client.videos.rate({ id: "id", rating: "rating",  });

/*
Report abuse for a video.
*/
await gapi.client.videos.reportAbuse({  });

/*
Updates an existing resource.
*/
await gapi.client.videos.update({ part: "part",  });

/*
Allows upload of watermark image and setting it for a channel.
*/
await gapi.client.watermarks.set({ channelId: "channelId",  });

/*
Allows removal of channel watermark.
*/
await gapi.client.watermarks.unset({ channelId: "channelId",  });
```
