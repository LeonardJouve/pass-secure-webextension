import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import leonardjouve from 'eslint-config-leonardjouve'

export default tseslint.config({
    ignores: ['dist'],
}, {
    extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        ...leonardjouve.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },

});
