# google-api-typings-generator

[![GitHub](https://img.shields.io/github/license/Maxim-Mazurok/google-api-typings-generator)](https://github.com/Maxim-Mazurok/google-api-typings-generator/blob/master/LICENSE)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![Dependabot Status](https://badgen.net/github/dependabot/Maxim-Mazurok/google-api-typings-generator)](https://github.com/Maxim-Mazurok/google-api-typings-generator/network/updates)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?business=K3SMKBEAQFUUW&no_recurring=0&item_name=Maintaining+https%3A%2F%2Fgithub.com%2FMaxim-Mazurok%2Fgoogle-api-typings-generator&currency_code=AUD)

[![Auto Publish to NPM](https://github.com/Maxim-Mazurok/google-api-typings-generator/workflows/Auto%20Publish%20to%20NPM/badge.svg)](https://github.com/Maxim-Mazurok/google-api-typings-generator/actions?query=workflow%3A%22Auto+Open+PRs%22)
[![Auto Generate Types](https://github.com/Maxim-Mazurok/google-api-typings-generator/workflows/Auto%20Generate%20Types/badge.svg)](https://github.com/Maxim-Mazurok/google-api-typings-generator/actions?query=workflow%3A%22Auto+Generate+Types%22)
[![CI Test](https://github.com/Maxim-Mazurok/google-api-typings-generator/workflows/CI%20Test/badge.svg)](https://github.com/Maxim-Mazurok/google-api-typings-generator/actions?query=workflow%3A%22CI+Test%22)

Generate TypeScript type definitions for all Google APIs,
using [Google API discovery](https://developers.google.com/discovery/) service.

Meant to be used with [Google APIs JavaScript Browser Client](https://github.com/google/google-api-javascript-client), aka `gapi`.
Not to be mistaken with [NodeJS Server Client](https://github.com/googleapis/google-api-nodejs-client) which is already in TS; [details](#javascript-vs-nodejs-clients)

## Fork Log:

- ⚠️ This is the only maintained repo for GAPI type definitions (forked and detached from [Bolisov/google-api-typings-generator](https://github.com/Bolisov/google-api-typings-generator))
- 🤖 Auto updates every hour; [details](#auto-updates)
- Supports both `resource` and second-argument approaches; [details](#resource-vs-body)
- Includes empty interfaces; [details](#empty-interfaces)
- Works for arrays, aka `"repeated": true`; [details](#arrays--repeated-values)
- System proxy support (see [Azure/get-proxy-settings](https://github.com/Azure/get-proxy-settings#system-proxy))
- Other minor fixes and updates

## Usage

### Generating types

1. Use the supported Node version via [Node Version Manager](https://github.com/nvm-sh/nvm):

   ```sh
   nvm install
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Generate type definitions for:

   1. all discovered Google APIs:

      ```sh
      npm start
      ```

      _Some APIs are disabled or not fully developed yet, so some expected errors might be output._

   2. one service by name:

      ```sh
      npm start -- --service sheets
      ```

      where `sheets` is the name of the [Google Sheets](https://developers.google.com/sheets/) service.

      _The full list of APIs can be found [here](https://discovery.googleapis.com/discovery/v1/apis) or [here](https://developers.google.com/discovery/v1/getting_started#rest)._

   3. one service by URL:

      ```sh
      npx -y set-env URL="https://sheets.googleapis.com/$discovery/rest?version=v4" npm start
      ```

      _Note the intentional escaping of `$discovery`._

### Compiling project

```sh
npm run compile
```

```sh
node dist/cli.js --out ./types
```

### Running tests

Tests are run automatically in practice via GitHub Actions continuous integration.

### Syncing gapi client namespace in DT with available APIs

Here's how to sync (add new and remove obsolete) Google APIs to/from @types/gapi.client.\* namespace in DefinitelyTyped:

1. Make sure that this project, [DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), and [microsoft/DefinitelyTyped-tools](https://github.com/microsoft/DefinitelyTyped-tools) are all in the home directory on Linux: `~`
2. `npm run apis-sync-helper` will update config in this repo and allowed list in DT-tools
3. `npm run start-dt` will update DT
4. Open PR to DT-tools, but **only include additions, not deletions**, otherwise, all DT PRs are gonna start failing
5. Wait for it to get merged
6. Open PR to DT (include all changes)
7. Wait for it to get merged
8. Open PR to DT-tools, now only include deletions that were omitted previously, making sure that all deleted types are absent in the DT repo
9. Once it's merged - all done, rinse and repeat in a few months or so.

Ideally, this should be automated in [#401](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/401)

#### Lint

The generated type definitions are linted via [`dtslint`](https://github.com/Microsoft/dtslint), mimicking
[DefinitelyTyped's process](https://github.com/DefinitelyTyped/DefinitelyTyped#verifying).

A single project can be linted via:

```sh
npm run dtslint types/<project-directory>
```

All projects can be linted in parallel via:

```sh
GAPI_MAX_PARALLEL=3 npm run lint
```

#### Unit (WIP)

Unit tests for this generator project are written with [Jest](https://jestjs.io/). They can be run via:

```sh
npm run test
```

### Fixing formatting

This project leverages [Google's TypeScript Style (gts)](https://github.com/google/gts) to standardize formatting.

To invoke the automatic code fixer, run:

```sh
npm run fix
```

### Publishing to DefinitelyTypes @types

**Do not publish types to DT directly**

We've [switched](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49235) to publishing "real" types to npm as `@maxim_mazurok/gapi.client.*` and then referencing them in `@types/gapi.client.*` so that we can release updates automatically and quickly, without using too many human resources of DT.

See [Syncing gapi client namespace in DT with available APIs](#syncing-gapi-client-namespace-in-dt-with-available-apis) section for instructions.

## Details

### Auto Updates

Every hour, type definitions are generated, linted, tested, and published to NPM.

### Resource VS Body

First approach (Resource):

```javascript
gapi.client.sheets.spreadsheets.batchUpdate({
  spreadsheetId: 'someId',
  resource: {
    // Request Body goes here, as part of `request`
  },
});
```

second approach (Body):

```javascript
gapi.client.sheets.spreadsheets.batchUpdate(
  {
    spreadsheetId: 'someId',
  },
  {
    // Request Body goes here, as a second argument
  }
);
```

Both approaches are valid (tested for Google Sheets API), but the first one seems to be the default for JS Client Library.

More info here: [google/google-api-javascript-client#432 (comment)](https://github.com/google/google-api-javascript-client/issues/432#issuecomment-530860301),
and here: [declanvong@`bec4f89`#r35992626](https://github.com/declanvong/google-api-typings-generator/commit/bec4f89b998db670e4a9d41810ceb39a1ba9b798#r35992626)

**NOTE:** Some APIs have methods that accept `resource` parameter that is not the request body. In that case, we only generate the second approach ([details](https://github.com/Maxim-Mazurok/google-api-typings-generator/pull/14/commits/776e36ef25886fdb2d38a002ed12ba1dacde85c5))

### Empty interfaces

This fork keeps interfaces even if they are empty to make typings more accurate.

More info here: [Maxim-Mazurok/google-api-typings-generator#4](https://github.com/Maxim-Mazurok/google-api-typings-generator/pull/4)

### Arrays / repeated values

This fork understands `"repeated": true`

More info here: [Maxim-Mazurok/google-api-typings-generator#1](https://github.com/Maxim-Mazurok/google-api-typings-generator/pull/1)
and here: [declanvong@`bec4f89`#r35992626](https://github.com/declanvong/google-api-typings-generator/commit/bec4f89b998db670e4a9d41810ceb39a1ba9b798#r35992626)

### JavaScript VS NodeJS Clients

There are two ways to use Google APIs: on the client-side (in the browser) and on the server-side.

The **client-side** library, called `gapi` is kinda closed-source.
We can [see](https://apis.google.com/js/api.js) compiled (unreadable minified) JS code of the client-side library.
When you use any Google JS API, you use `gapi`. It loads library definitions from [Google API Discovery Service](https://developers.google.com/discovery)
and generates all API calls on the fly.

So, there's no TS version of `gapi` because it's [closed-source](https://github.com/google/google-api-javascript-client/issues/432#issuecomment-435523106)
and other client libraries do not exist, because they are being generated on the fly by `gapi`.

If you want to use TypeScript with `gapi` - you have to use type definitions generated by this project.
While we do generate typings for Google APIs, we can't generate `gapi` typings from discovery, so we rely on
[@types/gapi](https://www.npmjs.com/package/@types/gapi) and you also should.

The **server-side** libraries are open-sourced and are available [here](https://github.com/googleapis/google-api-nodejs-client). Since they are written in TS, you don't need any additional type definitions to use them.

## Troubleshooting

### npm install - 404 Not Found

The error looks like this (see [#483](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/483)):

```
$ npm install @types/gapi.client.YOUR_API@v2 --save-dev
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@types%2fgapi.client.YOUR_API - Not found
npm ERR! 404
npm ERR! 404  '@types/gapi.client.YOUR_API@v2' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
```

It's most likely caused by your API package not being published to NPM yet.

To fix this - [open an issue](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/new) and I'll [update](https://github.com/Maxim-Mazurok/google-api-typings-generator/blob/master/bin/apis-sync-helper.ts) the [list of supported APIs](https://github.com/Maxim-Mazurok/google-api-typings-generator/blob/master/bin/auto-publish/config.ts).

Later on, when [#401](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/401) is closed - this process will be automated.

Also, you can [use these types](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/85#issuecomment-601133279) from the [types branch](https://github.com/Maxim-Mazurok/google-api-typings-generator/tree/types)
