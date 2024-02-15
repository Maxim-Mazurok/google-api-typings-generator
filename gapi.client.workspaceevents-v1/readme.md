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
  }
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
    // Private Service: https://www.googleapis.com/auth/chat.bot
    'https://www.googleapis.com/auth/chat.bot',

    // View, add, and remove members from conversations in Google Chat
    'https://www.googleapis.com/auth/chat.memberships',

    // View members in Google Chat conversations.
    'https://www.googleapis.com/auth/chat.memberships.readonly',

    // View, compose, send, update, and delete messages, and add, view, and delete reactions to messages.
    'https://www.googleapis.com/auth/chat.messages',

    // View, add, and delete reactions to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions',

    // View reactions to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions.readonly',

    // View messages and reactions in Google Chat
    'https://www.googleapis.com/auth/chat.messages.readonly',

    // Create conversations and spaces and see or edit metadata (including history settings and access settings) in Google Chat
    'https://www.googleapis.com/auth/chat.spaces',

    // View chat and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.spaces.readonly',
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

After that you can use Google Workspace Events API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.workspaceevents.operations.get({name: 'name'});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Creates a Google Workspace subscription. To learn how to use this method, see [Create a Google Workspace subscription](https://developers.google.com/workspace/events/guides/create-subscription).
*/
await gapi.client.workspaceevents.subscriptions.create({});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Deletes a Google Workspace subscription. To learn how to use this method, see [Delete a Google Workspace subscription](https://developers.google.com/workspace/events/guides/delete-subscription).
*/
await gapi.client.workspaceevents.subscriptions.delete({name: 'name'});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Gets details about a Google Workspace subscription. To learn how to use this method, see [Get details about a Google Workspace subscription](https://developers.google.com/workspace/events/guides/get-subscription).
*/
await gapi.client.workspaceevents.subscriptions.get({name: 'name'});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Lists Google Workspace subscriptions. To learn how to use this method, see [List Google Workspace subscriptions](https://developers.google.com/workspace/events/guides/list-subscriptions).
*/
await gapi.client.workspaceevents.subscriptions.list({});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Updates or renews a Google Workspace subscription. To learn how to use this method, see [Update or renew a Google Workspace subscription](https://developers.google.com/workspace/events/guides/update-subscription).
*/
await gapi.client.workspaceevents.subscriptions.patch({name: 'name'});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Reactivates a suspended Google Workspace subscription. This method resets your subscription's `State` field to `ACTIVE`. Before you use this method, you must fix the error that suspended the subscription. To learn how to use this method, see [Reactivate a Google Workspace subscription](https://developers.google.com/workspace/events/guides/reactivate-subscription).
*/
await gapi.client.workspaceevents.subscriptions.reactivate({name: 'name'});
```
