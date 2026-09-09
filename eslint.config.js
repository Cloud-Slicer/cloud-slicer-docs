import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

// Flat config (ESLint 9). Replaces the old .eslintrc.json, which only extended
// eslint:recommended with the TypeScript parser. Build output and generated
// Zudoku files are not linted.
export default tseslint.config(
  { ignores: ["dist/**", ".zudoku/**", "public/pagefind/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
