module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    rules: {
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^(React|_)', 'caughtErrorsIgnorePattern': '^_' }],
      'no-undef': 'off'
    }
  }
];
