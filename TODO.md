- [ ] Add support for multiple Google Ads versions (probably try `bla.com/v7`, `bla.com/v8` until we get 404), see https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/499;

  [v999???](https://googleads.googleapis.com/$discovery/rest)

- [ ] Add `gapi.client.load(url)` signature because it's recommended now, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadurlorobject--
- [ ] DT only supports `\d+.\d+` versions (see https://github.com/microsoft/DefinitelyTyped-tools/blob/bf52b08dedb8e7860337a5e1091f42d07d849ffb/packages/header-parser/src/index.ts#L169)

  At the same time Google API versions are all over the place, like `directory_v1` or `v1p1beta1` non-sense; see `discovery.spec.ts`

  So it seems like the only real option to publish all the versions is to have a separate package per version, like `@types/gapi.client.speech-v1p1beta1`, for example

- [ ] Based on some preliminary testing, the namespace isn't API name, but rather should be taken from the top level ID of methods, even for Directory API there are both `gapi.client.admin.*` and `gapi.client.directory.*`, because of ids. See https://github.com/Maxim-Mazurok/gapi/commit/95e264092198f4085c9214f591d3f2cc0645b2a1 for some details, need a bit more testing to confirm
