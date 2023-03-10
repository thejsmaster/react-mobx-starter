const parser = require('@typescript-eslint/parser');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    programs: [parser.createProgram('tsconfig.json')],
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
