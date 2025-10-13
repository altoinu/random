import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginJest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = defineConfig([
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },

  pluginJs.configs.recommended,
  // for ts files
  {
    files: [
      "**/*.?[cm]ts?(x)",
      //"**/*.?[cm][jt]s?(x)"
    ],
    ...tseslint.configs.recommended,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  // for js files
  {
    files: ["**/*.?[cm]js?(x)"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  // for jest test files
  {
    files: [
      "**/*.{spec,test}.?[cm][jt]s?(x)",
      "**/__tests__/**/*.?[cm][jt]s?(x)",
    ],
    plugins: {
      jest: eslintPluginJest,
    },
    ...eslintPluginJest.configs["flat/recommended"],
    languageOptions: {
      globals: {
        ...globals.jest,
        fetchMock: "readonly",
      },
    },
  },
  // Prettier (must be the last config)
  eslintConfigPrettier,
]);

export default eslintConfig;
