module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console':'off',
    'no-tabs':'off',
    'no-lone-blocks':'off',
    'no-mixed-operators':'off',
    'space-before-function-paren': 'off',
    'vue/valid-v-for':'off',
    'camelcase': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
