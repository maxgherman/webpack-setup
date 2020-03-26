import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import Environments from './environments.js'
import { getParts, folders } from './parts'

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

    module: {
        rules: [
            parts.rules.babel,
            parts.rules.images(),
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.pcss$/,
                use: ['style-loader', 'postcss-loader']
            }
        ]
    },

    node: parts.node,

    plugins: [
        ...parts.plugins,
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            favicon: '../assets/favicons/favicon.ico',
            alwaysWriteToDisk: true,
            minify: false
        }),
        new CopyPlugin([{
            from:  `${folders.assets.fonts}/**/*`,
            to: path.resolve(folders.dist(), 'assets')
        }]),
       new ManifestPlugin()
    ],

    optimization: parts.optimization,

    devServer: {
        contentBase: folders.dist(),
        overlay: true,
        hot: true,
        open: true,
        writeToDisk: true
    }
}

export default config
