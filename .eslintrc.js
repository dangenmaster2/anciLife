module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
    plugins: ['react', 'react-native'],
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true,
      es2020: true
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'warn',
        'react/prop-types': 'off',
    },
  };
  