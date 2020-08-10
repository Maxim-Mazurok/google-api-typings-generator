# TypeScript typings for Semantic Tile API v1

Serves vector tiles containing geospatial data. 
For detailed description please check [documentation](https://developers.google.com/maps/contact-sales/).

## Installing

Install typings for Semantic Tile API:

```
npm install @types/gapi.client.vectortile@v1 --save-dev
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
gapi.client.load('vectortile', 'v1', () => {
  // now we can use gapi.client.vectortile
  // ...
});
```



After that you can use Semantic Tile API resources:

```typescript

/*
Gets a feature tile by its tile resource name.
*/
await gapi.client.vectortile.featuretiles.get({ name: "name",  });

/*
Gets a terrain tile by its tile resource name.
*/
await gapi.client.vectortile.terraintiles.get({ name: "name",  });
```
