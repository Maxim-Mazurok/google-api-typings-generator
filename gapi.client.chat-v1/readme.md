# TypeScript typings for Google Chat API v1

Enables apps to fetch information and perform actions in Google Chat. Authentication is a prerequisite for using the Google Chat REST API.
For detailed description please check [documentation](https://developers.google.com/hangouts/chat).

## Installing

Install typings for Google Chat API:

```
npm install @types/gapi.client.chat-v1 --save-dev
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
gapi.client.load('https://chat.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.chat
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('chat', 'v1', () => {
  // now we can use:
  // gapi.client.chat
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Private Service: https://www.googleapis.com/auth/chat.bot
      'https://www.googleapis.com/auth/chat.bot',

      // Delete conversations and spaces & remove access to associated files in Google Chat
      'https://www.googleapis.com/auth/chat.delete',

      // Import spaces, messages, and memberships into Google Chat.
      'https://www.googleapis.com/auth/chat.import',

      // View, add, and remove members from conversations in Google Chat
      'https://www.googleapis.com/auth/chat.memberships',

      // Add and remove itself from conversations in Google Chat
      'https://www.googleapis.com/auth/chat.memberships.app',

      // View members in Google Chat conversations.
      'https://www.googleapis.com/auth/chat.memberships.readonly',

      // View, compose, send, update, and delete messages, and add, view, and delete reactions to messages.
      'https://www.googleapis.com/auth/chat.messages',

      // Compose and send messages in Google Chat
      'https://www.googleapis.com/auth/chat.messages.create',

      // View, add, and delete reactions to messages in Google Chat
      'https://www.googleapis.com/auth/chat.messages.reactions',

      // Add reactions to messages in Google Chat
      'https://www.googleapis.com/auth/chat.messages.reactions.create',

      // View reactions to messages in Google Chat
      'https://www.googleapis.com/auth/chat.messages.reactions.readonly',

      // View messages and reactions in Google Chat
      'https://www.googleapis.com/auth/chat.messages.readonly',

      // Create conversations and spaces and view or update metadata (including history settings) in Google Chat
      'https://www.googleapis.com/auth/chat.spaces',

      // Create new conversations in Google Chat
      'https://www.googleapis.com/auth/chat.spaces.create',

      // View chat and spaces in Google Chat
      'https://www.googleapis.com/auth/chat.spaces.readonly',
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

After that you can use Google Chat API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Downloads media. Download is supported on the URI `/v1/media/{+name}?alt=media`.
*/
await gapi.client.chat.media.download({ resourceName: "resourceName",  });

/*
Uploads an attachment. For an example, see [Upload media as a file attachment](https://developers.google.com/chat/api/guides/v1/media-and-attachments/upload). Requires user [authentication](https://developers.google.com/chat/api/guides/auth/users) and the `chat.messages` or `chat.messages.create` authorization scope. You can upload attachments up to 200 MB. Certain file types aren't supported. For details, see [File types blocked by Google Chat](https://support.google.com/chat/answer/7651457?&co=GENIE.Platform%3DDesktop#File%20types%20blocked%20in%20Google%20Chat).
*/
await gapi.client.chat.media.upload({ parent: "parent",  });

/*
Creates a named space. Spaces grouped by topics aren't supported. For an example, see [Create a space](https://developers.google.com/chat/api/guides/v1/spaces/create). Requires [user authentication](https://developers.google.com/chat/api/guides/auth/users) and the `chat.spaces.create` or `chat.spaces` scope.
*/
await gapi.client.chat.spaces.create({  });

/*
Deletes a named space. Always performs a cascading delete, which means that the space's child resources—like messages posted in the space and memberships in the space—are also deleted. For an example, see [Delete a space](https://developers.google.com/chat/api/guides/v1/spaces/delete). Requires [user authentication](https://developers.google.com/chat/api/guides/auth/users) from a user who has permission to delete the space, and the `chat.delete` scope.
*/
await gapi.client.chat.spaces.delete({ name: "name",  });

/*
Returns the existing direct message with the specified user. If no direct message space is found, returns a `404 NOT_FOUND` error. For an example, see [Find a direct message](/chat/api/guides/v1/spaces/find-direct-message). With [user authentication](https://developers.google.com/chat/api/guides/auth/users), returns the direct message space between the specified user and the authenticated user. With [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts), returns the direct message space between the specified user and the calling Chat app. Requires [user authentication](https://developers.google.com/chat/api/guides/auth/users) or [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts).
*/
await gapi.client.chat.spaces.findDirectMessage({  });

/*
Returns details about a space. For an example, see [Get a space](https://developers.google.com/chat/api/guides/v1/spaces/get). Requires [authentication](https://developers.google.com/chat/api/guides/auth). Fully supports [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts) and [user authentication](https://developers.google.com/chat/api/guides/auth/users). [User authentication](https://developers.google.com/chat/api/guides/auth/users) requires the `chat.spaces` or `chat.spaces.readonly` authorization scope.
*/
await gapi.client.chat.spaces.get({ name: "name",  });

/*
Lists spaces the caller is a member of. Group chats and DMs aren't listed until the first message is sent. For an example, see [List spaces](https://developers.google.com/chat/api/guides/v1/spaces/list). Requires [authentication](https://developers.google.com/chat/api/guides/auth). Fully supports [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts) and [user authentication](https://developers.google.com/chat/api/guides/auth/users) requires the `chat.spaces` or `chat.spaces.readonly` authorization scope. Lists spaces visible to the caller or authenticated user. Group chats and DMs aren't listed until the first message is sent.
*/
await gapi.client.chat.spaces.list({  });

/*
Updates a space. For an example, see [Update a space](https://developers.google.com/chat/api/guides/v1/spaces/update). Requires [user authentication](https://developers.google.com/chat/api/guides/auth/users) and the `chat.spaces` scope.
*/
await gapi.client.chat.spaces.patch({ name: "name",  });

/*
Creates a space and adds specified users to it. The calling user is automatically added to the space, and shouldn't be specified as a membership in the request. For an example, see [Set up a space](https://developers.google.com/chat/api/guides/v1/spaces/set-up). To specify the human members to add, add memberships with the appropriate `member.name` in the `SetUpSpaceRequest`. To add a human user, use `users/{user}`, where `{user}` can be the email address for the user. For users in the same Workspace organization `{user}` can also be the `{person_id}` for the person from the People API, or the `id` for the user in the Directory API. For example, if the People API Person `resourceName` for `user@example.com` is `people/123456789`, you can add the user to the space by setting the `membership.member.name` to `users/user@example.com` or `users/123456789`. For a space or group chat, if the caller blocks or is blocked by some members, then those members aren't added to the created space. To create a direct message (DM) between the calling user and another human user, specify exactly one membership to represent the human user. If one user blocks the other, the request fails and the DM isn't created. To create a DM between the calling user and the calling app, set `Space.singleUserBotDm` to `true` and don't specify any memberships. You can only use this method to set up a DM with the calling app. To add the calling app as a member of a space or an existing DM between two human users, see [create a membership](https://developers.google.com/chat/api/guides/v1/members/create). If a DM already exists between two users, even when one user blocks the other at the time a request is made, then the existing DM is returned. Spaces with threaded replies or guest access aren't supported. Requires [user authentication](https://developers.google.com/chat/api/guides/auth/users) and the `chat.spaces.create` or `chat.spaces` scope.
*/
await gapi.client.chat.spaces.setup({  });
```
