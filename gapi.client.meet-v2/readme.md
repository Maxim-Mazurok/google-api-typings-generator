# TypeScript typings for Google Meet API v2

Create and manage meetings in Google Meet.
For detailed description please check [documentation](https://developers.google.com/meet/api).

## Installing

Install typings for Google Meet API:

```
npm install @types/gapi.client.meet-v2 --save-dev
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
  'https://meet.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.meet
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('meet', 'v2', () => {
  // now we can use:
  // gapi.client.meet
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Create, edit, and see information about your Google Meet conferences created by the app.
    'https://www.googleapis.com/auth/meetings.space.created',

    // Read information about any of your Google Meet conferences
    'https://www.googleapis.com/auth/meetings.space.readonly',

    // Edit, and see settings for all of your Google Meet calls.
    'https://www.googleapis.com/auth/meetings.space.settings',
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

After that you can use Google Meet API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets a conference record by conference ID.
*/
await gapi.client.meet.conferenceRecords.get({name: 'name'});

/*
Lists the conference records. By default, ordered by start time and in descending order.
*/
await gapi.client.meet.conferenceRecords.list({});

/*
Creates a space.
*/
await gapi.client.meet.spaces.create({});

/*
Ends an active conference (if there's one). For an example, see [End active conference](https://developers.google.com/meet/api/guides/meeting-spaces#end-active-conference).
*/
await gapi.client.meet.spaces.endActiveConference({name: 'name'});

/*
Gets details about a meeting space. For an example, see [Get a meeting space](https://developers.google.com/meet/api/guides/meeting-spaces#get-meeting-space).
*/
await gapi.client.meet.spaces.get({name: 'name'});

/*
Updates details about a meeting space. For an example, see [Update a meeting space](https://developers.google.com/meet/api/guides/meeting-spaces#update-meeting-space).
*/
await gapi.client.meet.spaces.patch({name: 'name'});
```
