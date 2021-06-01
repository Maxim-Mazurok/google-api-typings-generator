# TypeScript typings for Idea Hub API v1alpha


For detailed description please check [documentation](https://console.cloud.google.com/apis/library/ideahub.googleapis.com).

## Installing

Install typings for Idea Hub API:

```
npm install @types/gapi.client.ideahub@v1alpha --save-dev
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
gapi.client.load('ideahub', 'v1alpha', () => {
  // now we can use gapi.client.ideahub
  // ...
});
```



After that you can use Idea Hub API resources:

```typescript

/*
List ideas for a given Creator and filter and sort options.
*/
await gapi.client.ideahub.ideas.list({  });
```
