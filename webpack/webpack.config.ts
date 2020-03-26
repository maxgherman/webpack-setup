import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
import Environments from './environments.js'
import { getParts, folders } from './parts'
import { requireManifest, generatePlain, generateFromManifest } from './manifest'

const readManifest = requireManifest(folders.assets.faviconsManifest)

const environments = Environments()
console.log(`Running webpack config for environment: ${environments.current}`)

const parts = getParts()

const config: Configuration = {

    context: parts.context,

    mode: 'production',

    entry: parts.entry,

    output: {
        ...parts.output,
        filename: '[name].bundle.[contenthash:8].js',
    },

    devtool: 'source-map',

    resolve: parts.resolve,

    module: {
        rules: [
            parts.rules.babel,
            parts.rules.images('./img/[name].[contenthash:8].[ext]'),
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.pcss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[contenthash:8].[ext]'
                    }
                }]
            }
        ]
    },

    node: parts.node,

    plugins: [
        ...parts.plugins,
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: './index.html',
            template: '../webpack/index.html',
            alwaysWriteToDisk: true,
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        new ManifestPlugin({
            generate: (_, files) =>
                readManifest.result ?
                    generateFromManifest(readManifest.manifest!, files) :
                    generatePlain(files)
        }),

        new CopyPlugin([{
            from: folders.assets.favicons,
            to: folders.dist()
        }])
    ],

    optimization: {
        ...parts.optimization,

        moduleIds: 'hashed',
        minimize: true,
        removeAvailableModules: true,
    }
}

export default config
