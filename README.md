# google-api-typings-generator
Use this project to generate Typescript typings definition for all Google APIs.
This project using [Google API discovery](https://developers.google.com/discovery/) service.

## Usage

### Generating types

Run program:
```sh
npm start
```
This will generate typings for **all** available Google APIs.

**Note** that some APIs are disabled or not fully developed yet,
so you might see some errors in the output, that's probably fine.

If you only want to generate types for **one** service (i.e., Google Sheets)
use the following command:
```sh
ts-node -T src/cli.ts --out ./types --service sheets
```
where "sheets" is the name of the service. You can find all names 
[here](https://www.googleapis.com/discovery/v1/apis)

Alternatively, you can compile the project first:
```sh
tsc -p .
```
and then run it using node:
```sh
node dist/cli.js --out ./types -s sheets
```

### Running tests (WIP)

You will find `gapi.client.${api.name}-tests.ts` files in types directories.
They mostly just make dummy API calls and are not reliable to test anything.
The proper way to implement tests would be to test types
and don't run actual API calls at all.
[dtslint](https://github.com/Microsoft/dtslint) might be helpful.
