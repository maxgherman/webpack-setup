import webpack, { Configuration } from 'webpack';
import Environments from './environments.js'
import { getParts } from './parts'

const environments = Environments()
console.log(`Running webpack config for environment: ${environments.current}`);

const parts = getParts()

const config: Configuration = {

    context: parts.context,

    mode: 'production',

    entry: parts.entry,

    output: parts.output,

    node: parts.node,

    plugins: [
        ...parts.plugins,

        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            lineToLine: true
        })
    ],

    optimization: {
        minimize: true,
        removeAvailableModules: true
    }
}

export default config
