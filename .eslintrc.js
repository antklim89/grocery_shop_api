const path = require('path');

/**
npm i -D eslint eslint-config-next eslint-import-resolver-alias eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
 */


module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:all',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'import/newline-after-import': ['error', { count: 2 }],
        'import/order': [
            1, {
                'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                'alphabetize': { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['*.js'] }],

        'capitalized-comments': 0,
        'multiline-comment-style': 0,
        'no-underscore-dangle': 0,
        'no-inline-comments': 0,
        'line-comment-position': 0,
        'multiline-ternary': [2, 'always-multiline'],
        'no-implicit-coercion': 2,
        'operator-linebreak': [2, 'before'],
        'dot-location': [2, 'property'],
        'require-unicode-regexp': 0,
        'max-lines-per-function': [2, 200],
        'max-statements': ['error', 20, { 'ignoreTopLevelFunctions': true }],
        'no-extra-parens': 0,
        'prefer-named-capture-group': 0,
        'id-length': [2, { 'exceptions': ['e', '_'] }],
        'no-ternary': 0,
        'curly': 0,
        'init-declarations': 0,
        'require-await': 0,
        'space-before-function-paren': 0,
        'func-style': [0, 'declaration', { 'allowArrowFunctions': true }],
        'sort-imports': 0,
        'one-var': 0,
        'padded-blocks': 0,
        'function-call-argument-newline': [2, 'consistent'],
        'no-magic-numbers': 0,
        'sort-keys': 0,
        'object-property-newline': 0,
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-loss-of-precision': 2,
        'object-curly-spacing': [2, 'always'],
        'no-use-before-define': [0, { 'functions': false, 'classes': true }],
        'semi': 2,
        'comma-dangle': [1, 'always-multiline'],
        'quotes': [1, 'single'],
        'quote-props': [2, 'consistent'],
        'eol-last': 2,
        'no-useless-constructor': 0,
        'no-multiple-empty-lines': [1, { max: 2 }],
        'arrow-body-style': [0, 'as-needed'],
        'indent': [1, 4],
        'max-len': [1, { code: 120, ignoreComments: true, ignoreStrings: true }],
        'no-restricted-syntax': [2, 'WithStatement'],
        'camelcase': [0, { 'properties': 'always' }],
        'object-curly-newline': [1, { minProperties: 6, multiline: true }],
        'array-element-newline': [1, 'consistent'],
        'no-shadow': 2,
        'no-undef': 2,
        'no-unused-vars': 2,
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['~', path.join(__dirname, './')]],
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            },
        },
    },

    globals: {
        module: true,
        process: true,
        strapi: true,
        JSX: true,
        __dirname: true,
        require: true,
    },

    ignorePatterns: ['**/node_modules/**/*', '**/.next/**/*', '**/build/**/*', '**/.tmp/**/*', '**/.cache/**/*'],
};
