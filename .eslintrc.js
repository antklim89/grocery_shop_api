module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    globals: {
        strapi: 'readonly',
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'import/newline-after-import': ['error', { count: 2 }],
        'import/order': [1, {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
            alphabetize: {
                order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
                caseInsensitive: true, /* ignore case. Options: [true, false] */
            },
        }],
        'import/no-extraneous-dependencies': [
            'error', { devDependencies: ['*.js'] }],

        'no-multiple-empty-lines': [1, { max: 2 }],
        'arrow-body-style': 0,
        indent: [1, 4],
        'no-debugger': 0,
        'no-console': 0,
        'max-len': [1, { code: 120, ignoreComments: true }],
        'no-restricted-syntax': ['error', 'WithStatement'],
        camelcase: 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
    },
};
