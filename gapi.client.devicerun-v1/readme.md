# TypeScript typings for Device Run API v1

The Device Run API allows management, scheduling, and execution of automated sessions and workloads across device catalogs.
For detailed description please check [documentation](https://docs.cloud.google.com/developer-device-platform/device-run).

## Installing

Install typings for Device Run API:

```
npm install @types/gapi.client.devicerun-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["gapi", "gapi.auth2", "gapi.client", "gapi.client.devicerun-v1"]
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
  'https://devicerun.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('devicerun', 'v1', () => {
  // now we can use:
});
```

After that you can use Device Run API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.devicerun-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
