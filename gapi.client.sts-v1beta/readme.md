# TypeScript typings for Security Token Service API v1beta

The Security Token Service exchanges Google or third-party credentials for a short-lived access token to Google Cloud resources.
For detailed description please check [documentation](http://cloud.google.com/iam/docs/workload-identity-federation).

## Installing

Install typings for Security Token Service API:

```
npm install @types/gapi.client.sts-v1beta --save-dev
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
gapi.client.load('https://sts.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.sts
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('sts', 'v1beta', () => {
  // now we can use:
  // gapi.client.sts
});
```



After that you can use Security Token Service API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Exchanges a credential for a Google OAuth 2.0 access token. The token asserts an external identity within a workload identity pool, or it applies a Credential Access Boundary to a Google access token. When you call this method, do not send the `Authorization` HTTP header in the request. This method does not require the `Authorization` header, and using the header can cause the request to fail.
*/
await gapi.client.sts.token({  });
```
