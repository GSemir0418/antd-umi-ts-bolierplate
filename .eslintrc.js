module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    /*
     * Suggest
     */
    // require the use of `===` and `!==`
    eqeqeq: 2,
    // disallow the use of `console`
    'no-console': 1,
    // 	disallow the use of `alert`, `confirm`, and `prompt`
    'no-alert': 2,
    // enforce a particular style for multiline comments
    // 'multiline-comment-style': 2,
    // disallow unnecessary semicolons
    'no-extra-semi': 2,
    // Disallow the type conversion with shorter notations.
    'no-implicit-coercion': 2,
    // disallow inline comments after code
    'no-inline-comments': 2,
    // disallow nested ternary expressions
    'no-nested-ternary': 2,
    // Disallow Initializing to undefined
    'no-undef-init': 2,
    // disallow ternary operators when simpler alternatives exist
    'no-unneeded-ternary': 2,
    // Disallow Unused Expressions
    'no-unused-expressions': 2,
    // require let or const instead of var
    'no-var': 2,
    // Require Object Literal Shorthand Syntax
    'object-shorthand': 2,
    // Require using arrow functions for callbacks
    'prefer-arrow-callback': 2,
    // Prefer destructuring from arrays and objects
    'prefer-destructuring': 1,
    // Suggest using template literals instead of string concatenation.
    'prefer-template': 2,
    // Requires or disallows a whitespace (space or tab) beginning a comment
    'spaced-comment': 2,

    /*
     * Layout & Formatting
     */
    // enforce line breaks after opening and before closing array brackets
    'array-bracket-newline': ['error', { multiline: true }],
    // Disallow or enforce spaces inside of brackets
    'array-bracket-spacing': 0,
    // require or disallow trailing commas
    'comma-dangle': ['error', 'always-multiline'],
    // Enforces spacing around commas
    'comma-spacing': ['error', { before: false, after: true }],
    // Require space before/after arrow function's arrow
    'arrow-spacing': 2,
    // Comma style
    'comma-style': 2,
    // Disallow or enforce spaces inside of computed properties
    'computed-property-spacing': 2,
    // Enforce newline before and after dot
    // 'dot-location': ['error', 'object'],
    // require or disallow spacing between function identifiers and their invocations
    'func-call-spacing': 2,
    // Enforce spacing around the * in generator functions
    /* 'generator-star-spacing': ['error', 'before'], */
    // enforce consistent indentation
    indent: ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    // enforce the consistent use of either double or single quotes in JSX attributes
    'jsx-quotes': ['error', 'prefer-double'],
    // enforce consistent spacing between keys and values in object literal properties
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // enforce consistent spacing before and after keywords
    'keyword-spacing': ['error', { before: true }],
    // require empty lines around comments
    'lines-around-comment': ['error', { allowObjectStart: true, allowBlockStart: true }],
    // require parentheses when invoking a constructor with no arguments
    'new-parens': 'error',
    // require a newline after each call in a method chain
    'newline-per-chained-call': 'error',
    // Disallow multiple spaces
    'no-multi-spaces': 'error',
    // disallow multiple empty lines
    'no-multiple-empty-lines': 'error',
    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 'error',
    // disallow whitespace before properties
    'no-whitespace-before-property': 'error',
    // enforce consistent line breaks after opening and before closing braces
    // 'object-curly-newline': ['error', { multiline: true }],
    // enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'always'],
    // Require Following Curly Brace Conventions
    curly: ['error', 'multi-or-nest'],
    // enforce consistent linebreak style for operators
    'operator-linebreak': ['error', 'after'],
    // enforce placing object properties on separate lines
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    // Enforce spacing between rest and spread operators and their expressions
    'rest-spread-spacing': ['error', 'never'],
    // Enforce spacing before and after semicolons
    'semi-spacing': ['error', { before: false, after: true }],
    // Enforce location of semicolons
    'semi-style': ['error', 'last'],
    // Require Or Disallow Space Before Blocks
    'space-before-blocks': 'error',
    // Require or disallow a space before function parenthesis
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    // Disallow or enforce spaces inside of parentheses
    'space-in-parens': ['error', 'never'],
    // require spacing around infix operators
    'space-infix-ops': 'error',
    // Require or disallow spaces before/after unary operators
    'space-unary-ops': [2, { words: true }],
    // Require Regex Literals to be Wrapped
    'wrap-regex': 2,
    // Enforce spacing around the * in yield* expressions
    /* 'yield-star-spacing': ['error', 'before'], */
  },
}
