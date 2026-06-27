# TypeScript typings for Lakehouse API v1

The Lakehouse API (formerly BigLake API) provides access to a serverless, fully managed, and highly available metastore that provides a single source of truth for your data lakehouse. It lets multiple engines—including Apache Spark, Google Managed Spark, Apache Flink, Trino and BigQuery—share tables and metadata for key open formats (Apache Iceberg, Apache Hive), and query the same copy of data. Plus, through the Lakehouse runtime catalog federation seamlessly unite your lakehouse ecosystem, letting Iceberg compatible engines on Google Cloud (BigQuery, Google Managed Spark) discover and analyze enterprise data across Snowflake, Databricks, and AWS Glue.
For detailed description please check [documentation](https://cloud.google.com/products/lakehouse).

## Installing

Install typings for Lakehouse API:

```
npm install @types/gapi.client.biglake-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["gapi", "gapi.auth2", "gapi.client", "gapi.client.biglake-v1"]
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
  'https://biglake.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.biglake
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('biglake', 'v1', () => {
  // now we can use:
  // gapi.client.biglake
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your data in Google BigQuery and see the email address for your Google Account
    'https://www.googleapis.com/auth/bigquery',

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

After that you can use Lakehouse API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.biglake-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
