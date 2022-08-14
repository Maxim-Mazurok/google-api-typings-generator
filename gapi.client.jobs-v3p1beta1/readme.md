# TypeScript typings for Cloud Talent Solution API v3p1beta1

Cloud Talent Solution provides the capability to create, read, update, and delete job postings, as well as search jobs based on keywords and filters. 
For detailed description please check [documentation](https://cloud.google.com/talent-solution/job-search/docs/).

## Installing

Install typings for Cloud Talent Solution API:

```
npm install @types/gapi.client.jobs-v3p1beta1 --save-dev
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
gapi.client.load('https://jobs.googleapis.com/$discovery/rest?version=v3p1beta1', () => {
  // now we can use:
  // gapi.client.jobs
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('jobs', 'v3p1beta1', () => {
  // now we can use:
  // gapi.client.jobs
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Manage job postings
      'https://www.googleapis.com/auth/jobs',
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

After that you can use Cloud Talent Solution API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Completes the specified prefix with keyword suggestions. Intended for use by a job search auto-complete search box.
*/
await gapi.client.jobs.projects.complete({ name: "name",  });
```
