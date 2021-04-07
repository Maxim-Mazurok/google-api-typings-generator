# TypeScript typings for My Business Lodging API v1

The My Business Lodging API enables managing lodging business information on Google.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Lodging API:

```
npm install @types/gapi.client.mybusinesslodging@v1 --save-dev
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
gapi.client.load('mybusinesslodging', 'v1', () => {
  // now we can use gapi.client.mybusinesslodging
  // ...
});
```



After that you can use My Business Lodging API resources:

```typescript

/*
Returns the Lodging of a specific location.
*/
await gapi.client.mybusinesslodging.locations.getLodging({ name: "name",  });

/*
Updates the Lodging of a specific location.
*/
await gapi.client.mybusinesslodging.locations.updateLodging({ name: "name",  });
```
