# TypeScript typings for Firebase App Check API v1

Firebase App Check works alongside other Firebase services to help protect your backend resources from abuse, such as billing fraud or phishing.
For detailed description please check [documentation](https://firebase.google.com/docs/app-check).

## Installing

Install typings for Firebase App Check API:

```
npm install @types/gapi.client.firebaseappcheck@v1 --save-dev
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
gapi.client.load('firebaseappcheck', 'v1', () => {
  // now we can use gapi.client.firebaseappcheck
  // ...
});
```



After that you can use Firebase App Check API resources:

```typescript
```
