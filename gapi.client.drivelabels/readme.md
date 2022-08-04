# TypeScript typings for Drive Labels API v2

An API for managing Drive Labels
For detailed description please check [documentation](https://developers.google.com/drive/labels).

## Installing

Install typings for Drive Labels API:

```
npm install @types/gapi.client.drivelabels@v2 --save-dev
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
gapi.client.load('drivelabels', 'v2', () => {
  // now we can use gapi.client.drivelabels
  // ...
});
```



After that you can use Drive Labels API resources:

```typescript

/*
Get a label by its resource name. Resource name may be any of: * `labels/{id}` - See `labels/{id}@latest` * `labels/{id}@latest` - Gets the latest revision of the label. * `labels/{id}@published` - Gets the current published revision of the label. * `labels/{id}@{revision_id}` - Gets the label at the specified revision ID.
*/
await gapi.client.drivelabels.labels.get({ name: "name",  });

/*
List labels.
*/
await gapi.client.drivelabels.labels.list({  });
```
