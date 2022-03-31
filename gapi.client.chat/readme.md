# TypeScript typings for Google Chat API v1

Enables apps to fetch information and perform actions in Google Chat. Authentication using a service account is a prerequisite for using the Google Chat REST API.
For detailed description please check [documentation](https://developers.google.com/hangouts/chat).

## Installing

Install typings for Google Chat API:

```
npm install @types/gapi.client.chat@v1 --save-dev
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
gapi.client.load('chat', 'v1', () => {
  // now we can use gapi.client.chat
  // ...
});
```



After that you can use Google Chat API resources:

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
Returns a space. Requires [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts).
*/
await gapi.client.chat.spaces.get({ name: "name",  });

/*
Lists spaces the caller is a member of. Requires [service account authentication](https://developers.google.com/chat/api/guides/auth/service-accounts).
*/
await gapi.client.chat.spaces.list({  });

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.spaces.webhooks({ parent: "parent",  });
```
