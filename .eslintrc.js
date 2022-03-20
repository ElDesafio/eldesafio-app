/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    ecmaVersion: 'latest',
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  plugins: [
    'react',
    'sonarjs',
    'unicorn',
    'jest',
    'simple-import-sort',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 27,
    },
    'import/ignore': ['node_modules', '\\.(css|md|svg|json)$'],
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
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
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: ['plugin:import/typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2019,
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint'],
      rules: {
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
      },
    },
    {
      files: ['**/routes/**/*.js?(x)', '**/routes/**/*.tsx'],
      rules: {
        // Routes may use default exports without a name. At the route level
        // identifying components for debugging purposes is less of an issue, as
        // the route boundary is more easily identifiable.
        'react/display-name': 0,
      },
    },
  ],
};
