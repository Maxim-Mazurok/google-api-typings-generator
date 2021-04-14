# TypeScript typings for Cloud Talent Solution API v4

Cloud Talent Solution provides the capability to create, read, update, and delete job postings, as well as search jobs based on keywords and filters. 
For detailed description please check [documentation](https://cloud.google.com/talent-solution/job-search/docs/).

## Installing

Install typings for Cloud Talent Solution API:

```
npm install @types/gapi.client.jobs@v4 --save-dev
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
gapi.client.load('jobs', 'v4', () => {
  // now we can use gapi.client.jobs
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, configure, and delete your Google Cloud Platform data
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

After that you can use Cloud Talent Solution API resources:

```typescript
```
