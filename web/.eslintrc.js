module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
    },
    env: {
        browser: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:prettier/recommended",
    ],
    // required to lint *.vue files
    plugins: ["vue"],
    // add your custom rules here
    rules: {
        semi: ["error", "always"],
        indent: ["error", 4],
        quotes: 0,
        "eol-last": 0,
        "no-multi-spaces": 0,
        "endOfLine": "auto",
        "no-undef": 0,
        "space-infix-ops": 0,
        "promise/param-names": 0,
        // allow async-await
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-trailing-spaces": "warn",
        "vue/max-attributes-per-line": "off",
    },
};
