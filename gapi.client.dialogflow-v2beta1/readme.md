# TypeScript typings for Dialogflow API v2beta1

Builds conversational interfaces (for example, chatbots, and voice-powered apps and devices).
For detailed description please check [documentation](https://cloud.google.com/dialogflow/).

## Installing

Install typings for Dialogflow API:

```
npm install @types/gapi.client.dialogflow-v2beta1 --save-dev
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
gapi.client.load('https://dialogflow.googleapis.com/$discovery/rest?version=v2beta1', () => {
  // now we can use:
  // gapi.client.dialogflow
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('dialogflow', 'v2beta1', () => {
  // now we can use:
  // gapi.client.dialogflow
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View, manage and query your Dialogflow agents
      'https://www.googleapis.com/auth/dialogflow',
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

After that you can use Dialogflow API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Deletes the specified agent.
*/
await gapi.client.dialogflow.projects.deleteAgent({ parent: "parent",  });

/*
Retrieves the specified agent.
*/
await gapi.client.dialogflow.projects.getAgent({ parent: "parent",  });

/*
Creates/updates the specified agent. Note: You should always train an agent prior to sending it queries. See the [training documentation](https://cloud.google.com/dialogflow/es/docs/training).
*/
await gapi.client.dialogflow.projects.setAgent({ parent: "parent",  });
```
