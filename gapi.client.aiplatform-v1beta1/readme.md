# TypeScript typings for Vertex AI API v1beta1

Train high-quality custom machine learning models with minimal machine learning expertise and effort.
For detailed description please check [documentation](https://cloud.google.com/vertex-ai/).

## Installing

Install typings for Vertex AI API:

```
npm install @types/gapi.client.aiplatform-v1beta1 --save-dev
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
  'https://aiplatform.googleapis.com/$discovery/rest?version=v1beta1',
  () => {
    // now we can use:
    // gapi.client.aiplatform
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('aiplatform', 'v1beta1', () => {
  // now we can use:
  // gapi.client.aiplatform
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View your data across Google Cloud services and see the email address of your Google Account
    'https://www.googleapis.com/auth/cloud-platform.read-only',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  }
);
```

After that you can use Vertex AI API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
