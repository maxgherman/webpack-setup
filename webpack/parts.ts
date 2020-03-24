import path from 'path';
import webpack, { Entry, Output, Node, Plugin, Module } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const distFolder = () => path.resolve(__dirname, '../dist')

export const getParts = () => ({
    context: path.join(__dirname, '../src', 'app'),

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

    module: {
        rules: [{
            // Include js files.
            test: /\.js$/,

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
