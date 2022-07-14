const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  bracketSpacing: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSameLine: false,
  arrowParens: 'avoid',
  jsxSingleQuote: false,
  stylelintIntegration: true,
  eslintIntegration: true,
}
