# TypeScript typings for Google+ API v1

Builds on top of the Google+ platform.
For detailed description please check [documentation](https://developers.google.com/+/api/).

## Installing

Install typings for Google+ API:

```
npm install @types/gapi.client.plus@v1 --save-dev
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
gapi.client.load('plus', 'v1', () => {
  // now we can use gapi.client.plus
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View your basic profile info, including your age range and language
      'https://www.googleapis.com/auth/plus.login',

      // Associate you with your personal info on Google
      'https://www.googleapis.com/auth/plus.me',

      // View your email address
      'https://www.googleapis.com/auth/userinfo.email',

      // See your personal info, including any personal info you've made publicly available
      'https://www.googleapis.com/auth/userinfo.profile',
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

After that you can use Google+ API resources:

```typescript

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.activities.get({ activityId: "activityId",  });

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.activities.list({ collection: "collection", userId: "userId",  });

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.activities.search({ query: "query",  });

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.comments.get({ commentId: "commentId",  });

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.comments.list({ activityId: "activityId",  });

/*
Get a person's profile. If your app uses scope https://www.googleapis.com/auth/plus.login, this method is guaranteed to return ageRange and language.
*/
await gapi.client.plus.people.get({ userId: "userId",  });

/*
List all of the people in the specified collection.
*/
await gapi.client.plus.people.list({ collection: "collection", userId: "userId",  });

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.people.listByActivity({ activityId: "activityId", collection: "collection",  });

/*
Shut down. See https://developers.google.com/+/api-shutdown for more details.
*/
await gapi.client.plus.people.search({ query: "query",  });
```
