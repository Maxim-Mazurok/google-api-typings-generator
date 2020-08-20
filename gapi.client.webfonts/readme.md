# TypeScript typings for Web Fonts Developer API v1

The Google Web Fonts Developer API lets you retrieve information about web fonts served by Google.
For detailed description please check [documentation](https://developers.google.com/fonts/docs/developer_api).

## Installing

Install typings for Web Fonts Developer API:

```
npm install @types/gapi.client.webfonts@v1 --save-dev
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
gapi.client.load('webfonts', 'v1', () => {
  // now we can use gapi.client.webfonts
  // ...
});
```



After that you can use Web Fonts Developer API resources:

```typescript

/*
Retrieves the list of fonts currently served by the Google Fonts Developer API.
*/
await gapi.client.webfonts.webfonts.list({  });
```
