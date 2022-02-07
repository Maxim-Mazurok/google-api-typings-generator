# TypeScript typings for Google Play Integrity API v1

Play Integrity
For detailed description please check [documentation](https://developer.android.com/google/play/integrity).

## Installing

Install typings for Google Play Integrity API:

```
npm install @types/gapi.client.playintegrity@v1 --save-dev
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
gapi.client.load('playintegrity', 'v1', () => {
  // now we can use gapi.client.playintegrity
  // ...
});
```



After that you can use Google Play Integrity API resources:

```typescript
```
