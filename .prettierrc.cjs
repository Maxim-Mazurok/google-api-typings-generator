module.exports = {
  ...require('gts/.prettierrc.json'),
  plugins: ['prettier-plugin-packagejson'], // required since prettier v3, see https://github.com/matzkoh/prettier-plugin-packagejson#installation // cspell:words packagejson
};
