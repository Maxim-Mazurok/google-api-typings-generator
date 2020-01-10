# TypeScript typings for Google+ Domains API v1
Builds on top of the Google+ platform for Google Apps Domains.
For detailed description please check [documentation](https://developers.google.com/+/domains/).

## Installing

Install typings for Google+ Domains API:
```
npm install @types/gapi.client.plusdomains@v1 --save-dev
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
gapi.client.load('plusdomains', 'v1', () => {
    // now we can use gapi.client.plusdomains
    // ... 
});
```

Don't forget to authenticate your client before sending any request to resources:
```typescript

// declare client_id registered in Google Developers Console
var client_id = '',
    scope = [     
        // View your circles and the people and pages in them
        'https://www.googleapis.com/auth/plus.circles.read',
    
        // View your basic profile info, including your age range and language
        'https://www.googleapis.com/auth/plus.login',
    
        // Associate you with your personal info on Google
        'https://www.googleapis.com/auth/plus.me',
    
        // Send your photos and videos to Google+
        'https://www.googleapis.com/auth/plus.media.upload',
    
        // View your own Google+ profile and profiles visible to you
        'https://www.googleapis.com/auth/plus.profiles.read',
    
        // View your Google+ posts, comments, and stream
        'https://www.googleapis.com/auth/plus.stream.read',
    
        // View your email address
        'https://www.googleapis.com/auth/userinfo.email',
    
        // See your personal info, including any personal info you've made publicly available
        'https://www.googleapis.com/auth/userinfo.profile',
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

After that you can use Google+ Domains API resources:

```typescript 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.activities.get({ activityId: "activityId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.activities.list({ collection: "collection", userId: "userId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.audiences.list({ userId: "userId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.circles.list({ userId: "userId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.comments.get({ commentId: "commentId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.comments.list({ activityId: "activityId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.media.insert({ collection: "collection", userId: "userId",  }); 
    
/* 
Get a person's profile.  
*/
await gapi.client.people.get({ userId: "userId",  }); 
    
/* 
List all of the people in the specified collection.  
*/
await gapi.client.people.list({ collection: "collection", userId: "userId",  }); 
    
/* 
Shut down. See https://developers.google.com/+/api-shutdown for more details.  
*/
await gapi.client.people.listByActivity({ activityId: "activityId", collection: "collection",  });
```
