# TypeScript typings for Google Play Developer Reporting API v1beta1


For detailed description please check [documentation](https://developers.google.com/play/developer/reporting).

## Installing

Install typings for Google Play Developer Reporting API:

```
npm install @types/gapi.client.playdeveloperreporting@v1beta1 --save-dev
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
gapi.client.load('playdeveloperreporting', 'v1beta1', () => {
  // now we can use gapi.client.playdeveloperreporting
  // ...
});
```



After that you can use Google Play Developer Reporting API resources:

```typescript

/*
Lists anomalies in any of the datasets.
*/
await gapi.client.playdeveloperreporting.anomalies.list({ parent: "parent",  });
```
