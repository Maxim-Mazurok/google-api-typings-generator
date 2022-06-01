# TypeScript typings for People API v1

Provides access to information about profiles and contacts.
For detailed description please check [documentation](https://developers.google.com/people/).

## Installing

Install typings for People API:

```
npm install @types/gapi.client.people@v1 --save-dev
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
gapi.client.load('people', 'v1', () => {
  // now we can use gapi.client.people
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, download, and permanently delete your contacts
      'https://www.googleapis.com/auth/contacts',

      // See and download contact info automatically saved in your "Other contacts"
      'https://www.googleapis.com/auth/contacts.other.readonly',

      // See and download your contacts
      'https://www.googleapis.com/auth/contacts.readonly',

      // See and download your organization's GSuite directory
      'https://www.googleapis.com/auth/directory.readonly',

      // View your street addresses
      'https://www.googleapis.com/auth/user.addresses.read',

      // See and download your exact date of birth
      'https://www.googleapis.com/auth/user.birthday.read',

      // See and download all of your Google Account email addresses
      'https://www.googleapis.com/auth/user.emails.read',

      // See your gender
      'https://www.googleapis.com/auth/user.gender.read',

      // See your education, work history and org info
      'https://www.googleapis.com/auth/user.organization.read',

      // See and download your personal phone numbers
      'https://www.googleapis.com/auth/user.phonenumbers.read',

      // See your primary Google Account email address
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

After that you can use People API resources:

```typescript

/*
Get a list of contact groups owned by the authenticated user by specifying a list of contact group resource names.
*/
await gapi.client.people.contactGroups.batchGet({  });

/*
Create a new contact group owned by the authenticated user. Created contact group names must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.contactGroups.create({  });

/*
Delete an existing contact group owned by the authenticated user by specifying a contact group resource name. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.contactGroups.delete({ resourceName: "resourceName",  });

/*
Get a specific contact group owned by the authenticated user by specifying a contact group resource name.
*/
await gapi.client.people.contactGroups.get({ resourceName: "resourceName",  });

/*
List all contact groups owned by the authenticated user. Members of the contact groups are not populated.
*/
await gapi.client.people.contactGroups.list({  });

/*
Update the name of an existing contact group owned by the authenticated user. Updated contact group names must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.contactGroups.update({ resourceName: "resourceName",  });

/*
Copies an "Other contact" to a new contact in the user's "myContacts" group Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.otherContacts.copyOtherContactToMyContactsGroup({ resourceName: "resourceName",  });

/*
List all "Other contacts", that is contacts that are not in a contact group. "Other contacts" are typically auto created contacts from interactions. Sync tokens expire 7 days after the full sync. A request with an expired sync token will get an error with an [google.rpc.ErrorInfo](https://cloud.google.com/apis/design/errors#error_info) with reason "EXPIRED_SYNC_TOKEN". In the case of such an error clients should make a full sync request without a `sync_token`. The first page of a full sync request has an additional quota. If the quota is exceeded, a 429 error will be returned. This quota is fixed and can not be increased. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the user's other contacts that have changed](/people/v1/other-contacts#list_the_users_other_contacts_that_have_changed).
*/
await gapi.client.people.otherContacts.list({  });

/*
Provides a list of contacts in the authenticated user's other contacts that matches the search query. The query matches on a contact's `names`, `emailAddresses`, and `phoneNumbers` fields that are from the OTHER_CONTACT source. **IMPORTANT**: Before searching, clients should send a warmup request with an empty query to update the cache. See https://developers.google.com/people/v1/other-contacts#search_the_users_other_contacts
*/
await gapi.client.people.otherContacts.search({  });

/*
Create a batch of new contacts and return the PersonResponses for the newly Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.batchCreateContacts({  });

/*
Delete a batch of contacts. Any non-contact data will not be deleted. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.batchDeleteContacts({  });

/*
Update a batch of contacts and return a map of resource names to PersonResponses for the updated contacts. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.batchUpdateContacts({  });

/*
Create a new contact and return the person resource for that contact. The request returns a 400 error if more than one field is specified on a field that is a singleton for contact sources: * biographies * birthdays * genders * names Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.createContact({  });

/*
Delete a contact person. Any non-contact data will not be deleted. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.deleteContact({ resourceName: "resourceName",  });

/*
Delete a contact's photo. Mutate requests for the same user should be done sequentially to avoid // lock contention.
*/
await gapi.client.people.people.deleteContactPhoto({ resourceName: "resourceName",  });

/*
Provides information about a person by specifying a resource name. Use `people/me` to indicate the authenticated user. The request returns a 400 error if 'personFields' is not specified.
*/
await gapi.client.people.people.get({ resourceName: "resourceName",  });

/*
Provides information about a list of specific people by specifying a list of requested resource names. Use `people/me` to indicate the authenticated user. The request returns a 400 error if 'personFields' is not specified.
*/
await gapi.client.people.people.getBatchGet({  });

/*
Provides a list of domain profiles and domain contacts in the authenticated user's domain directory. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the directory people that have changed](/people/v1/directory#list_the_directory_people_that_have_changed).
*/
await gapi.client.people.people.listDirectoryPeople({  });

/*
Provides a list of contacts in the authenticated user's grouped contacts that matches the search query. The query matches on a contact's `names`, `nickNames`, `emailAddresses`, `phoneNumbers`, and `organizations` fields that are from the CONTACT source. **IMPORTANT**: Before searching, clients should send a warmup request with an empty query to update the cache. See https://developers.google.com/people/v1/contacts#search_the_users_contacts
*/
await gapi.client.people.people.searchContacts({  });

/*
Provides a list of domain profiles and domain contacts in the authenticated user's domain directory that match the search query.
*/
await gapi.client.people.people.searchDirectoryPeople({  });

/*
Update contact data for an existing contact person. Any non-contact data will not be modified. Any non-contact data in the person to update will be ignored. All fields specified in the `update_mask` will be replaced. The server returns a 400 error if `person.metadata.sources` is not specified for the contact to be updated or if there is no contact source. The server returns a 400 error with reason `"failedPrecondition"` if `person.metadata.sources.etag` is different than the contact's etag, which indicates the contact has changed since its data was read. Clients should get the latest person and merge their updates into the latest person. The server returns a 400 error if `memberships` are being updated and there are no contact group memberships specified on the person. The server returns a 400 error if more than one field is specified on a field that is a singleton for contact sources: * biographies * birthdays * genders * names Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.updateContact({ resourceName: "resourceName",  });

/*
Update a contact's photo. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
*/
await gapi.client.people.people.updateContactPhoto({ resourceName: "resourceName",  });
```
