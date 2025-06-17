module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['frontend/**/*.vue', 'frontend/**/*.js'],
      extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'prettier',
      ],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['backend/**/*.js'],
      extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unpublished-require': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
}
