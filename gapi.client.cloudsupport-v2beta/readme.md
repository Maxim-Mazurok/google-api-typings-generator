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
Retrieve valid classifications to be used when creating a support case. The classications are hierarchical, with each classification containing all levels of the hierarchy, separated by `" > "`. For example `"Technical Issue > Compute > Compute Engine"`. Classification IDs returned by `caseClassifications.search` are guaranteed to be valid for at least six months. If a given classification is deactivated, it immediately stops being returned. After six months, `case.create` requests using the classification ID will fail. Here is an example of calling this endpoint using cURL: ```shell curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ 'https://cloudsupport.googleapis.com/v2/caseClassifications:search?query=display_name:"*Compute%20Engine*"' ```
*/
await gapi.client.cloudsupport.caseClassifications.search({  });

/*
Close the specified case. Here is an example of calling this endpoint using cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case:close" ```
*/
await gapi.client.cloudsupport.cases.close({ name: "name",  });

/*
Create a new case and associate it with the given Google Cloud Resource. The case object must have the following fields set: `display_name`, `description`, `classification`, and `priority`. Here is an example of calling this endpoint using cURL: ```shell parent="projects/some-project" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "display_name": "Test case created by me.", "description": "a random test case, feel free to close", "classification": { "id": "100IK2AKCLHMGRJ9CDGMOCGP8DM6UTB4BT262T31BT1M2T31DHNMENPO6KS36CPJ786L2TBFEHGN6NPI64R3CDHN8880G08I1H3MURR7DHII0GRCDTQM8" }, "time_zone": "-07:00", "subscriber_email_addresses": [ "foo@domain.com", "bar@domain.com" ], "testCase": true, "priority": "P3" }' \ "https://cloudsupport.googleapis.com/v2/$parent/cases" ```
*/
await gapi.client.cloudsupport.cases.create({ parent: "parent",  });

/*
Escalate a case. Escalating a case initiates the Google Cloud Support escalation management process. This operation is only available to certain Customer Care support services. Go to https://cloud.google.com/support and look for 'Technical support escalations' in the feature list to find out which support services let you perform escalations. Here is an example of calling this endpoint using cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "escalation": { "reason": "BUSINESS_IMPACT", "justification": "This is a test escalation." } }' \ "https://cloudsupport.googleapis.com/v2/$case:escalate" ```
*/
await gapi.client.cloudsupport.cases.escalate({ name: "name",  });

/*
Retrieve the specified case. Here is an example of calling this endpoint using cURL: ```shell case="projects/some-project/cases/16033687" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case" ```
*/
await gapi.client.cloudsupport.cases.get({ name: "name",  });

/*
Retrieve all cases under the specified parent. Note: Listing cases under an organization returns only the cases directly parented by that organization. To retrieve all cases under an organization, including cases parented by projects under that organization, use `cases.search`. Here is an example of calling this endpoint using cURL: ```shell parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases" ```
*/
await gapi.client.cloudsupport.cases.list({ parent: "parent",  });

/*
Update the specified case. Only a subset of fields can be updated. Here is an example of calling this endpoint using cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request PATCH \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "priority": "P1" }' \ "https://cloudsupport.googleapis.com/v2/$case?updateMask=priority" ```
*/
await gapi.client.cloudsupport.cases.patch({ name: "name",  });

/*
Search cases using the specified query. Here is an example of calling this endpoint using cURL: ```shell parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases:search" ```
*/
await gapi.client.cloudsupport.cases.search({  });

/*
Download a file attachment on a case. Note: HTTP requests must append "?alt=media" to the URL. Here is an example of calling this endpoint using cURL: ```shell name="projects/some-project/cases/43594844/attachments/0674M00000WijAnZAJ" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$name:download?alt=media" ```
*/
await gapi.client.cloudsupport.media.download({ name: "name",  });

/*
Create a file attachment on a case or Cloud resource. The attachment object must have the following fields set: filename. Here is an example of calling this endpoint using cURL: ```shell echo "This text is in a file I'm uploading using CSAPI." \ > "./example_file.txt" case="projects/some-project/cases/43594844" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --data-binary @"./example_file.txt" \ "https://cloudsupport.googleapis.com/upload/v2beta/$case/attachments?attachment.filename=uploaded_via_curl.txt" ```
*/
await gapi.client.cloudsupport.media.upload({ parent: "parent",  });
```
