# TypeScript typings for My Business Place Actions API v1

The My Business Place Actions API provides an interface for managing place action links of a location on Google.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Place Actions API:

```
npm install @types/gapi.client.mybusinessplaceactions@v1 --save-dev
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
gapi.client.load('mybusinessplaceactions', 'v1', () => {
  // now we can use gapi.client.mybusinessplaceactions
  // ...
});
```



After that you can use My Business Place Actions API resources:

```typescript

/*
Returns the list of available place action types for a location or country.
*/
await gapi.client.mybusinessplaceactions.placeActionTypeMetadata.list({  });
```
