import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import Environments from './environments'
import { getParts, folders } from './parts'

const environment  = Environments()
const parts = getParts()

const config: Configuration = {

    context: parts.context,

    mode: 'development',

    entry: parts.entry,

    devtool: 'eval',

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
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            parts.rules.fonts()
        ]
    },

    plugins: [
        ...parts.plugins({
            cleanVerbose: true,
            remoteAppUrl: environment.remoteAppUrl || 'app2@http://localhost:8081/remoteEntry.js'
        }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            favicon: folders.assets.favicon,
            alwaysWriteToDisk: true,
            minify: false
        }),
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json'
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    name: 'vendors',
                    chunks: 'all'
                },
            }
        },
        runtimeChunk: {
            name: 'vendors'
        }
    },

    devServer: {
        contentBase: folders.dist(),
        overlay: true,
        hot: true,
        open: true,
        writeToDisk: true,
        port: process.env.PORT ? Number(process.env.PORT) : 8080
    }
}

export default config
