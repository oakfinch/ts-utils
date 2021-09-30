module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "import/no-extraneous-dependencies": ["off", {"devDependencies": ["**/*.test-d.ts"]}]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"]
      }
    }
  }
}
