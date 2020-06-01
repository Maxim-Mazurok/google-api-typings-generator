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
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.activities.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.captions.delete({ id: "id",  });

/*
Downloads a caption track.
*/
await gapi.client.youtube.captions.download({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.captions.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.captions.list({ part: "part", videoId: "videoId",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.captions.update({ part: "part",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.channelBanners.insert({  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.channels.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.channels.update({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.channelSections.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.channelSections.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.channelSections.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.channelSections.update({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.comments.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.comments.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.comments.list({ part: "part",  });

/*
Expresses the caller's opinion that one or more comments should be flagged
as spam.
*/
await gapi.client.youtube.comments.markAsSpam({ id: "id",  });

/*
Sets the moderation status of one or more comments.
*/
await gapi.client.youtube.comments.setModerationStatus({ id: "id", moderationStatus: "moderationStatus",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.comments.update({ part: "part",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.commentThreads.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.commentThreads.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.commentThreads.update({ part: "part",  });

/*
Retrieves a list of guide categories.
*/
await gapi.client.youtube.guideCategories.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.i18nLanguages.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.i18nRegions.list({ part: "part",  });

/*
Bind a broadcast to a stream.
*/
await gapi.client.youtube.liveBroadcasts.bind({ id: "id", part: "part",  });

/*
Slate and recording control of the live broadcast.
Support actions: slate on/off, recording start/stop/pause/resume.
Design doc: goto/yt-api-liveBroadcast-control
*/
await gapi.client.youtube.liveBroadcasts.control({ id: "id", part: "part",  });

/*
Delete a given broadcast.
*/
await gapi.client.youtube.liveBroadcasts.delete({ id: "id",  });

/*
Inserts a new stream for the authenticated user.
*/
await gapi.client.youtube.liveBroadcasts.insert({ part: "part",  });

/*
Retrieve the list of broadcasts associated with the given channel.
*/
await gapi.client.youtube.liveBroadcasts.list({ part: "part",  });

/*
Transition a broadcast to a given status.
*/
await gapi.client.youtube.liveBroadcasts.transition({ broadcastStatus: "broadcastStatus", id: "id", part: "part",  });

/*
Updates an existing broadcast for the authenticated user.
*/
await gapi.client.youtube.liveBroadcasts.update({ part: "part",  });

/*
Deletes a chat ban.
*/
await gapi.client.youtube.liveChatBans.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.liveChatBans.insert({ part: "part",  });

/*
Deletes a chat message.
*/
await gapi.client.youtube.liveChatMessages.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.liveChatMessages.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.liveChatMessages.list({ liveChatId: "liveChatId", part: "part",  });

/*
Deletes a chat moderator.
*/
await gapi.client.youtube.liveChatModerators.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.liveChatModerators.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.liveChatModerators.list({ liveChatId: "liveChatId", part: "part",  });

/*
Deletes an existing stream for the authenticated user.
*/
await gapi.client.youtube.liveStreams.delete({ id: "id",  });

/*
Inserts a new stream for the authenticated user.
*/
await gapi.client.youtube.liveStreams.insert({ part: "part",  });

/*
Retrieve the list of streams associated with the given channel. --
*/
await gapi.client.youtube.liveStreams.list({ part: "part",  });

/*
Updates an existing stream for the authenticated user.
*/
await gapi.client.youtube.liveStreams.update({ part: "part",  });

/*
Retrieves a list of members that match the request criteria for a channel.
*/
await gapi.client.youtube.members.list({ part: "part",  });

/*
Retrieves a list of all pricing levels offered by a creator to the fans.
*/
await gapi.client.youtube.membershipsLevels.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.playlistItems.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.playlistItems.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.playlistItems.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.playlistItems.update({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.playlists.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.playlists.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.playlists.list({ part: "part",  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.playlists.update({ part: "part",  });

/*
Retrieves a list of search resources
*/
await gapi.client.youtube.search.list({ part: "part",  });

/*
Retrieves a list of sponsors that match the request criteria for a
channel.
*/
await gapi.client.youtube.sponsors.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.subscriptions.delete({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.subscriptions.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.subscriptions.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.superChatEvents.list({ part: "part",  });

/*
As this is not an insert in a strict sense (it supports uploading/setting
of a thumbnail for multiple videos, which doesn't result in creation of a
single resource), I use a custom verb here.
*/
await gapi.client.youtube.thumbnails.set({ videoId: "videoId",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.videoAbuseReportReasons.list({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.videoCategories.list({ part: "part",  });

/*
Deletes a resource.
*/
await gapi.client.youtube.videos.delete({ id: "id",  });

/*
Retrieves the ratings that the authorized user gave to a list of specified
videos.
*/
await gapi.client.youtube.videos.getRating({ id: "id",  });

/*
Inserts a new resource into this collection.
*/
await gapi.client.youtube.videos.insert({ part: "part",  });

/*
Retrieves a list of resources, possibly filtered.
*/
await gapi.client.youtube.videos.list({ part: "part",  });

/*
Adds a like or dislike rating to a video or removes a rating from a video.
*/
await gapi.client.youtube.videos.rate({ id: "id", rating: "rating",  });

/*
Report abuse for a video.
*/
await gapi.client.youtube.videos.reportAbuse({  });

/*
Updates an existing resource.
*/
await gapi.client.youtube.videos.update({ part: "part",  });

/*
Allows upload of watermark image and setting it for a channel.
*/
await gapi.client.youtube.watermarks.set({ channelId: "channelId",  });

/*
Allows removal of channel watermark.
*/
await gapi.client.youtube.watermarks.unset({ channelId: "channelId",  });
```
