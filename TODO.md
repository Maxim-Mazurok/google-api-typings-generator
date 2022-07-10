Short-term:

- [ ] Add support for multiple namespaces in tests:
  - [ ] `/** now we can use gapi.client.admin, gapi.client.directory, ... */`
  - [ ] `await gapi.client.admin.asps.delete({` << `Property 'asps' does not exist on type 'typeof admin'`
- [ ] Remove `| discovery.RestDescription` from `load()` of `gapi.client.*`

Long-term:

- [ ] Get rid of `doT` templates, because we can't even be sure that we're using data that we're passing into them (no linting)
- [ ] Replace text writer with AST generation
- [ ] Just as top-level namespace is based on method ID, exactly the same logic applies for non-top-level namespaces. Meaning that in this setup:
  ```js
  {
    name: "some-name",
    resources: {
      firstResource: {
        methods: {
          firstMethod: {
            httpMethod: "GET",
            path: "some/path/1",
            id: "thirdNamespace.firstMethod",
          },
        },
      },
    },
  }
  ```
  we're getting `gapi.client.thirdNamespace.firstMethod` and `firstResource` name is being ignored.
  See `uses method ID instead of resource name/key` test which is failing
  This doesn't really cause any trouble right now, because IDs seem to match resources, but gapi uses IDs instead, so we probably should do that as well
- [ ] Maybe fix integration test `all apis have ids` to verify that all api defs have **method** ids (**not** same as `api.id`)
- [ ] Add `| discovery.RestDescription` to `load()` in `gapi.client`

Done:

- [x] Add support for multiple Google Ads versions (probably try `bla.com/v7`, `bla.com/v8` until we get 404), see https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/499;
  - [x] [v999](https://googleads.googleapis.com/$discovery/rest) seems pretty empty, so let's just ignore it for now
  - [x] Finish `getExtraRestDescriptions`
- [x] Based on [testing](https://github.com/Maxim-Mazurok/gapi/blob/16cb1357d442335f71bf0525976a5313de11be3a/client/test/modules.karma.js#L100), the namespace isn't API name, but rather should be taken from the top level ID of methods, there also can be unlimited number of namespaces, like for Directory API there are both `gapi.client.admin.*` and `gapi.client.directory.*`, because of ids.
  - [x] Update generation to use method ids instead of API name for top-level
  - [x] Add `namespaces` to readme template data
- [x] Add `gapi.client.load(url)` signature to `index.d.ts` because it's recommended now, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadurlorobject--
  - [x] Add `gapi.client.load(url)` to readme
  - [x] Update `tests.ts` with `.load(url)`
- [x] Package per version, like `@types/gapi.client.speech-v1p1beta1`, for example.
      DT only supports `\d+.\d+` versions (see https://github.com/microsoft/DefinitelyTyped-tools/blob/bf52b08dedb8e7860337a5e1091f42d07d849ffb/packages/header-parser/src/index.ts#L169)
      At the same time Google API versions are all over the place, like `directory_v1` or `v1p1beta1` non-sense; see `discovery.spec.ts`
      So it seems like the only real option to publish all the versions is to have a separate package per version, like `@types/gapi.client.speech-v1p1beta1`, for example
  - [x] Valid package names (seems like we can't use `:` in package names), use [`validate-npm-package-name`](https://www.npmjs.com/package/validate-npm-package-name) to check because there can be any string in ID
- [x] Add support for multiple namespaces in the readme
