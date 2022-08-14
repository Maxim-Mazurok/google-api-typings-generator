# TypeScript typings for Fitness API v1

The Fitness API for managing users' fitness tracking data.
For detailed description please check [documentation](https://developers.google.com/fit/rest/v1/get-started).

## Installing

Install typings for Fitness API:

```
npm install @types/gapi.client.fitness-v1 --save-dev
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
gapi.client.load('https://fitness.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.fitness
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('fitness', 'v1', () => {
  // now we can use:
  // gapi.client.fitness
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Use Google Fit to see and store your physical activity data
      'https://www.googleapis.com/auth/fitness.activity.read',

      // Add to your Google Fit physical activity data
      'https://www.googleapis.com/auth/fitness.activity.write',

      // See info about your blood glucose in Google Fit. I consent to Google sharing my blood glucose information with this app.
      'https://www.googleapis.com/auth/fitness.blood_glucose.read',

      // Add info about your blood glucose to Google Fit. I consent to Google using my blood glucose information with this app.
      'https://www.googleapis.com/auth/fitness.blood_glucose.write',

      // See info about your blood pressure in Google Fit. I consent to Google sharing my blood pressure information with this app.
      'https://www.googleapis.com/auth/fitness.blood_pressure.read',

      // Add info about your blood pressure in Google Fit. I consent to Google using my blood pressure information with this app.
      'https://www.googleapis.com/auth/fitness.blood_pressure.write',

      // See info about your body temperature in Google Fit. I consent to Google sharing my body temperature information with this app.
      'https://www.googleapis.com/auth/fitness.body_temperature.read',

      // Add to info about your body temperature in Google Fit. I consent to Google using my body temperature information with this app.
      'https://www.googleapis.com/auth/fitness.body_temperature.write',

      // See info about your body measurements in Google Fit
      'https://www.googleapis.com/auth/fitness.body.read',

      // Add info about your body measurements to Google Fit
      'https://www.googleapis.com/auth/fitness.body.write',

      // See your heart rate data in Google Fit. I consent to Google sharing my heart rate information with this app.
      'https://www.googleapis.com/auth/fitness.heart_rate.read',

      // Add to your heart rate data in Google Fit. I consent to Google using my heart rate information with this app.
      'https://www.googleapis.com/auth/fitness.heart_rate.write',

      // See your Google Fit speed and distance data
      'https://www.googleapis.com/auth/fitness.location.read',

      // Add to your Google Fit location data
      'https://www.googleapis.com/auth/fitness.location.write',

      // See info about your nutrition in Google Fit
      'https://www.googleapis.com/auth/fitness.nutrition.read',

      // Add to info about your nutrition in Google Fit
      'https://www.googleapis.com/auth/fitness.nutrition.write',

      // See info about your oxygen saturation in Google Fit. I consent to Google sharing my oxygen saturation information with this app.
      'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',

      // Add info about your oxygen saturation in Google Fit. I consent to Google using my oxygen saturation information with this app.
      'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',

      // See info about your reproductive health in Google Fit. I consent to Google sharing my reproductive health information with this app.
      'https://www.googleapis.com/auth/fitness.reproductive_health.read',

      // Add info about your reproductive health in Google Fit. I consent to Google using my reproductive health information with this app.
      'https://www.googleapis.com/auth/fitness.reproductive_health.write',

      // See your sleep data in Google Fit. I consent to Google sharing my sleep information with this app.
      'https://www.googleapis.com/auth/fitness.sleep.read',

      // Add to your sleep data in Google Fit. I consent to Google using my sleep information with this app.
      'https://www.googleapis.com/auth/fitness.sleep.write',
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

After that you can use Fitness API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
