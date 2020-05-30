# TypeScript typings for YouTube Data API v3

Supports core YouTube features, such as uploading videos, creating and managing playlists, searching for content, and much more.
For detailed description please check [documentation](https://developers.google.com/youtube/v3).

## Installing

Install typings for YouTube Data API:

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

After that you can use YouTube Data API resources:

```typescript

/*
Returns a list of channel activity events that match the request criteria. For example, you can retrieve events associated with a particular channel, events associated with the user's subscriptions and Google+ friends, or the YouTube home page feed, which is customized for each user.
*/
await gapi.client.youtube.activities.list({ part: "part",  });

/*
Deletes a specified caption track.
*/
await gapi.client.youtube.captions.delete({ id: "id",  });

/*
Downloads a caption track. The caption track is returned in its original format unless the request specifies a value for the tfmt parameter and in its original language unless the request specifies a value for the tlang parameter.
*/
await gapi.client.youtube.captions.download({ id: "id",  });

/*
Uploads a caption track.
*/
await gapi.client.youtube.captions.insert({ part: "part",  });

/*
Returns a list of caption tracks that are associated with a specified video. Note that the API response does not contain the actual captions and that the captions.download method provides the ability to retrieve a caption track.
*/
await gapi.client.youtube.captions.list({ part: "part", videoId: "videoId",  });

/*
Updates a caption track. When updating a caption track, you can change the track's draft status, upload a new caption file for the track, or both.
*/
await gapi.client.youtube.captions.update({ part: "part",  });

/*
Uploads a channel banner image to YouTube. This method represents the first two steps in a three-step process to update the banner image for a channel:

- Call the channelBanners.insert method to upload the binary image data to YouTube. The image must have a 16:9 aspect ratio and be at least 2120x1192 pixels.
- Extract the url property's value from the response that the API returns for step 1.
- Call the channels.update method to update the channel's branding settings. Set the brandingSettings.image.bannerExternalUrl property's value to the URL obtained in step 2.
*/
await gapi.client.youtube.channelBanners.insert({  });

/*
Returns a collection of zero or more channel resources that match the request criteria.
*/
await gapi.client.youtube.channels.list({ part: "part",  });

/*
Updates a channel's metadata. Note that this method currently only supports updates to the channel resource's brandingSettings and invideoPromotion objects and their child properties.
*/
await gapi.client.youtube.channels.update({ part: "part",  });

/*
Deletes a channelSection.
*/
await gapi.client.youtube.channelSections.delete({ id: "id",  });

/*
Adds a channelSection for the authenticated user's channel.
*/
await gapi.client.youtube.channelSections.insert({ part: "part",  });

/*
Returns channelSection resources that match the API request criteria.
*/
await gapi.client.youtube.channelSections.list({ part: "part",  });

/*
Update a channelSection.
*/
await gapi.client.youtube.channelSections.update({ part: "part",  });

/*
Deletes a comment.
*/
await gapi.client.youtube.comments.delete({ id: "id",  });

/*
Creates a reply to an existing comment. Note: To create a top-level comment, use the commentThreads.insert method.
*/
await gapi.client.youtube.comments.insert({ part: "part",  });

/*
Returns a list of comments that match the API request parameters.
*/
await gapi.client.youtube.comments.list({ part: "part",  });

/*
Expresses the caller's opinion that one or more comments should be flagged as spam.
*/
await gapi.client.youtube.comments.markAsSpam({ id: "id",  });

/*
Sets the moderation status of one or more comments. The API request must be authorized by the owner of the channel or video associated with the comments.
*/
await gapi.client.youtube.comments.setModerationStatus({ id: "id", moderationStatus: "moderationStatus",  });

/*
Modifies a comment.
*/
await gapi.client.youtube.comments.update({ part: "part",  });

/*
Creates a new top-level comment. To add a reply to an existing comment, use the comments.insert method instead.
*/
await gapi.client.youtube.commentThreads.insert({ part: "part",  });

/*
Returns a list of comment threads that match the API request parameters.
*/
await gapi.client.youtube.commentThreads.list({ part: "part",  });

/*
Modifies the top-level comment in a comment thread.
*/
await gapi.client.youtube.commentThreads.update({ part: "part",  });

/*
Returns a list of categories that can be associated with YouTube channels.
*/
await gapi.client.youtube.guideCategories.list({ part: "part",  });

/*
Returns a list of application languages that the YouTube website supports.
*/
await gapi.client.youtube.i18nLanguages.list({ part: "part",  });

/*
Returns a list of content regions that the YouTube website supports.
*/
await gapi.client.youtube.i18nRegions.list({ part: "part",  });

/*
Binds a YouTube broadcast to a stream or removes an existing binding between a broadcast and a stream. A broadcast can only be bound to one video stream, though a video stream may be bound to more than one broadcast.
*/
await gapi.client.youtube.liveBroadcasts.bind({ id: "id", part: "part",  });

/*
Controls the settings for a slate that can be displayed in the broadcast stream.
*/
await gapi.client.youtube.liveBroadcasts.control({ id: "id", part: "part",  });

/*
Deletes a broadcast.
*/
await gapi.client.youtube.liveBroadcasts.delete({ id: "id",  });

/*
Creates a broadcast.
*/
await gapi.client.youtube.liveBroadcasts.insert({ part: "part",  });

/*
Returns a list of YouTube broadcasts that match the API request parameters.
*/
await gapi.client.youtube.liveBroadcasts.list({ part: "part",  });

/*
Changes the status of a YouTube live broadcast and initiates any processes associated with the new status. For example, when you transition a broadcast's status to testing, YouTube starts to transmit video to that broadcast's monitor stream. Before calling this method, you should confirm that the value of the status.streamStatus property for the stream bound to your broadcast is active.
*/
await gapi.client.youtube.liveBroadcasts.transition({ broadcastStatus: "broadcastStatus", id: "id", part: "part",  });

/*
Updates a broadcast. For example, you could modify the broadcast settings defined in the liveBroadcast resource's contentDetails object.
*/
await gapi.client.youtube.liveBroadcasts.update({ part: "part",  });

/*
Removes a chat ban.
*/
await gapi.client.youtube.liveChatBans.delete({ id: "id",  });

/*
Adds a new ban to the chat.
*/
await gapi.client.youtube.liveChatBans.insert({ part: "part",  });

/*
Deletes a chat message.
*/
await gapi.client.youtube.liveChatMessages.delete({ id: "id",  });

/*
Adds a message to a live chat.
*/
await gapi.client.youtube.liveChatMessages.insert({ part: "part",  });

/*
Lists live chat messages for a specific chat.
*/
await gapi.client.youtube.liveChatMessages.list({ liveChatId: "liveChatId", part: "part",  });

/*
Removes a chat moderator.
*/
await gapi.client.youtube.liveChatModerators.delete({ id: "id",  });

/*
Adds a new moderator for the chat.
*/
await gapi.client.youtube.liveChatModerators.insert({ part: "part",  });

/*
Lists moderators for a live chat.
*/
await gapi.client.youtube.liveChatModerators.list({ liveChatId: "liveChatId", part: "part",  });

/*
Deletes a video stream.
*/
await gapi.client.youtube.liveStreams.delete({ id: "id",  });

/*
Creates a video stream. The stream enables you to send your video to YouTube, which can then broadcast the video to your audience.
*/
await gapi.client.youtube.liveStreams.insert({ part: "part",  });

/*
Returns a list of video streams that match the API request parameters.
*/
await gapi.client.youtube.liveStreams.list({ part: "part",  });

/*
Updates a video stream. If the properties that you want to change cannot be updated, then you need to create a new stream with the proper settings.
*/
await gapi.client.youtube.liveStreams.update({ part: "part",  });

/*
Lists members for a channel.
*/
await gapi.client.youtube.members.list({ part: "part",  });

/*
Lists pricing levels for a channel.
*/
await gapi.client.youtube.membershipsLevels.list({ part: "part",  });

/*
Deletes a playlist item.
*/
await gapi.client.youtube.playlistItems.delete({ id: "id",  });

/*
Adds a resource to a playlist.
*/
await gapi.client.youtube.playlistItems.insert({ part: "part",  });

/*
Returns a collection of playlist items that match the API request parameters. You can retrieve all of the playlist items in a specified playlist or retrieve one or more playlist items by their unique IDs.
*/
await gapi.client.youtube.playlistItems.list({ part: "part",  });

/*
Modifies a playlist item. For example, you could update the item's position in the playlist.
*/
await gapi.client.youtube.playlistItems.update({ part: "part",  });

/*
Deletes a playlist.
*/
await gapi.client.youtube.playlists.delete({ id: "id",  });

/*
Creates a playlist.
*/
await gapi.client.youtube.playlists.insert({ part: "part",  });

/*
Returns a collection of playlists that match the API request parameters. For example, you can retrieve all playlists that the authenticated user owns, or you can retrieve one or more playlists by their unique IDs.
*/
await gapi.client.youtube.playlists.list({ part: "part",  });

/*
Modifies a playlist. For example, you could change a playlist's title, description, or privacy status.
*/
await gapi.client.youtube.playlists.update({ part: "part",  });

/*
Returns a collection of search results that match the query parameters specified in the API request. By default, a search result set identifies matching video, channel, and playlist resources, but you can also configure queries to only retrieve a specific type of resource.
*/
await gapi.client.youtube.search.list({ part: "part",  });

/*
Lists sponsors for a channel.
*/
await gapi.client.youtube.sponsors.list({ part: "part",  });

/*
Deletes a subscription.
*/
await gapi.client.youtube.subscriptions.delete({ id: "id",  });

/*
Adds a subscription for the authenticated user's channel.
*/
await gapi.client.youtube.subscriptions.insert({ part: "part",  });

/*
Returns subscription resources that match the API request criteria.
*/
await gapi.client.youtube.subscriptions.list({ part: "part",  });

/*
Lists Super Chat events for a channel.
*/
await gapi.client.youtube.superChatEvents.list({ part: "part",  });

/*
Deletes a third-party account link.
*/
await gapi.client.youtube.thirdPartyLink.delete({ linkingToken: "linkingToken", type: "type",  });

/*
Creates a third-party account link.
*/
await gapi.client.youtube.thirdPartyLink.insert({ part: "part",  });

/*
Modifies a third-party account link. For example, you could change a third-party account link's type.
*/
await gapi.client.youtube.thirdPartyLink.update({ part: "part",  });

/*
Returns a collection of third-party account links that match the API request parameters. For example, you can retrieve all links that the authenticated user owns, or you can retrieve one or more links by their unique IDs.
*/
await gapi.client.youtube.thirdPartyLinks.list({ part: "part",  });

/*
Uploads a custom video thumbnail to YouTube and sets it for a video.
*/
await gapi.client.youtube.thumbnails.set({ videoId: "videoId",  });

/*
Returns a list of abuse reasons that can be used for reporting abusive videos.
*/
await gapi.client.youtube.videoAbuseReportReasons.list({ part: "part",  });

/*
Returns a list of categories that can be associated with YouTube videos.
*/
await gapi.client.youtube.videoCategories.list({ part: "part",  });

/*
Deletes a YouTube video.
*/
await gapi.client.youtube.videos.delete({ id: "id",  });

/*
Retrieves the ratings that the authorized user gave to a list of specified videos.
*/
await gapi.client.youtube.videos.getRating({ id: "id",  });

/*
Uploads a video to YouTube and optionally sets the video's metadata.
*/
await gapi.client.youtube.videos.insert({ part: "part",  });

/*
Returns a list of videos that match the API request parameters.
*/
await gapi.client.youtube.videos.list({ part: "part",  });

/*
Add a like or dislike rating to a video or remove a rating from a video.
*/
await gapi.client.youtube.videos.rate({ id: "id", rating: "rating",  });

/*
Report abuse for a video.
*/
await gapi.client.youtube.videos.reportAbuse({  });

/*
Updates a video's metadata.
*/
await gapi.client.youtube.videos.update({ part: "part",  });

/*
Uploads a watermark image to YouTube and sets it for a channel.
*/
await gapi.client.youtube.watermarks.set({ channelId: "channelId",  });

/*
Deletes a channel's watermark image.
*/
await gapi.client.youtube.watermarks.unset({ channelId: "channelId",  });
```
