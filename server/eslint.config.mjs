import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    extends: ['eslint:recommended', 'plugin:node/recommended', 'airbnb-base'],
    plugins: ['json'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off',
      eqeqeq: 'warn',
      'func-style': ['error', 'declaration'],
      'object-shorthand': 'off',
      'keyword-spacing': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-plusplus': 'off',
      'spaced-comment': 'error',
      quotes: ['error', 'single'],
      semi: 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', 'always'],
      indent: ['error', 2],
    },
  },
];
