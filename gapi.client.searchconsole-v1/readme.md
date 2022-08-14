# TypeScript typings for Google Search Console API v1

The Search Console API provides access to both Search Console data (verified users only) and to public information on an URL basis (anyone)
For detailed description please check [documentation](https://developers.google.com/webmaster-tools/search-console-api/).

## Installing

Install typings for Google Search Console API:

```
npm install @types/gapi.client.searchconsole-v1 --save-dev
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
gapi.client.load('https://searchconsole.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.searchconsole
  // gapi.client.webmasters
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('searchconsole', 'v1', () => {
  // now we can use:
  // gapi.client.searchconsole
  // gapi.client.webmasters
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage Search Console data for your verified sites
      'https://www.googleapis.com/auth/webmasters',

      // View Search Console data for your verified sites
      'https://www.googleapis.com/auth/webmasters.readonly',
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

After that you can use Google Search Console API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Query your data with filters and parameters that you define. Returns zero or more rows grouped by the row keys that you define. You must define a date range of one or more days. When date is one of the group by values, any days without data are omitted from the result list. If you need to know which days have data, issue a broad date range query grouped by date for any metric, and see which day rows are returned.
*/
await gapi.client.webmasters.searchanalytics.query({ siteUrl: "siteUrl",  });

/*
Deletes a sitemap from the Sitemaps report. Does not stop Google from crawling this sitemap or the URLs that were previously crawled in the deleted sitemap.
*/
await gapi.client.webmasters.sitemaps.delete({ feedpath: "feedpath", siteUrl: "siteUrl",  });

/*
Retrieves information about a specific sitemap.
*/
await gapi.client.webmasters.sitemaps.get({ feedpath: "feedpath", siteUrl: "siteUrl",  });

/*
 Lists the [sitemaps-entries](/webmaster-tools/v3/sitemaps) submitted for this site, or included in the sitemap index file (if `sitemapIndex` is specified in the request).
*/
await gapi.client.webmasters.sitemaps.list({ siteUrl: "siteUrl",  });

/*
Submits a sitemap for a site.
*/
await gapi.client.webmasters.sitemaps.submit({ feedpath: "feedpath", siteUrl: "siteUrl",  });

/*
 Adds a site to the set of the user's sites in Search Console.
*/
await gapi.client.webmasters.sites.add({ siteUrl: "siteUrl",  });

/*
 Removes a site from the set of the user's Search Console sites.
*/
await gapi.client.webmasters.sites.delete({ siteUrl: "siteUrl",  });

/*
 Retrieves information about specific site.
*/
await gapi.client.webmasters.sites.get({ siteUrl: "siteUrl",  });

/*
 Lists the user's Search Console sites.
*/
await gapi.client.webmasters.sites.list({  });
```
