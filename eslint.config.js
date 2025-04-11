import tseslint from 'typescript-eslint';
import leonardjouve from 'eslint-config-leonardjouve'

export default tseslint.config(
    leonardjouve.configs.recommended,
    {
        ignores: [
            "dist/**",
            "eslint.config.js",
        ],
    },
);
