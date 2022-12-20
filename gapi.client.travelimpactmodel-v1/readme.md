# TypeScript typings for Travel Impact Model API v1

Travel Impact Model API lets you query travel carbon emission estimates.
For detailed description please check [documentation](https://developers.google.com/travel/impact-model).

## Installing

Install typings for Travel Impact Model API:

```
npm install @types/gapi.client.travelimpactmodel-v1 --save-dev
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
gapi.client.load('https://travelimpactmodel.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.travelimpactmodel
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('travelimpactmodel', 'v1', () => {
  // now we can use:
  // gapi.client.travelimpactmodel
});
```



After that you can use Travel Impact Model API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Stateless method to retrieve emission estimates. Details on how emission estimates are computed: https://github.com/google/travel-impact-model The response will contain all entries that match the input flight legs, in the same order. If there are no estimates available for a certain flight leg, the response will return the flight leg object with empty emission fields. The request will still be considered successful. Reasons for missing emission estimates include: - The flight is unknown to the server. - The input flight leg is missing one or more identifiers. - The flight date is in the past. - The aircraft type is not supported by the model. - Missing seat configuration. The request can contain up to 1000 flight legs. If the request has more than 1000 direct flights, if will fail with an INVALID_ARGUMENT error.
*/
await gapi.client.travelimpactmodel.flights.computeFlightEmissions({  });
```
