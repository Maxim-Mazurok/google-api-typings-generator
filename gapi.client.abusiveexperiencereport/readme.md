# TypeScript typings for Abusive Experience Report API v1
Views Abusive Experience Report data, and gets a list of sites that have a significant number of abusive experiences.
For detailed description please check [documentation](https://developers.google.com/abusive-experience-report/).

## Installing

Install typings for Abusive Experience Report API:
```
npm install @types/gapi.client.abusiveexperiencereport@v1 --save-dev
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
gapi.client.load('abusiveexperiencereport', 'v1', () => {
    // now we can use gapi.client.abusiveexperiencereport
    // ... 
});
```



After that you can use Abusive Experience Report API resources:

```typescript 
    
/* 
Gets a site's Abusive Experience Report summary.  
*/
await gapi.client.sites.get({ name: "name",  }); 
    
/* 
Lists sites that are failing in the Abusive Experience Report.  
*/
await gapi.client.violatingSites.list({  });
```
