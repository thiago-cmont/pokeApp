module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    lib: ['es2019'],
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    project: 'tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'no-unused-vars': 'off',
    'no-continue': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
			'warn',
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
    'no-shadow': 'off',
    'camelcase': 'off',
    'no-param-reassign': 'off',
    'array-callback-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/naming-convention' : 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
