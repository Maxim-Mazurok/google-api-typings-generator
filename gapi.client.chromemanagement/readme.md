# TypeScript typings for Chrome Management API v1

The Chrome Management API is a suite of services that allows Chrome administrators to view, manage and gain insights on their Chrome OS The Chrome Management API is a suite of services that allows GSuite domain administrators to view, manage and gain insights on their Chrome OS and Chrome Browser devices and users.
For detailed description please check [documentation](http://developers.google.com/chrome/management/).

## Installing

Install typings for Chrome Management API:

```
npm install @types/gapi.client.chromemanagement@v1 --save-dev
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
gapi.client.load('chromemanagement', 'v1', () => {
  // now we can use gapi.client.chromemanagement
  // ...
});
```



After that you can use Chrome Management API resources:

```typescript
```
