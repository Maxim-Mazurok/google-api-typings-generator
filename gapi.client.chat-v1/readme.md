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
      // View, add, and remove members from conversations in Google Chat
      'https://www.googleapis.com/auth/chat.memberships',

      // View, compose, send, update, and delete messages, and add, view, and delete reactions to messages.
      'https://www.googleapis.com/auth/chat.messages',

      // Compose and send messages in Google Chat
      'https://www.googleapis.com/auth/chat.messages.create',

      // View messages and reactions in Google Chat
      'https://www.googleapis.com/auth/chat.messages.readonly',

      // Create conversations and spaces and view or update metadata (including history settings) in Google Chat
      'https://www.googleapis.com/auth/chat.spaces',

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
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.dms.messages({ parent: "parent",  });

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.dms.webhooks({ parent: "parent",  });

/*
Downloads media. Download is supported on the URI `/v1/media/{+name}?alt=media`.
*/
await gapi.client.chat.media.download({ resourceName: "resourceName",  });

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.rooms.messages({ parent: "parent",  });

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.rooms.webhooks({ parent: "parent",  });

/*
Returns a space. Requires [authentication](https://developers.google.com/chat/api/guides/auth). Fully supports [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts). Supports [user authentication](https://developers.google.com/chat/api/guides/auth/users) as part of the [Google Workspace Developer Preview Program](https://developers.google.com/workspace/preview), which grants early access to certain features. [User authentication](https://developers.google.com/chat/api/guides/auth/users) requires the `chat.spaces` or `chat.spaces.readonly` authorization scope.
*/
await gapi.client.chat.spaces.get({ name: "name",  });

/*
Lists spaces the caller is a member of. Requires [authentication](https://developers.google.com/chat/api/guides/auth). Fully supports [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts). Supports [user authentication](https://developers.google.com/chat/api/guides/auth/users) as part of the [Google Workspace Developer Preview Program](https://developers.google.com/workspace/preview), which grants early access to certain features. [User authentication](https://developers.google.com/chat/api/guides/auth/users) requires the `chat.spaces` or `chat.spaces.readonly` authorization scope. Lists spaces visible to the caller or authenticated user. Group chats and DMs aren't listed until the first message is sent.
*/
await gapi.client.chat.spaces.list({  });

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.spaces.webhooks({ parent: "parent",  });
```
