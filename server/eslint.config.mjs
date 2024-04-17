import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
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
