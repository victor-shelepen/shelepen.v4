module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'react/prop-types': 'off',
  },
}
