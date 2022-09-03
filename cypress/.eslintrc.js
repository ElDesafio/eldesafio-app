module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    'sonarjs/no-duplicate-string': 'off',
  },
};
