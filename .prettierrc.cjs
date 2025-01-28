/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...require('gts/.prettierrc.json'),
  plugins: ['prettier-plugin-packagejson'], // required since prettier v3, see https://github.com/matzkoh/prettier-plugin-packagejson#installation // cspell:words packagejson
};

module.exports = config;
