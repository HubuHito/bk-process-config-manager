module.exports = {
  root: true,
  extends: ['@blueking/eslint-config-bk/tsvue3'], // vue2 这里用 @blueking/eslint-config-bk/tsvue
  parserOptions: {
    project: [
      './tsconfig.json',
    ],
  },
   // add your custom rules hered
   rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  },
};