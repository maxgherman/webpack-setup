const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const Environments = require('./webpack/environments');

const prodPlugins = [
    cssnano({
        preset: 'default'
    })
];

module.exports = function(ctx) {

    const environments = Environments(ctx.env);

    return {
        plugins: [
            postcssPresetEnv({
                features: {
                    'nesting-rules': true,
                    'color-mod-function': { unresolved: 'warn' }
                }
        })]
        .concat(environments.isProduction ? prodPlugins : [])
    };
}
