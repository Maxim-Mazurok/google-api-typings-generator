- [ ] Add support for multiple Google Ads versions (probably try `bla.com/v7`, `bla.com/v8` until we get 404), see https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/499;

  [v999???](https://googleads.googleapis.com/$discovery/rest)

- [ ] Add `gapi.client.load(url)` signature because it's recommended now, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadurlorobject--
- [ ] DT only supports `\d+.\d+` versions (see https://github.com/microsoft/DefinitelyTyped-tools/blob/bf52b08dedb8e7860337a5e1091f42d07d849ffb/packages/header-parser/src/index.ts#L169)

  At the same time Google API versions are all over the place, like `directory_v1` or `v1p1beta1` non-sense; see `discovery.spec.ts`

  So it seems like the only real option to publish all the versions is to have a separate package per version, like `@types/gapi.client.speech-v1p1beta1`, for example
