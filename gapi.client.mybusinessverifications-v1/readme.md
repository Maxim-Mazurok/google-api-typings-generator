# TypeScript typings for My Business Verifications API v1

The My Business Verifications API provides an interface for taking verifications related actions for locations.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Verifications API:

```
npm install @types/gapi.client.mybusinessverifications-v1 --save-dev
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
gapi.client.load('https://mybusinessverifications.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.mybusinessverifications
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('mybusinessverifications', 'v1', () => {
  // now we can use:
  // gapi.client.mybusinessverifications
});
```



After that you can use My Business Verifications API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Reports all eligible verification options for a location in a specific language.
*/
await gapi.client.mybusinessverifications.locations.fetchVerificationOptions({ location: "location",  });

/*
Gets the VoiceOfMerchant state.
*/
await gapi.client.mybusinessverifications.locations.getVoiceOfMerchantState({ name: "name",  });

/*
Starts the verification process for a location.
*/
await gapi.client.mybusinessverifications.locations.verify({ name: "name",  });

/*
Generates a token for the provided location data as a vetted [partner](https://support.google.com/business/answer/7674102). Throws PERMISSION_DENIED if the caller is not a vetted partner account. Throws FAILED_PRECONDITION if the caller's VettedStatus is INVALID.
*/
await gapi.client.mybusinessverifications.verificationTokens.generate({  });
```
