import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unused from 'eslint-plugin-unused-imports';

export default [
    {
        ignores: ['dist/**', '*.d.ts', 'webpack.config.ts']
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],

    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: { ...globals.browser },
        },
        settings: { react: { version: 'detect' } },
        plugins: { 'react-hooks': reactHooks, 'unused-imports': unused },
        rules: {
            quotes: ['error', 'single', { avoidEscape: true }],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'react/jsx-indent': [2, 4],
            'react/jsx-indent-props': [2, 4],
            indent: [2, 4],

            // React/JSX
            'react/react-in-jsx-scope': 'off',
            'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
            'react/jsx-props-no-spreading': 'warn',
            'react/function-component-definition': 'off',

            // Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // unused imports
            'unused-imports/no-unused-imports': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',

            // other
            'no-shadow': 'off',
            'no-underscore-dangle': 'off',
            // import
            'import/no-unresolved': 'off',
            'import/prefer-default-export': 'off',
            'import/extensions': 'off',
            'import/no-extraneous-dependencies': 'off',
        },
    },

    // node-glob config
    {
        files: ['**/*.config.{js,cjs,mjs,ts}', 'webpack.config.ts'],
        languageOptions: { globals: { ...globals.node } },
    },
];
