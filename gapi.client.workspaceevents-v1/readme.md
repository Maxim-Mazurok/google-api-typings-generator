# TypeScript typings for Google Workspace Events API v1

The Google Workspace Events API lets you subscribe to events and manage change notifications across Google Workspace applications.
For detailed description please check [documentation](https://developers.google.com/workspace/events).

## Installing

Install typings for Google Workspace Events API:

```
npm install @types/gapi.client.workspaceevents-v1 --save-dev
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
gapi.client.load(
  'https://workspaceevents.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('workspaceevents', 'v1', () => {
  // now we can use:
});
```

After that you can use Google Workspace Events API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
