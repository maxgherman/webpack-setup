import path from 'path'
import webpack, { Entry, Output, Node, Resolve, Plugin, Module } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const distFolder = () => path.resolve(__dirname, '../dist')

export const getParts = () => ({
    context: path.join(__dirname, '../src'),

    entry: {
        main: './index',
    } as Entry,

    output: {
        path: path.resolve(distFolder(), 'js'),
        filename: '[name].bundle.js',
        publicPath: '/js'
    } as Output,

    node: {
        fs: 'empty'
    } as Node,

    resolve: {
        extensions: ['.ts', '.js', '.json']
    } as Resolve,

    module: {
        rules: [{
            // Include ts/js files.
            test: /\.(ts)|(js)$/,

            exclude: [ // https://github.com/webpack/webpack/issues/6544
                /node_modules/,
            ],
            loader: 'babel-loader',
         }]
    } as Module,

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: '../index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new CleanWebpackPlugin({ verbose: true })
    ] as Plugin[]
})
