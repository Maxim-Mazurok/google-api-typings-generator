# TypeScript typings for Google Workspace Events API v1

The Google Workspace Events API lets you subscribe to events and manage change notifications across Google Workspace applications.
For detailed description please check [documentation](https://developers.google.com/workspace/events).

## Installing

Install typings for Google Workspace Events API:

```
npm install @types/gapi.client.workspaceevents-v1 --save-dev
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
  'https://workspaceevents.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.workspaceevents
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('workspaceevents', 'v1', () => {
  // now we can use:
  // gapi.client.workspaceevents
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // On their own behalf, apps in Google Chat can see, add, update, and remove members from conversations and spaces
    'https://www.googleapis.com/auth/chat.app.memberships',

    // On their own behalf, apps in Google Chat can create conversations and spaces and see or update their metadata (including history settings and access settings)
    'https://www.googleapis.com/auth/chat.app.spaces',

    // Private Service: https://www.googleapis.com/auth/chat.bot
    'https://www.googleapis.com/auth/chat.bot',

    // See, add, update, and remove members from conversations and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.memberships',

    // View members in Google Chat conversations.
    'https://www.googleapis.com/auth/chat.memberships.readonly',

    // See, compose, send, update, and delete messages as well as their message content; add, see, and delete reactions to messages.
    'https://www.googleapis.com/auth/chat.messages',

    // See, add, and delete reactions as well as their reaction content to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions',

    // View reactions as well as their reaction content to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions.readonly',

    // See messages as well as their reactions and message content in Google Chat
    'https://www.googleapis.com/auth/chat.messages.readonly',

    // Create conversations and spaces and see or update metadata (including history settings and access settings) in Google Chat
    'https://www.googleapis.com/auth/chat.spaces',

    // View chat and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.spaces.readonly',

    // See, edit, create, and delete all of your Google Drive files
    'https://www.googleapis.com/auth/drive',

    // See, edit, create, and delete only the specific Google Drive files you use with this app
    'https://www.googleapis.com/auth/drive.file',

    // View and manage metadata of files in your Google Drive
    'https://www.googleapis.com/auth/drive.metadata',

    // See information about your Google Drive files
    'https://www.googleapis.com/auth/drive.metadata.readonly',

    // See and download all your Google Drive files
    'https://www.googleapis.com/auth/drive.readonly',

    // Create, edit, and see information about your Google Meet conferences created by the app.
    'https://www.googleapis.com/auth/meetings.space.created',

    // Read information about any of your Google Meet conferences
    'https://www.googleapis.com/auth/meetings.space.readonly',
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

After that you can use Google Workspace Events API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.workspaceevents.operations.get({name: 'name'});

/*
Creates a Google Workspace subscription. To learn how to use this method, see [Create a Google Workspace subscription](https://developers.google.com/workspace/events/guides/create-subscription). 
*/
await gapi.client.workspaceevents.subscriptions.create({});

/*
Deletes a Google Workspace subscription. To learn how to use this method, see [Delete a Google Workspace subscription](https://developers.google.com/workspace/events/guides/delete-subscription).
*/
await gapi.client.workspaceevents.subscriptions.delete({name: 'name'});

/*
Gets details about a Google Workspace subscription. To learn how to use this method, see [Get details about a Google Workspace subscription](https://developers.google.com/workspace/events/guides/get-subscription).
*/
await gapi.client.workspaceevents.subscriptions.get({name: 'name'});

/*
Lists Google Workspace subscriptions. To learn how to use this method, see [List Google Workspace subscriptions](https://developers.google.com/workspace/events/guides/list-subscriptions).
*/
await gapi.client.workspaceevents.subscriptions.list({});

/*
Updates or renews a Google Workspace subscription. To learn how to use this method, see [Update or renew a Google Workspace subscription](https://developers.google.com/workspace/events/guides/update-subscription).
*/
await gapi.client.workspaceevents.subscriptions.patch({name: 'name'});

/*
Reactivates a suspended Google Workspace subscription. This method resets your subscription's `State` field to `ACTIVE`. Before you use this method, you must fix the error that suspended the subscription. This method will ignore or reject any subscription that isn't currently in a suspended state. To learn how to use this method, see [Reactivate a Google Workspace subscription](https://developers.google.com/workspace/events/guides/reactivate-subscription).
*/
await gapi.client.workspaceevents.subscriptions.reactivate({name: 'name'});
```
