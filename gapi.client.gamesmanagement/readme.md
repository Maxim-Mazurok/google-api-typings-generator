# TypeScript typings for Google Play Game Management v1management

The Google Play Game Management API allows developers to manage resources from the Google Play Game service.
For detailed description please check [documentation](https://developers.google.com/games/).

## Installing

Install typings for Google Play Game Management:

```
npm install @types/gapi.client.gamesmanagement@v1management --save-dev
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
gapi.client.load('gamesmanagement', 'v1management', () => {
  // now we can use gapi.client.gamesmanagement
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Create, edit, and delete your Google Play Games activity
      'https://www.googleapis.com/auth/games',
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

After that you can use Google Play Game Management resources:

```typescript

/*
Resets the achievement with the given ID for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application.
*/
await gapi.client.gamesmanagement.achievements.reset({ achievementId: "achievementId",  });

/*
Resets all achievements for the currently authenticated player for your application. This method is only accessible to whitelisted tester accounts for your application.
*/
await gapi.client.gamesmanagement.achievements.resetAll({  });

/*
Resets all draft achievements for all players. This method is only available to user accounts for your developer console.
*/
await gapi.client.gamesmanagement.achievements.resetAllForAllPlayers({  });

/*
Resets the achievement with the given ID for all players. This method is only available to user accounts for your developer console. Only draft achievements can be reset.
*/
await gapi.client.gamesmanagement.achievements.resetForAllPlayers({ achievementId: "achievementId",  });

/*
Resets achievements with the given IDs for all players. This method is only available to user accounts for your developer console. Only draft achievements may be reset.
*/
await gapi.client.gamesmanagement.achievements.resetMultipleForAllPlayers({  });

/*
Get the list of players hidden from the given application. This method is only available to user accounts for your developer console.
*/
await gapi.client.gamesmanagement.applications.listHidden({ applicationId: "applicationId",  });

/*
Resets all player progress on the event with the given ID for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application.
*/
await gapi.client.gamesmanagement.events.reset({ eventId: "eventId",  });

/*
Resets all player progress on all events for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application.
*/
await gapi.client.gamesmanagement.events.resetAll({  });

/*
Resets all draft events for all players. This method is only available to user accounts for your developer console.
*/
await gapi.client.gamesmanagement.events.resetAllForAllPlayers({  });

/*
Resets the event with the given ID for all players. This method is only available to user accounts for your developer console. Only draft events can be reset.
*/
await gapi.client.gamesmanagement.events.resetForAllPlayers({ eventId: "eventId",  });

/*
Resets events with the given IDs for all players. This method is only available to user accounts for your developer console. Only draft events may be reset.
*/
await gapi.client.gamesmanagement.events.resetMultipleForAllPlayers({  });

/*
Hide the given player's leaderboard scores from the given application. This method is only available to user accounts for your developer console.
*/
await gapi.client.gamesmanagement.players.hide({ applicationId: "applicationId", playerId: "playerId",  });

/*
Unhide the given player's leaderboard scores from the given application. This method is only available to user accounts for your developer console.
*/
await gapi.client.gamesmanagement.players.unhide({ applicationId: "applicationId", playerId: "playerId",  });

/*
Resets scores for the leaderboard with the given ID for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application.
*/
await gapi.client.gamesmanagement.scores.reset({ leaderboardId: "leaderboardId",  });

/*
Resets all scores for all leaderboards for the currently authenticated players. This method is only accessible to whitelisted tester accounts for your application.
*/
await gapi.client.gamesmanagement.scores.resetAll({  });

/*
Resets scores for all draft leaderboards for all players. This method is only available to user accounts for your developer console.
*/
await gapi.client.gamesmanagement.scores.resetAllForAllPlayers({  });

/*
Resets scores for the leaderboard with the given ID for all players. This method is only available to user accounts for your developer console. Only draft leaderboards can be reset.
*/
await gapi.client.gamesmanagement.scores.resetForAllPlayers({ leaderboardId: "leaderboardId",  });

/*
Resets scores for the leaderboards with the given IDs for all players. This method is only available to user accounts for your developer console. Only draft leaderboards may be reset.
*/
await gapi.client.gamesmanagement.scores.resetMultipleForAllPlayers({  });
```
