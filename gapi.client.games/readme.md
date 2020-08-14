# TypeScript typings for Google Play Game Services v1

The Google Play games service allows developers to enhance games with social leaderboards, achievements, game state, sign-in with Google, and more.
For detailed description please check [documentation](https://developers.google.com/games/).

## Installing

Install typings for Google Play Game Services:

```
npm install @types/gapi.client.games@v1 --save-dev
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
gapi.client.load('games', 'v1', () => {
  // now we can use gapi.client.games
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage its own configuration data in your Google Drive
      'https://www.googleapis.com/auth/drive.appdata',

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

After that you can use Google Play Game Services resources:

```typescript

/*
Lists all the achievement definitions for your application.
*/
await gapi.client.games.achievementDefinitions.list({  });

/*
Increments the steps of the achievement with the given ID for the currently authenticated player.
*/
await gapi.client.games.achievements.increment({ achievementId: "achievementId", stepsToIncrement: 1,  });

/*
Lists the progress for all your application's achievements for the currently authenticated player.
*/
await gapi.client.games.achievements.list({ playerId: "playerId",  });

/*
Sets the state of the achievement with the given ID to `REVEALED` for the currently authenticated player.
*/
await gapi.client.games.achievements.reveal({ achievementId: "achievementId",  });

/*
Sets the steps for the currently authenticated player towards unlocking an achievement. If the steps parameter is less than the current number of steps that the player already gained for the achievement, the achievement is not modified.
*/
await gapi.client.games.achievements.setStepsAtLeast({ achievementId: "achievementId", steps: 1,  });

/*
Unlocks this achievement for the currently authenticated player.
*/
await gapi.client.games.achievements.unlock({ achievementId: "achievementId",  });

/*
Updates multiple achievements for the currently authenticated player.
*/
await gapi.client.games.achievements.updateMultiple({  });

/*
Retrieves the metadata of the application with the given ID. If the requested application is not available for the specified `platformType`, the returned response will not include any instance data.
*/
await gapi.client.games.applications.get({ applicationId: "applicationId",  });

/*
Indicate that the currently authenticated user is playing your application.
*/
await gapi.client.games.applications.played({  });

/*
Verifies the auth token provided with this request is for the application with the specified ID, and returns the ID of the player it was granted for.
*/
await gapi.client.games.applications.verify({ applicationId: "applicationId",  });

/*
Returns a list showing the current progress on events in this application for the currently authenticated user.
*/
await gapi.client.games.events.listByPlayer({  });

/*
Returns a list of the event definitions in this application.
*/
await gapi.client.games.events.listDefinitions({  });

/*
Records a batch of changes to the number of times events have occurred for the currently authenticated user of this application.
*/
await gapi.client.games.events.record({  });

/*
Retrieves the metadata of the leaderboard with the given ID.
*/
await gapi.client.games.leaderboards.get({ leaderboardId: "leaderboardId",  });

/*
Lists all the leaderboard metadata for your application.
*/
await gapi.client.games.leaderboards.list({  });

/*
Return the metagame configuration data for the calling application.
*/
await gapi.client.games.metagame.getMetagameConfig({  });

/*
List play data aggregated per category for the player corresponding to `playerId`.
*/
await gapi.client.games.metagame.listCategoriesByPlayer({ collection: "collection", playerId: "playerId",  });

/*
Retrieves the Player resource with the given ID. To retrieve the player for the currently authenticated user, set `playerId` to `me`.
*/
await gapi.client.games.players.get({ playerId: "playerId",  });

/*
Get the collection of players for the currently authenticated user.
*/
await gapi.client.games.players.list({ collection: "collection",  });

/*
Checks whether the games client is out of date.
*/
await gapi.client.games.revisions.check({ clientRevision: "clientRevision",  });

/*
Get high scores, and optionally ranks, in leaderboards for the currently authenticated player. For a specific time span, `leaderboardId` can be set to `ALL` to retrieve data for all leaderboards in a given time span. `NOTE: You cannot ask for 'ALL' leaderboards and 'ALL' timeSpans in the same request; only one parameter may be set to 'ALL'.
*/
await gapi.client.games.scores.get({ leaderboardId: "leaderboardId", playerId: "playerId", timeSpan: "timeSpan",  });

/*
Lists the scores in a leaderboard, starting from the top.
*/
await gapi.client.games.scores.list({ collection: "collection", leaderboardId: "leaderboardId", timeSpan: "timeSpan",  });

/*
Lists the scores in a leaderboard around (and including) a player's score.
*/
await gapi.client.games.scores.listWindow({ collection: "collection", leaderboardId: "leaderboardId", timeSpan: "timeSpan",  });

/*
Submits a score to the specified leaderboard.
*/
await gapi.client.games.scores.submit({ leaderboardId: "leaderboardId", score: "score",  });

/*
Submits multiple scores to leaderboards.
*/
await gapi.client.games.scores.submitMultiple({  });

/*
Retrieves the metadata for a given snapshot ID.
*/
await gapi.client.games.snapshots.get({ snapshotId: "snapshotId",  });

/*
Retrieves a list of snapshots created by your application for the player corresponding to the player ID.
*/
await gapi.client.games.snapshots.list({ playerId: "playerId",  });

/*
Returns engagement and spend statistics in this application for the currently authenticated user.
*/
await gapi.client.games.stats.get({  });
```
