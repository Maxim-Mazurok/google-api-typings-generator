# TypeScript typings for Verified Access API v1
API for Verified Access chrome extension to provide credential verification for chrome devices connecting to an enterprise network
For detailed description please check [documentation](https://www.google.com/work/chrome/).

## Installing

Install typings for Verified Access API:
```
npm install @types/gapi.client.verifiedaccess@v1 --save-dev
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
gapi.client.load('verifiedaccess', 'v1', () => {
    // now we can use gapi.client.verifiedaccess
    // ... 
});
```

Don't forget to authenticate your client before sending any request to resources:
```typescript

// declare client_id registered in Google Developers Console
var client_id = '',
    scope = [     
        // Verify your enterprise credentials
        'https://www.googleapis.com/auth/verifiedaccess',
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

After that you can use Verified Access API resources:

```typescript 
    
/* 
CreateChallenge API  
*/
await gapi.client.challenge.create({  }); 
    
/* 
VerifyChallengeResponse API  
*/
await gapi.client.challenge.verify({  });
```
