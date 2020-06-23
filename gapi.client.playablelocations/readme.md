# TypeScript typings for Playable Locations API v3


For detailed description please check [documentation](https://developers.google.com/maps/contact-sales/).

## Installing

Install typings for Playable Locations API:

```
npm install @types/gapi.client.playablelocations@v3 --save-dev
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
gapi.client.load('playablelocations', 'v3', () => {
  // now we can use gapi.client.playablelocations
  // ...
});
```



After that you can use Playable Locations API resources:

```typescript

/*
Logs new events when playable locations are displayed, and when they are
interacted with.

Impressions are not partially saved; either all impressions are saved and
this request succeeds, or no impressions are saved, and this request fails.
*/
await gapi.client.playablelocations.v3.logImpressions({  });

/*
Logs bad playable location reports submitted by players.

Reports are not partially saved; either all reports are saved and this
request succeeds, or no reports are saved, and this request fails.
*/
await gapi.client.playablelocations.v3.logPlayerReports({  });

/*
Returns a set of playable locations that lie within a specified area,
that satisfy optional filter criteria.

Note: Identical `SamplePlayableLocations` requests can return different
results as the state of the world changes over time.
*/
await gapi.client.playablelocations.v3.samplePlayableLocations({  });
```
