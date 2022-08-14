# TypeScript typings for Cloud Vision API v1p2beta1

Integrates Google Vision features, including image labeling, face, logo, and landmark detection, optical character recognition (OCR), and detection of explicit content, into applications.
For detailed description please check [documentation](https://cloud.google.com/vision/).

## Installing

Install typings for Cloud Vision API:

```
npm install @types/gapi.client.vision-v1p2beta1 --save-dev
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
gapi.client.load('https://vision.googleapis.com/$discovery/rest?version=v1p2beta1', () => {
  // now we can use:
  // gapi.client.vision
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('vision', 'v1p2beta1', () => {
  // now we can use:
  // gapi.client.vision
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Apply machine learning models to understand and label images
      'https://www.googleapis.com/auth/cloud-vision',
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

After that you can use Cloud Vision API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Service that performs image detection and annotation for a batch of files. Now only "application/pdf", "image/tiff" and "image/gif" are supported. This service will extract at most 5 (customers can specify which 5 in AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each file provided and perform detection and annotation for each image extracted.
*/
await gapi.client.vision.files.annotate({  });

/*
Run asynchronous image detection and annotation for a list of generic files, such as PDF files, which may contain multiple pages and multiple images per page. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateFilesResponse` (results).
*/
await gapi.client.vision.files.asyncBatchAnnotate({  });

/*
Run image detection and annotation for a batch of images.
*/
await gapi.client.vision.images.annotate({  });

/*
Run asynchronous image detection and annotation for a list of images. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `OperationMetadata` (metadata). `Operation.response` contains `AsyncBatchAnnotateImagesResponse` (results). This service will write image annotation outputs to json files in customer GCS bucket, each json file containing BatchAnnotateImagesResponse proto.
*/
await gapi.client.vision.images.asyncBatchAnnotate({  });
```
