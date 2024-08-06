module.exports = {
  root: true,
  env: { browser: true, es2020: true, 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: 'warn',
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
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      ignorePatterns: ['vite-env.d.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
      ],
      parser: '@typescript-eslint/parser',
    },
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js'],
    },
  ],
};
