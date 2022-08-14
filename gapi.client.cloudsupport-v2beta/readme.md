# TypeScript typings for Google Cloud Support API v2beta

Manages Google Cloud technical support cases for Customer Care support offerings. 
For detailed description please check [documentation](https://cloud.google.com/support/docs/apis).

## Installing

Install typings for Google Cloud Support API:

```
npm install @types/gapi.client.cloudsupport-v2beta --save-dev
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
gapi.client.load('https://cloudsupport.googleapis.com/$discovery/rest?version=v2beta', () => {
  // now we can use:
  // gapi.client.cloudsupport
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudsupport', 'v2beta', () => {
  // now we can use:
  // gapi.client.cloudsupport
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',
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

After that you can use Google Cloud Support API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Create a file attachment on a case or Cloud resource.
*/
await gapi.client.cloudsupport.attachments.create({ parent: "parent",  });

/*
Retrieve valid classifications to be used when creating a support case. The classications are hierarchical, with each classification containing all levels of the hierarchy, separated by " > ". For example "Technical Issue > Compute > Compute Engine".
*/
await gapi.client.cloudsupport.caseClassifications.search({  });

/*
Close the specified case.
*/
await gapi.client.cloudsupport.cases.close({ name: "name",  });

/*
Create a new case and associate it with the given Cloud resource.
*/
await gapi.client.cloudsupport.cases.create({ parent: "parent",  });

/*
Escalate a case. Escalating a case will initiate the Cloud Support escalation management process. This operation is only available to certain Customer Care tiers. Go to https://cloud.google.com/support and look for 'Technical support escalations' in the feature list to find out which tiers are able to perform escalations.
*/
await gapi.client.cloudsupport.cases.escalate({ name: "name",  });

/*
Retrieve the specified case.
*/
await gapi.client.cloudsupport.cases.get({ name: "name",  });

/*
Retrieve all cases under the specified parent. Note: Listing cases under an Organization returns only the cases directly parented by that organization. To retrieve all cases under an organization, including cases parented by projects under that organization, use `cases.search`.
*/
await gapi.client.cloudsupport.cases.list({ parent: "parent",  });

/*
Update the specified case. Only a subset of fields (display_name, description, time_zone, subscriber_email_addresses, related_resources, severity, priority, primary_contact, and labels) can be updated.
*/
await gapi.client.cloudsupport.cases.patch({ name: "name",  });

/*
Search cases using the specified query.
*/
await gapi.client.cloudsupport.cases.search({  });

/*
Download a file attachment on a case. Note: HTTP requests must append "?alt=media" to the URL.
*/
await gapi.client.cloudsupport.media.download({ name: "name",  });

/*
Create a file attachment on a case or Cloud resource.
*/
await gapi.client.cloudsupport.media.upload({ parent: "parent",  });
```
