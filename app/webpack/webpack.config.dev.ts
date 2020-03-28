import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin'
import { getParts, folders } from './parts'

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
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            parts.rules.fonts()
        ]
    },

    node: parts.node,

    plugins: [
        ...parts.plugins({ cleanVerbose: true }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            favicon: folders.assets.favicon,
            alwaysWriteToDisk: true,
            minify: false
        }),
        new ManifestPlugin({
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
        writeToDisk: true
    }
}

export default config
