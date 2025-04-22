import { includeIgnoreFile } from "@eslint/compat";
import css from "@eslint/css";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    linterOptions: {
      reportUnusedInlineConfigs: "error",
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "array-callback-return": [
        "error",
        { checkForEach: true, allowVoid: true },
      ],
      "no-duplicate-imports": ["error", { includeExports: true }],
      "no-promise-executor-return": ["error", { allowVoid: true }],
      "no-self-compare": "error",
      "no-useless-assignment": "error",
      "require-atomic-updates": "error",
      camelcase: "error",
      complexity: "error",
      "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
      curly: "error",
      "default-case": "error",
      "default-case-last": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "max-params": ["error", 3],
      "new-cap": "error",
      "no-case-declarations": "error",
      "no-console": "error",
      "no-implicit-coercion": "error",
    },
  },
]);
