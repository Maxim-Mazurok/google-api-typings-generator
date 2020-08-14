# TypeScript typings for AI Platform Training & Prediction API v1

An API to enable creating and using machine learning models.
For detailed description please check [documentation](https://cloud.google.com/ml/).

## Installing

Install typings for AI Platform Training & Prediction API:

```
npm install @types/gapi.client.ml@v1 --save-dev
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
gapi.client.load('ml', 'v1', () => {
  // now we can use gapi.client.ml
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use AI Platform Training & Prediction API resources:

```typescript

/*
Performs explanation on the data in the request. {% dynamic include "/ai-platform/includes/___explain-request" %} 
*/
await gapi.client.ml.projects.explain({ name: "name",  });

/*
Get the service account information associated with your project. You need this information in order to grant the service account permissions for the Google Cloud Storage location where you put your model training code for training the model with Google Cloud Machine Learning.
*/
await gapi.client.ml.projects.getConfig({ name: "name",  });

/*
Performs online prediction on the data in the request. {% dynamic include "/ai-platform/includes/___predict-request" %} 
*/
await gapi.client.ml.projects.predict({ name: "name",  });
```
