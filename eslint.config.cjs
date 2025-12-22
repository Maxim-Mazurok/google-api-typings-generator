const {fixupPluginRules} = require('@eslint/compat');
const deprecationPlugin = fixupPluginRules(
  require('eslint-plugin-deprecation'), // TODO: migrate to https://typescript-eslint.io/rules/no-deprecated/
);

const googleTypeScriptStyleConfig = require('gts/build/eslint.config.js');

module.exports = [
  ...googleTypeScriptStyleConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    plugins: {deprecation: deprecationPlugin},
    rules: {
      'deprecation/deprecation': 'error',
      'require-await': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
    },
  },
  {
    ignores: [
      'dist/',
      'types/',
      'test/restDocs/*.json',
      'test/restDocs/results/',
    ],
  },
];
