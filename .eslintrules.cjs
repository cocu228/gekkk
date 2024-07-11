module.exports = {
  // For Production
  "no-duplicate-case": 0,
  "no-console": 0,
  "no-debugger": 0,
  "no-unused-vars": 0,
  "@typescript-eslint/no-unused-vars": [2, {
    "args": "all",
    "argsIgnorePattern": "^_",
    "caughtErrors": "all",
    "caughtErrorsIgnorePattern": "^_",
    "destructuredArrayIgnorePattern": "^_",
    "varsIgnorePattern": "^_",
    "ignoreRestSiblings": true
  }],
  // eslint
  "arrow-body-style": ["error", "as-needed"],
  "eol-last": 1,
  "max-len": [
    1,
    {
      code: 120,
      comments: 200,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      tabWidth: 2
    }
  ],
  "no-multiple-empty-lines": 1,
  "no-param-reassign": [0],
  "no-spaced-func": 0,
  "object-curly-newline": [
    1,
    {
      ObjectExpression: { consistent: true, multiline: true },
      ObjectPattern: { consistent: true, multiline: true },
      ExportDeclaration: { multiline: true, minProperties: 3 }
    }
  ],
  "prefer-const": 1,
  "prefer-template": 1,
  "no-nested-ternary": 0,

  // import
  "import/newline-after-import": [
    "error",
    {
      count: 1
    }
  ],
  // import
  "simple-import-sort/exports": "error",
  "unused-imports/no-unused-imports": "error",
  "import/no-extraneous-dependencies": [0],
  "import/no-cycle": 1,
  "import/no-named-as-default": 1,
  "import/no-unresolved": [0],
  "import/prefer-default-export": "off",
  "import/order": [
    1,
    {
      "newlines-between": "always",
      groups: [["builtin", "external"], "internal", ["parent", "index", "sibling"], ["object", "type"]],
      "warnOnUnassignedImports": true,
    }
  ],

  // react
  "jsx-a11y/control-has-associated-label": 0,
  "jsx-a11y/no-static-element-interactions": 0,
  "jsx-a11y/click-events-have-key-events": 0,
  "react/function-component-definition": 0,
  "react/jsx-props-no-spreading": 0,
  "react/display-name": 0,
  "react/jsx-key": ["error", {
    "checkFragmentShorthand": true,
    "checkKeyMustBeforeSpread": true,
    "warnOnDuplicates": true
  }],
  "react/no-array-index-key": 2,
  "react/no-unused-prop-types": [0, { skipShapeProps: true }],
  "react/prop-types": 0,
  "react/react-in-jsx-scope": 0,
  "react/require-default-props": 0,
  "react/self-closing-comp": 1,
  "react-hooks/exhaustive-deps": 0,
  "react/no-unescaped-entities": 0,

  // react-refresh
  "react-refresh/only-export-components": [0],

  // ts
  "@typescript-eslint/naming-convention": 0,
  "@typescript-eslint/no-unnecessary-type-arguments": 0,
  "@typescript-eslint/await-thenable": 0,
  "@typescript-eslint/ban-ts-comment": 0,
  "@typescript-eslint/ban-types": 2,
  "@typescript-eslint/indent": 0,
  "@typescript-eslint/no-duplicate-type-constituents": 2,
  "@typescript-eslint/no-explicit-any": 0,
  "@typescript-eslint/no-floating-promises": 0,
  "@typescript-eslint/no-misused-promises": [0, { checksVoidReturn: { arguments: false, attributes: false } }],
  "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
  "@typescript-eslint/no-non-null-assertion": 0,
  "@typescript-eslint/no-redundant-type-constituents": 0,
  "@typescript-eslint/no-unnecessary-type-assertion": 0,
  "@typescript-eslint/no-unsafe-argument": 0,
  "@typescript-eslint/no-unsafe-assignment": 0,
  "@typescript-eslint/no-unsafe-call": 2,
  "@typescript-eslint/no-unsafe-enum-comparison": 2,
  "@typescript-eslint/no-unsafe-member-access": 0,
  "@typescript-eslint/no-unsafe-return": 0,
  "@typescript-eslint/require-await": 0,
  "@typescript-eslint/restrict-template-expressions": 0,
  "@typescript-eslint/explicit-function-return-type": 0,
  "@typescript-eslint/no-shadow": 0,
  "@typescript-eslint/no-unused-expressions": 0,
  "@typescript-eslint/no-use-before-define": ["error", {
    "functions": false,
  }],

  // prettier
  "prettier/prettier": 1
};
