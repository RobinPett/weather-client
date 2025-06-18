// eslint.config.js
// Created with help from Copilot

const js = require('@eslint/js')
const jsdoc = require('eslint-plugin-jsdoc')
const react = require('eslint-plugin-react')

module.exports = [
  js.configs.recommended,
  {
    plugins: {jsdoc, react},
    languageOptions: {
      parser: require('@babel/eslint-parser'),	
      parserOptions: {
        requireConfigFile: false, 
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        React: "readonly",
        document: "readonly",
        window: "readonly",
      }
    },
    rules: {
      "quotes": ["error", "single"], // Enforce double quotes
      "indent": ["error", 2], // 2-space indentation
      "no-unused-vars": "warn", // Warn about unused variables
      "eqeqeq": "error", // Require === and !==
      "curly": "error", // Enforce curly braces for control statements
      "react/jsx-uses-vars": "error", // Prevent false positives for unused variables in JSX
      "arrow-spacing": ["error", { "before": true, "after": true }], // Consistent arrow function spacing
      "jsdoc/check-alignment": "error", // Ensure JSDoc comments are properly aligned
      "jsdoc/check-param-names": "off", // Ensure param names match JSDoc
      "jsdoc/require-param": "error", // Require @param tags
      "jsdoc/require-returns": "error", // Require @returns tags
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
    },
  },
]
