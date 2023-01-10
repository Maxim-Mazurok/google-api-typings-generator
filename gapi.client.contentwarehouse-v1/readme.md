# TypeScript typings for Document AI Warehouse API v1


For detailed description please check [documentation](https://cloud.google.com/document-warehouse).

## Installing

Install typings for Document AI Warehouse API:

```
npm install @types/gapi.client.contentwarehouse-v1 --save-dev
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
gapi.client.load('https://contentwarehouse.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.contentwarehouse
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('contentwarehouse', 'v1', () => {
  // now we can use:
  // gapi.client.contentwarehouse
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

After that you can use Document AI Warehouse API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the access control policy for a resource. Returns NOT_FOUND error if the resource does not exist. Returns an empty policy if the resource exists but does not have a policy set.
*/
await gapi.client.contentwarehouse.projects.fetchAcl({ resource: "resource",  });

/*
Sets the access control policy for a resource. Replaces any existing policy. You can set ACL with condition for projects only. Supported operators are: `=`, `!=`, `<`, `<=`, `>`, and `>=` where the left of the operator is `DocumentSchemaId` or property name and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\") characters. Boolean expressions (AND/OR) are supported up to 3 levels of nesting (for example, "((A AND B AND C) OR D) AND E"), a maximum of 10 comparisons are allowed in the expression. The expression must be < 6000 bytes in length. Sample condition: `"DocumentSchemaId = \"some schema id\" " OR SchemaId.floatPropertyName >= 10`
*/
await gapi.client.contentwarehouse.projects.setAcl({ resource: "resource",  });
```
