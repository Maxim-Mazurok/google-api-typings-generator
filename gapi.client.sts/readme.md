# TypeScript typings for Security Token Service API v1

The Security Token Service exchanges Google or third-party credentials for a short-lived access token to Google Cloud resources.
For detailed description please check [documentation](http://cloud.google.com/iam/docs/workload-identity-federation).

## Installing

Install typings for Security Token Service API:

```
npm install @types/gapi.client.sts@v1 --save-dev
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
gapi.client.load('sts', 'v1', () => {
  // now we can use gapi.client.sts
  // ...
});
```



After that you can use Security Token Service API resources:

```typescript

/*
Exchanges a credential for a Google OAuth 2.0 access token.
*/
await gapi.client.sts.v1.token({  });
```
