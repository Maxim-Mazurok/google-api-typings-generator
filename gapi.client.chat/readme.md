# TypeScript typings for Hangouts Chat API v1

Enables bots to fetch information and perform actions in Hangouts Chat.
For detailed description please check [documentation](https://developers.google.com/hangouts/chat).

## Installing

Install typings for Hangouts Chat API:

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



After that you can use Hangouts Chat API resources:

```typescript

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.dms.messages({ parent: "parent",  });

/*
Downloads media. Download is supported on the URI `/v1/media/{+name}?alt=media`.
*/
await gapi.client.chat.media.download({ resourceName: "resourceName",  });

/*
Legacy path for creating message. Calling these will result in a BadRequest response.
*/
await gapi.client.chat.rooms.messages({ parent: "parent",  });

/*
Returns a space.
*/
await gapi.client.chat.spaces.get({ name: "name",  });

/*
Lists spaces the caller is a member of.
*/
await gapi.client.chat.spaces.list({  });
```
