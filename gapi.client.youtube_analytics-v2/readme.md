# TypeScript typings for YouTube Analytics API v2

Retrieves your YouTube Analytics data.
For detailed description please check [documentation](https://developers.google.com/youtube/analytics).

## Installing

Install typings for YouTube Analytics API:

```
npm install @types/gapi.client.youtube_analytics-v2 --save-dev
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
  'https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.youtubeAnalytics
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('youtubeAnalytics', 'v2', () => {
  // now we can use:
  // gapi.client.youtubeAnalytics
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Manage your YouTube account
    'https://www.googleapis.com/auth/youtube',

    // View your YouTube account
    'https://www.googleapis.com/auth/youtube.readonly',

    // View and manage your assets and associated content on YouTube
    'https://www.googleapis.com/auth/youtubepartner',

    // View monetary and non-monetary YouTube Analytics reports for your YouTube content
    'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',

    // View YouTube Analytics reports for your YouTube content
    'https://www.googleapis.com/auth/yt-analytics.readonly',
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

After that you can use YouTube Analytics API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Removes an item from a group.
*/
await gapi.client.youtubeAnalytics.groupItems.delete({});

/*
Creates a group item.
*/
await gapi.client.youtubeAnalytics.groupItems.insert({});

/*
Returns a collection of group items that match the API request parameters.
*/
await gapi.client.youtubeAnalytics.groupItems.list({});

/*
Deletes a group.
*/
await gapi.client.youtubeAnalytics.groups.delete({});

/*
Creates a group.
*/
await gapi.client.youtubeAnalytics.groups.insert({});

/*
Returns a collection of groups that match the API request parameters. For example, you can retrieve all groups that the authenticated user owns, or you can retrieve one or more groups by their unique IDs.
*/
await gapi.client.youtubeAnalytics.groups.list({});

/*
Modifies a group. For example, you could change a group's title.
*/
await gapi.client.youtubeAnalytics.groups.update({});

/*
Retrieve your YouTube Analytics reports.
*/
await gapi.client.youtubeAnalytics.reports.query({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.youtube_analytics-v2#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
