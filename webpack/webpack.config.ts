import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
import Environments from './environments.js'
import { getParts, folders } from './parts'

const environments = Environments()
console.log(`Running webpack config for environment: ${environments.current}`)

const parts = getParts()

const config: Configuration = {

    context: parts.context,

    mode: 'production',

    entry: parts.entry,

    output: parts.output,

    devtool: 'source-map',

    resolve: parts.resolve,

    module: {
        rules: [
            ...parts.rules,
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.pcss$/,
                exclude: /\.module\.pcss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ]
            },
            {
                test: /\.module\.pcss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader', options: { modules: true, importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './fonts/[name].[ext]'
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
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        }),
        new CopyPlugin([{
            from: '../assets/favicons',
            to: folders.dist()
        },
        {
            from: '../assets/favicons/manifest.json',
            to:folders.dist()
        }])
    ],

    optimization: {
        ...parts.optimization({
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'initial',
                enforce: true,
                minSize: Infinity
              }
        }),

        minimize: true,
        removeAvailableModules: true,
    }
}

export default config
