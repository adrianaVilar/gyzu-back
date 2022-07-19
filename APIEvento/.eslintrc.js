module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "class-methods-use-this": "off",
    quotes: "off",
    "import/first": "off",
    "comma-dangle": "off",
    "implicit-arrow-linebreak": "off",
    "no-param-reassign": "off",
    "operator-linebreak": "off",
    camelcase: "off",
  },
};
