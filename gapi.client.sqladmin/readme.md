# TypeScript typings for Cloud SQL Admin API v1

API for Cloud SQL database instance management
For detailed description please check [documentation](https://developers.google.com/cloud-sql/).

## Installing

Install typings for Cloud SQL Admin API:

```
npm install @types/gapi.client.sqladmin@v1 --save-dev
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
gapi.client.load('sqladmin', 'v1', () => {
  // now we can use gapi.client.sqladmin
  // ...
});
```



After that you can use Cloud SQL Admin API resources:

```typescript
```
