import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    extends: [
    "eslint:recommended",
    "prettier"  // Añade esta línea para desactivar reglas conflictivas con Prettier
  ],
    rules: {
      quotes: ["error", "single"]
    }
  }
];