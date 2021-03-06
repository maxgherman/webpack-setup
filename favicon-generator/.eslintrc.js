module.exports =  {
    env: {
        browser: true
    },

    parser:  '@typescript-eslint/parser',  // parser

    plugins: ['@typescript-eslint'],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],

    parserOptions:  {
      ecmaVersion:  2018,  // modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
    },

    rules:  {
        semi: ["error", "never"],
        "@typescript-eslint/prefer-interface": ["off"],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": false
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "linebreak-style": ["error", "unix"]
    }
};
