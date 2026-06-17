# TypeScript typings for Database Center API v1beta

Database Center offers a comprehensive, organization-wide platform for monitoring database fleet health across various products. It simplifies management and reduces risk by automatically aggregating and summarizing key health signals, removing the need for custom dashboards. The platform provides a unified view through its dashboard and API, enabling teams focused on reliability, compliance, security, cost, and administration to quickly identify and address relevant issues within their database fleets.
For detailed description please check [documentation](https://docs.cloud.google.com/database-center/docs/overview).

## Installing

Install typings for Database Center API:

```
npm install @types/gapi.client.databasecenter-v1beta --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.databasecenter-v1beta"
    ]
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
  'https://databasecenter.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.databasecenter
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('databasecenter', 'v1beta', () => {
  // now we can use:
  // gapi.client.databasecenter
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

After that you can use Database Center API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
AggregateQueryStats provides database resource query execution statistics.
*/
await gapi.client.databasecenter.folders.aggregateQueryStats({
  parent: 'parent',
});

/*
AggregateQueryStats provides database resource query execution statistics.
*/
await gapi.client.databasecenter.organizations.aggregateQueryStats({
  parent: 'parent',
});

/*
AggregateQueryStats provides database resource query execution statistics.
*/
await gapi.client.databasecenter.projects.aggregateQueryStats({
  parent: 'parent',
});

/*
AggregateFleet provides statistics about the fleet grouped by various fields.
*/
await gapi.client.databasecenter.aggregateFleet({});

/*
AggregateIssueStats provides database resource issues statistics.
*/
await gapi.client.databasecenter.aggregateIssueStats({});

/*
QueryDatabaseResourceGroups returns paginated results of database groups.
*/
await gapi.client.databasecenter.queryDatabaseResourceGroups({});

/*
QueryIssues provides a list of issues and recommendations that a user has access to and that are within the requested scope.
*/
await gapi.client.databasecenter.queryIssues({});

/*
QueryProducts provides a list of all possible products which can be used to filter database resources.
*/
await gapi.client.databasecenter.queryProducts({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.databasecenter-v1beta#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
