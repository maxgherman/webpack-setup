module.exports =  {
    env: {
        browser: true
    },

    parser:  '@typescript-eslint/parser',  // parser

    plugins: ['@typescript-eslint'],

    extends:  [
      'plugin:@typescript-eslint/recommended',  // recommended rules
    ],

    parserOptions:  {
      ecmaVersion:  2018,  // modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
    },

    rules:  {
        semi: ["error", "never"],
        "linebreak-style": ["error", "unix"]
    }
};
