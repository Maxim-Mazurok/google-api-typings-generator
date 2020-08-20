# TypeScript typings for Fitness API v1

The Fitness API for managing users' fitness tracking data.
For detailed description please check [documentation](https://developers.google.com/fit/rest/v1/get-started).

## Installing

Install typings for Fitness API:

```
npm install @types/gapi.client.fitness@v1 --save-dev
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
gapi.client.load('fitness', 'v1', () => {
  // now we can use gapi.client.fitness
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Use Google Fit to see and store your physical activity data
      'https://www.googleapis.com/auth/fitness.activity.read',

      // See and add to your Google Fit physical activity data
      'https://www.googleapis.com/auth/fitness.activity.write',

      // See info about your blood glucose in Google Fit. I consent to Google sharing my blood glucose information with this app.
      'https://www.googleapis.com/auth/fitness.blood_glucose.read',

      // See and add info about your blood glucose to Google Fit. I consent to Google sharing my blood glucose information with this app.
      'https://www.googleapis.com/auth/fitness.blood_glucose.write',

      // See info about your blood pressure in Google Fit. I consent to Google sharing my blood pressure information with this app.
      'https://www.googleapis.com/auth/fitness.blood_pressure.read',

      // See and add info about your blood pressure in Google Fit. I consent to Google sharing my blood pressure information with this app.
      'https://www.googleapis.com/auth/fitness.blood_pressure.write',

      // See info about your body temperature in Google Fit. I consent to Google sharing my body temperature information with this app.
      'https://www.googleapis.com/auth/fitness.body_temperature.read',

      // See and add to info about your body temperature in Google Fit. I consent to Google sharing my body temperature information with this app.
      'https://www.googleapis.com/auth/fitness.body_temperature.write',

      // See info about your body measurements and heart rate in Google Fit
      'https://www.googleapis.com/auth/fitness.body.read',

      // See and add info about your body measurements and heart rate to Google Fit
      'https://www.googleapis.com/auth/fitness.body.write',

      // See your Google Fit speed and distance data
      'https://www.googleapis.com/auth/fitness.location.read',

      // See and add to your Google Fit location data
      'https://www.googleapis.com/auth/fitness.location.write',

      // See info about your nutrition in Google Fit
      'https://www.googleapis.com/auth/fitness.nutrition.read',

      // See and add to info about your nutrition in Google Fit
      'https://www.googleapis.com/auth/fitness.nutrition.write',

      // See info about your oxygen saturation in Google Fit. I consent to Google sharing my oxygen saturation information with this app.
      'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',

      // See and add info about your oxygen saturation in Google Fit. I consent to Google sharing my oxygen saturation information with this app.
      'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',

      // See info about your reproductive health in Google Fit. I consent to Google sharing my reporductive health information with this app.
      'https://www.googleapis.com/auth/fitness.reproductive_health.read',

      // See and add info about your reproductive health in Google Fit. I consent to Google sharing my reporductive health information with this app.
      'https://www.googleapis.com/auth/fitness.reproductive_health.write',
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

After that you can use Fitness API resources:

```typescript
```
