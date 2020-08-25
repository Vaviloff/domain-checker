module.exports = {
  env: {
    es6: true,
    node: true,
    amd: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
  },
  root: true,
};
