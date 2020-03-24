module.exports = api => {

    api.cache(true)

    return {
        presets: [
            ["@babel/preset-env", {
                "useBuiltIns": "usage",
                corejs: 3,
            }],
            "@babel/typescript"
        ],

        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            ["@babel/plugin-transform-runtime", {
                corejs: 3,
                useESModules: true
            }],

            [require.resolve('babel-plugin-module-resolver'), {
                root: ["."],
                alias: {
                    "@app": "./src/app",
                    "@utils": "./src/utils"
                }
            }],
        ]
    }
}
