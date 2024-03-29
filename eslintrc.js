module.exports = {
  root: true,
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2018, // For Node 10.15.3 - Node 12 fully supports ES2019.
    source: 'script',
  },
  rules: {
    'arrow-body-style': 'warn',
    'max-len': ['error', { code: 140 }],
    'no-console': 'warn',
    'no-mixed-operators': ['warn', { allowSamePrecedence: true }],
    'no-unneeded-ternary': 'warn',
    'no-bitwise': 'warn',
    'no-multi-assign': 'warn',
    'prefer-spread': 'off',
    'prefer-rest-params': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'no-useless-concat': 'warn',
    'no-use-before-define': ['error', { functions: false }],
    'no-fallthrough': 'warn',
    'default-case': 'warn',
    'class-methods-use-this': 'off',
    'import/no-dynamic-require': 'warn',
    'no-new': 'warn',
    'new-cap': 'warn',
    'global-require': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'no-param-reassign': 'off',
    'quote-props': 'warn',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'prefer-template': 'warn',
    'semi': 'error',
    'comma-dangle': 'warn'
  },
};
