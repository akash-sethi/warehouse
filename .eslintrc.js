module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'prettier', '@typescript-eslint', 'jest'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'no-console': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
