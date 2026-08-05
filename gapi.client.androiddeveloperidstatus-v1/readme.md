# TypeScript typings for Android Developer ID Status API v1

Android Developer ID Status API.
For detailed description please check [documentation](https://developer.android.com/developer-verification/guides/check-registration-status).

## Installing

Install typings for Android Developer ID Status API:

```
npm install @types/gapi.client.androiddeveloperidstatus-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.androiddeveloperidstatus-v1"
    ]
  }
}
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
gapi.client.load(
  'https://androiddeveloperidstatus.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.androiddeveloperidstatus
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('androiddeveloperidstatus', 'v1', () => {
  // now we can use:
  // gapi.client.androiddeveloperidstatus
});
```

After that you can use Android Developer ID Status API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.androiddeveloperidstatus-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
