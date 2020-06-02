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

      // See and download your contacts
      'https://www.googleapis.com/auth/contacts.readonly',

      // See and download your organization's GSuite directory
      'https://www.googleapis.com/auth/directory.readonly',

      // View your street addresses
      'https://www.googleapis.com/auth/user.addresses.read',

      // View your complete date of birth
      'https://www.googleapis.com/auth/user.birthday.read',

      // View your email addresses
      'https://www.googleapis.com/auth/user.emails.read',

      // See your gender
      'https://www.googleapis.com/auth/user.gender.read',

      // See your education, work history and org info
      'https://www.googleapis.com/auth/user.organization.read',

      // View your phone numbers
      'https://www.googleapis.com/auth/user.phonenumbers.read',

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

After that you can use People API resources:

```typescript

/*
Get a list of contact groups owned by the authenticated user by specifying
a list of contact group resource names.
*/
await gapi.client.people.contactGroups.batchGet({  });

/*
Create a new contact group owned by the authenticated user.
*/
await gapi.client.people.contactGroups.create({  });

/*
Delete an existing contact group owned by the authenticated user by
specifying a contact group resource name.
*/
await gapi.client.people.contactGroups.delete({ resourceName: "resourceName",  });

/*
Get a specific contact group owned by the authenticated user by specifying
a contact group resource name.
*/
await gapi.client.people.contactGroups.get({ resourceName: "resourceName",  });

/*
List all contact groups owned by the authenticated user. Members of the
contact groups are not populated.
*/
await gapi.client.people.contactGroups.list({  });

/*
Update the name of an existing contact group owned by the authenticated
user.
*/
await gapi.client.people.contactGroups.update({ resourceName: "resourceName",  });

/*
Copies an other contact to a new contact in the user's MY_CONTACTS group
*/
await gapi.client.people.otherContacts.copyOtherContactToMyContactsGroup({ resourceName: "resourceName",  });

/*
Create a new contact and return the person resource for that contact.
*/
await gapi.client.people.people.createContact({  });

/*
Delete a contact person. Any non-contact data will not be deleted.
*/
await gapi.client.people.people.deleteContact({ resourceName: "resourceName",  });

/*
Delete a contact's photo.
*/
await gapi.client.people.people.deleteContactPhoto({ resourceName: "resourceName",  });

/*
Provides information about a person by specifying a resource name. Use
`people/me` to indicate the authenticated user.

The request throws a 400 error if 'personFields' is not specified.
*/
await gapi.client.people.people.get({ resourceName: "resourceName",  });

/*
Provides information about a list of specific people by specifying a list
of requested resource names. Use `people/me` to indicate the authenticated
user.

The request throws a 400 error if 'personFields' is not specified.
*/
await gapi.client.people.people.getBatchGet({  });

/*
Update contact data for an existing contact person. Any non-contact data
will not be modified.

The request throws a 400 error if `updatePersonFields` is not specified.

The request throws a 400 error if `person.metadata.sources` is not
specified for the contact to be updated.

The request throws a 400 error with an error with reason
`"failedPrecondition"` if `person.metadata.sources.etag` is different than
the contact's etag, which indicates the contact has changed since its data
was read. Clients should get the latest person and re-apply their updates
to the latest person.
*/
await gapi.client.people.people.updateContact({ resourceName: "resourceName",  });

/*
Update a contact's photo.
*/
await gapi.client.people.people.updateContactPhoto({ resourceName: "resourceName",  });

/*
List all other contacts, that is contacts that are not in a contact group.
Other contacts are typically auto created contacts from interactions.
*/
await gapi.client.people.v1.otherContacts({  });
```
