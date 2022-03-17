module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'sonarjs',
    'unicorn',
    'jest',
    'simple-import-sort',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 2,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    indent: 'off',
    semi: 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'no-duplicate-imports': 'off',
    'object-shorthand': [
      'error',
      'always',
      { avoidExplicitReturnArrows: true },
    ],
    '@typescript-eslint/no-duplicate-imports': ['error'],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/indent': ['off', 2],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    // "unicorn/no-fn-reference-in-iterator": "off",
    // "unicorn/no-array-for-each": "off",
    // "unicorn/no-null": "off",
    // "unicorn/consistent-destructuring": "off",
    // "unicorn/no-array-reduce": "off",
    // "unicorn/prefer-spread": "off",
    // "unicorn/no-array-callback-reference": "off",
    // "unicorn/consistent-function-scoping": "off",
    // "unicorn/no-useless-undefined": "off",
    // "unicorn/prevent-abbreviations": [
    //     "error",
    //     {
    //         allowList: { Param: true, Req: true, Res: true },
    //     },
    // ],
  },
};
