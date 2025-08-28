import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import FSDImports from 'eslint-plugin-fsd-import'
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory:__dirname,
  recommendedConfig:js.configs.recommended,
  allConfig:js.configs.all,
});

const config = [
  {
    ignores:[".next/**/*", ".history/**/*", "coverage/**/*", ".cursor/**/*"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
  },
  ...compat.extends(
      "next/core-web-vitals",
      "plugin:react/recommended",
      "prettier",
      "plugin:@next/next/recommended",
  ),
  {
    plugins:{
      react,
      "@typescript-eslint":typescriptEslint,
      "react-hooks":reactHooks,
      "unused-imports":unusedImports,
      import:importPlugin,
      "simple-import-sort":simpleImportSortPlugin,
      "fsd-import":FSDImports
    },
    languageOptions:{
      parser:tsParser,
      ecmaVersion:"latest",
      sourceType:"module",
      parserOptions:{
        ecmaFeatures:{
          jsx:true,
        },
      },
    },
    rules:{
      "unused-imports/no-unused-imports":"error",
      "simple-import-sort/exports":"error",
      "import/first":"error",
      "import/newline-after-import":"error",
      "import/no-duplicates":"error",
      "fsd-import/fsd-relative-path":["error", { alias: "@" }],
      "fsd-import/public-api-imports":["error", { alias: "@" , testFilesPatterns: [] }],
      "fsd-import/layer-imports":["error", { alias: "@" }],
      "simple-import-sort/imports":[
        "error",
        {
          /// Порядок:
          /// импорты из библиотек,
          /// импорты компонентов,
          /// относительные импорты,
          /// импорты типов и констант,
          /// остальные импорты
          /// импорты стилей,
          groups:[
            // Внешние библиотеки
            ["^react", "^@?\\w"],
            // Компоненты
            ["^@/components"],
            // Относительные импорты
            ["^\\."],
            // Типы и константы
            ["^@/types", "^@/constants"],
            // Остальные импорты
            ["^@/"],
            // Стили
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "react/jsx-filename-extension":[
        2,
        {
          extensions:[".js", ".jsx", ".tsx"],
        },
      ],
      "import/no-unresolved":"off",
      "import/prefer-default-export":"off",
      "no-unused-vars":"off",
      "react/require-default-props":"off",
      "react/react-in-jsx-scope":"off",
      "react/no-unknown-property":["error",{ignore:["global", "jsx"]}],
      "react/function-component-definition":"off",
      "no-shadow":"off",
      "import/extensions":"off",
      "import/no-extraneous-dependencies":"off",
      "no-underscore-dangle":"off",
      "max-len":[
        "error",
        {
          ignoreComments:true,
          code:125,
        },
      ],
      "jsx-a11y/no-static-element-interactions":"off",
      "jsx-a11y/click-events-have-key-events":"off",
      "react-hooks/rules-of-hooks":"error",
      "react-hooks/exhaustive-deps":"warn",
      "no-param-reassign":"off",
      "no-undef":"off",
      "react/no-array-index-key":"off",
      "arrow-body-style":"off",
      "react/jsx-max-props-per-line":[
        "error",
        {
          maximum:4,
        },
      ],
      "react/no-unstable-nested-components":"warn",
    },
  },
];

export default config;
