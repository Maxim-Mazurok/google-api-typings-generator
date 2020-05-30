# TypeScript typings for Google Play Game Services Publishing API v1configuration

The Google Play Game Services Publishing API allows developers to configure their games in Game Services.
For detailed description please check [documentation](https://developers.google.com/games/).

## Installing

Install typings for Google Play Game Services Publishing API:

```
npm install @types/gapi.client.gamesconfiguration@v1configuration --save-dev
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
gapi.client.load('gamesconfiguration', 'v1configuration', () => {
  // now we can use gapi.client.gamesconfiguration
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your Google Play Developer account
      'https://www.googleapis.com/auth/androidpublisher',
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

After that you can use Google Play Game Services Publishing API resources:

```typescript

/*
Delete the achievement configuration with the given ID.
*/
await gapi.client.gamesconfiguration.achievementConfigurations.delete({ achievementId: "achievementId",  });

/*
Retrieves the metadata of the achievement configuration with the given ID.
*/
await gapi.client.gamesconfiguration.achievementConfigurations.get({ achievementId: "achievementId",  });

/*
Insert a new achievement configuration in this application.
*/
await gapi.client.gamesconfiguration.achievementConfigurations.insert({ applicationId: "applicationId",  });

/*
Returns a list of the achievement configurations in this application.
*/
await gapi.client.gamesconfiguration.achievementConfigurations.list({ applicationId: "applicationId",  });

/*
Update the metadata of the achievement configuration with the given ID.
*/
await gapi.client.gamesconfiguration.achievementConfigurations.update({ achievementId: "achievementId",  });

/*
Uploads an image for a resource with the given ID and image type.
*/
await gapi.client.gamesconfiguration.imageConfigurations.upload({ imageType: "imageType", resourceId: "resourceId",  });

/*
Delete the leaderboard configuration with the given ID.
*/
await gapi.client.gamesconfiguration.leaderboardConfigurations.delete({ leaderboardId: "leaderboardId",  });

/*
Retrieves the metadata of the leaderboard configuration with the given ID.
*/
await gapi.client.gamesconfiguration.leaderboardConfigurations.get({ leaderboardId: "leaderboardId",  });

/*
Insert a new leaderboard configuration in this application.
*/
await gapi.client.gamesconfiguration.leaderboardConfigurations.insert({ applicationId: "applicationId",  });

/*
Returns a list of the leaderboard configurations in this application.
*/
await gapi.client.gamesconfiguration.leaderboardConfigurations.list({ applicationId: "applicationId",  });

/*
Update the metadata of the leaderboard configuration with the given ID.
*/
await gapi.client.gamesconfiguration.leaderboardConfigurations.update({ leaderboardId: "leaderboardId",  });
```
