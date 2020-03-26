import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
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
            ...parts.rules,
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.pcss$/,
                exclude: /\.module\.pcss$/,
                use: ['style-loader', 'postcss-loader']
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
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
                    'style-loader',
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader', options: { modules: true, importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
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
            from: '../assets/fonts/**/*',
            to: path.resolve(folders.dist(), 'assets')
        }])
    ],

    optimization: parts.optimization(),

    devServer: {
        contentBase: folders.dist(),
        overlay: true,
        hot: true,
        open: true,
        writeToDisk: true
    }
}

export default config
