# TypeScript typings for My Business Business Calls API v1

The My Business Business Calls API manages business calls information of a location on Google.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Business Calls API:

```
npm install @types/gapi.client.mybusinessbusinesscalls@v1 --save-dev
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
gapi.client.load('mybusinessbusinesscalls', 'v1', () => {
  // now we can use gapi.client.mybusinessbusinesscalls
  // ...
});
```



After that you can use My Business Business Calls API resources:

```typescript

/*
Returns the Business calls settings resource for the given location.
*/
await gapi.client.mybusinessbusinesscalls.locations.getBusinesscallssettings({ name: "name",  });

/*
Updates the Business call settings for the specified location.
*/
await gapi.client.mybusinessbusinesscalls.locations.updateBusinesscallssettings({ name: "name",  });
```
