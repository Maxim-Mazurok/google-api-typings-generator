# TypeScript typings for PageSpeed Insights API v5
Analyzes the performance of a web page and provides tailored suggestions to make that page faster.
For detailed description please check [documentation](https://developers.google.com/speed/docs/insights/v5/get-started).

## Installing

Install typings for PageSpeed Insights API:
```
npm install @types/gapi.client.pagespeedonline@v5 --save-dev
```

## Usage

You need to initialize Google API client in your code:
```typescript
gapi.load("client", () => { 
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



After that you can use PageSpeed Insights API resources:

```typescript 
    
/* 
Runs PageSpeed analysis on the page at the specified URL, and returns PageSpeed scores, a list of suggestions to make that page faster, and other information.  
*/
await gapi.client.pagespeedapi.runpagespeed({ url: "url",  });
```
