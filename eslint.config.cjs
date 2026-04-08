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
    rules: {
      '@typescript-eslint/no-deprecated': 'error',
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
