# TypeScript typings for Firebase Hosting API v1beta1
The Firebase Hosting REST API enables programmatic and customizable deployments to your Firebase-hosted sites. Use this REST API to deploy new or updated hosting configurations and content files.
For detailed description please check [documentation](https://firebase.google.com/docs/hosting/).

## Installing

Install typings for Firebase Hosting API:
```
npm install @types/gapi.client.firebasehosting@v1beta1 --save-dev
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
gapi.client.load('firebasehosting', 'v1beta1', () => {
    // now we can use gapi.client.firebasehosting
    // ... 
});
```

Don't forget to authenticate your client before sending any request to resources:
```typescript

// declare client_id registered in Google Developers Console
var client_id = '',
    scope = [     
        // View and manage your data across Google Cloud Platform services
        'https://www.googleapis.com/auth/cloud-platform',
    
        // View your data across Google Cloud Platform services
        'https://www.googleapis.com/auth/cloud-platform.read-only',
    
        // View and administer all your Firebase data and settings
        'https://www.googleapis.com/auth/firebase',
    
        // View all your Firebase data and settings
        'https://www.googleapis.com/auth/firebase.readonly',
    ],
    immediate = true;
// ...

gapi.auth.authorize({ client_id: client_id, scope: scope, immediate: immediate }, authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});            
```

After that you can use Firebase Hosting API resources:

```typescript 
    
/* 
Gets the Hosting metadata for a specific site.  
*/
await gapi.client.sites.getConfig({ name: "name",  }); 
    
/* 
Sets the Hosting metadata for a specific site.  
*/
await gapi.client.sites.updateConfig({ name: "name",  });
```
