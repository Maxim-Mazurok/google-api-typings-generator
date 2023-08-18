# TypeScript typings for Discovery Engine API v1alpha

Discovery Engine API.
For detailed description please check [documentation](https://cloud.google.com/discovery-engine/docs).

## Installing

Install typings for Discovery Engine API:

```
npm install @types/gapi.client.discoveryengine-v1alpha --save-dev
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
gapi.client.load('https://discoveryengine.googleapis.com/$discovery/rest?version=v1alpha', () => {
  // now we can use:
  // gapi.client.discoveryengine
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('discoveryengine', 'v1alpha', () => {
  // now we can use:
  // gapi.client.discoveryengine
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',
    ],
    immediate = true;
// ...

gapi.auth.authorize(
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Discovery Engine API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the Widget Config using the uuid.
*/
await gapi.client.discoveryengine.locations.lookupWidgetConfig({ location: "location",  });

/*
Performs a user input completion with keyword suggestion. Similar to the CompletionService.CompleteQuery method, but a widget version that allows CompleteQuery without API Key. It supports CompleteQuery with or without JWT token.
*/
await gapi.client.discoveryengine.locations.widgetCompleteQuery({ location: "location",  });

/*
Converse a conversation with Widget.
*/
await gapi.client.discoveryengine.locations.widgetConverseConversation({ location: "location",  });

/*
Performs a search. Similar to the SearchService.Search method, but a widget version that allows search without API Key. It supports search with or without JWT token.
*/
await gapi.client.discoveryengine.locations.widgetSearch({ location: "location",  });
```
