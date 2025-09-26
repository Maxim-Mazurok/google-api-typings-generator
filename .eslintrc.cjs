module.exports = {
  extends: './node_modules/gts',
  plugins: ['deprecation'],
  rules: {
    'deprecation/deprecation': 'error',
    'require-await': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
  },
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  root: true,
};
