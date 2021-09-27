const INLINE_ELEMENTS = require("eslint-plugin-vue/lib/utils/inline-non-void-elements.json");

// const error = "error";
const error = "warn";
const warn = "warn";

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // "eslint:recommended"
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: [
    "@babel",
    "vue"
  ],
  rules: {
    "no-console": "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? error : "off",
    "semi": ["error", "always"],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "object-curly-spacing": ["error", "always"],
    "template-curly-spacing": ["error", "always"],
    "dot-location": ["error", "property"],
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-self-compare": "off",
    "comma-dangle": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "space-before-function-paren": "error",
    "space-in-parens": ["error", "never"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-template-curly-in-string": warn,
    "array-callback-return": error,
    "no-extra-parens": error,
    "class-methods-use-this": error,
    "default-param-last": error,
    "dot-notation": error,
    "grouped-accessor-pairs": [error, "getBeforeSet"],
    "no-eval": "error",
    "no-caller": error,
    "no-implied-eval": error,
    "no-extend-native": error,
    "no-extra-bind": error,
    "no-floating-decimal": error,
    "no-invalid-this": error,
    "no-iterator": error,
    "no-lone-blocks": error,
    "no-multi-spaces": error,
    "no-new": error,
    "no-new-func": error,
    "no-new-wrappers": error,
    "no-proto": error,
    "no-return-assign": error,
    "no-return-await": error,
    "no-script-url": error,
    "no-useless-concat": error,
    "require-await": error,
    "vars-on-top": error,
    "yoda": warn,
    "wrap-iife": [error, "inside", { functionPrototypeMethods: true }],
    "no-unused-vars": [error, {
      vars: "all",
      args: "after-used",
      argsIgnorePattern: "_",
      ignoreRestSiblings: true
    }]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: [
        "@typescript-eslint"
      ],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      rules: {
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "require-await": "off",
        "no-return-assign": "off"
      }
    },
    {
      files: ["*.vue"],
      extends: [
        // "@vue/typescript/recommended",
        // "@vue/prettier",
        // "@vue/prettier/@typescript-eslint",
        "plugin:vue/base"
      ],
      rules: {
        "vue/html-indent": [error, 2, {
          "attribute": 1,
          "baseIndent": 1,
          "closeBracket": 0,
          "alignAttributesVertically": true,
          "ignores": []
        }],
        "vue/script-indent": [error, 2,
          {
            "baseIndent": 1,
            "switchCase": 1,
            "ignores": []
          }
        ],
        "vue/html-self-closing": [warn, {
          "html": {
            "void": "never",
            "normal": "never",
            "component": "never"
          },
          "svg": "never",
          "math": "never"
        }],
        "vue/html-closing-bracket-newline": [error, {
          "singleline": "never",
          "multiline": "never"
        }],
        "vue/html-closing-bracket-spacing": [error, {
          "startTag": "never",
          "endTag": "never",
          "selfClosingTag": "never"
        }],
        "vue/html-end-tags": error,
        "vue/html-quotes": [error, "double"],
        "vue/multiline-html-element-content-newline": [error, {
          "ignoreWhenEmpty": true,
          "ignores": ["pre", "textarea", ...INLINE_ELEMENTS],
          "allowEmptyLines": false
        }],
        "vue/mustache-interpolation-spacing": [error, "always"],
        "vue/name-property-casing": [error, "PascalCase"],
        "vue/no-multi-spaces": [error, { "ignoreProperties": false }],
        "vue/no-spaces-around-equal-signs-in-attribute": [error],
        "vue/no-template-shadow": [error],
        "vue/prop-name-casing": [error, "camelCase"],
        "vue/require-default-prop": [warn],
        "vue/require-prop-types": [warn],
        "vue/singleline-html-element-content-newline": [error, {
          "ignoreWhenNoAttributes": true,
          "ignoreWhenEmpty": true,
          "ignores": ["pre", "textarea", ...INLINE_ELEMENTS]
        }],
        "vue/v-bind-style": [error, "shorthand"],
        "vue/v-on-style": [error, "shorthand"],
        "vue/attributes-order": [error, {
          "order": [
            "CONDITIONALS",
            "GLOBAL",
            "UNIQUE",
            "DEFINITION",
            "LIST_RENDERING",
            "TWO_WAY_BINDING",
            "RENDER_MODIFIERS",
            "OTHER_DIRECTIVES",
            "CONTENT",
            "OTHER_ATTR",
            "EVENTS"
          ],
          "alphabetical": false
        }],
        "vue/order-in-components": [error, {
          "order": [
            // ["delimiters", "comments"],
            "name",
            "el",
            "inheritAttrs",
            "template",
            "render",
            "functional",
            "parent",
            "model",
            "extends",
            "mixins",
            "components",
            "props",
            "propsData",
            "directives",
            "filters",
            "beforeCreate",
            "created",
            "beforeMount",
            "mounted",
            "data",
            "asyncData",
            "beforeUpdate",
            "updated",
            "activated",
            "deactivated",
            "fetch",
            "head",
            "computed",
            "methods",
            "watch",
            "beforeDestroy",
            "destroyed",
            "renderError",
            "errorCaptured"
          ]
        }],
        "vue/component-name-in-template-casing": [error, "PascalCase", {
          "registeredComponentsOnly": true,
          "ignores": []
        }],
        "vue/component-definition-name-casing": [error, "PascalCase"],
        "vue/match-component-file-name": ["error", {
          "extensions": ["vue"],
          "shouldMatchCase": true
        }]
      }
    }
  ]
};
