module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: [
      'airbnb-base',
      'plugin:jest/recommended',
      'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
    },
    plugins: [
      '@typescript-eslint',
      'prettier'
    ],
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'no-underscore-dangle': 'off',
      'no-var': 'off',
      camelcase: 'off',
      'func-names': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      jest: {
        version: 26,
      },
    },
};
  
