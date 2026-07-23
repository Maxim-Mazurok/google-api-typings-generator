# TypeScript typings for Google Health API v4

The Google Health API lets you view and manage health and fitness metrics and measurement data.
For detailed description please check [documentation](https://developers.google.com/health).

## Installing

Install typings for Google Health API:

```
npm install @types/gapi.client.health-v4 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["gapi", "gapi.auth2", "gapi.client", "gapi.client.health-v4"]
  }
}
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
gapi.client.load(
  'https://health.googleapis.com/$discovery/rest?version=v4',
  () => {
    // now we can use:
    // gapi.client.health
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('health', 'v4', () => {
  // now we can use:
  // gapi.client.health
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // See your Google Health activity and fitness data
    'https://www.googleapis.com/auth/googlehealth.activity_and_fitness.readonly',

    // Add activity and fitness data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.activity_and_fitness.writeonly',

    // See your Google Health ECG data
    'https://www.googleapis.com/auth/googlehealth.ecg.readonly',

    // See your Google Health health metrics and measurement data
    'https://www.googleapis.com/auth/googlehealth.health_metrics_and_measurements.readonly',

    // Add health metric and measurements data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.health_metrics_and_measurements.writeonly',

    // See your Google Health Irregular Rhythm Notifications data
    'https://www.googleapis.com/auth/googlehealth.irn.readonly',

    // See exercise GPS location data in Google Health
    'https://www.googleapis.com/auth/googlehealth.location.readonly',

    // Add exercise GPS location data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.location.writeonly',

    // Add logged symptoms data to Google Health, and edit or delete the data it adds
    'https://www.googleapis.com/auth/googlehealth.logged_symptoms.writeonly',

    // Add mindfulness data to Google Health, and edit or delete the data it adds
    'https://www.googleapis.com/auth/googlehealth.mindfulness.writeonly',

    // Add nutrition data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.nutrition.writeonly',

    // See your Google Health profile data
    'https://www.googleapis.com/auth/googlehealth.profile.readonly',

    // Add profile data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.profile.writeonly',

    // Add reproductive health data to Google Health, and edit or delete the data it adds
    'https://www.googleapis.com/auth/googlehealth.reproductive_health.writeonly',

    // See your Google Health settings
    'https://www.googleapis.com/auth/googlehealth.settings.readonly',

    // Add settings data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.settings.writeonly',

    // See your Google Health sleep data
    'https://www.googleapis.com/auth/googlehealth.sleep.readonly',

    // Add sleep data to Google Health, and edit or delete the data it adds.
    'https://www.googleapis.com/auth/googlehealth.sleep.writeonly',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  },
);
```

After that you can use Google Health API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the user's identity. It includes the legacy Fitbit user ID and the Google user ID and it can be used by migrating clients to map identifiers between the two systems.
*/
await gapi.client.health.users.getIdentity({name: 'name'});

/*
Returns user's IRN Profile details.
*/
await gapi.client.health.users.getIrnProfile({name: 'name'});

/*
Returns user Profile details.
*/
await gapi.client.health.users.getProfile({name: 'name'});

/*
Returns user settings details.
*/
await gapi.client.health.users.getSettings({name: 'name'});

/*
Updates the user's profile details.
*/
await gapi.client.health.users.updateProfile({name: 'name'});

/*
Updates the user's settings details.
*/
await gapi.client.health.users.updateSettings({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.health-v4#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
