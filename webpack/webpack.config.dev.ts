import { Configuration } from 'webpack'
import Environments from './environments.js'
import { getParts, distFolder } from './parts'

const environments = Environments()
console.log(`Running webpack config for environment: ${environments.current}`)

const parts = getParts()

const config: Configuration = {

    context: parts.context,

    mode: 'development',

    entry: parts.entry,

    devtool: 'cheap-module-eval-source-map',

    output: parts.output,

    resolve: parts.resolve,

    module: parts.module,

    node: parts.node,

    plugins: parts.plugins,

    devServer: {
        contentBase: distFolder(),
        overlay: true,
        hot: true,
        open: true
    }
}

export default config
