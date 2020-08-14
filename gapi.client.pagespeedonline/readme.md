# TypeScript typings for PageSpeed Insights API v5

The PageSpeed Insights API lets you analyze the performance of your website with a simple API. It offers tailored suggestions for how you can optimize your site, and lets you easily integrate PageSpeed Insights analysis into your development tools and workflow. 
For detailed description please check [documentation](https://developers.google.com/speed/docs/insights/v5/about).

## Installing

Install typings for PageSpeed Insights API:

```
npm install @types/gapi.client.pagespeedonline@v5 --save-dev
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
gapi.client.load('pagespeedonline', 'v5', () => {
  // now we can use gapi.client.pagespeedonline
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Associate you with your personal info on Google
      'openid',
    ],
    immediate = true;
// ...

gapi.auth.authorize(
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use PageSpeed Insights API resources:

```typescript

/*
Runs PageSpeed analysis on the page at the specified URL, and returns PageSpeed scores, a list of suggestions to make that page faster, and other information.
*/
await gapi.client.pagespeedonline.pagespeedapi.runpagespeed({  });
```
