import path from 'path'
import webpack, { Entry, Output, Node, Resolve, Plugin, RuleSetRule, Options } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const distFolder = () => path.resolve(__dirname, '../dist')

export const getParts = () => ({
    context: path.join(__dirname, '../src'),

    entry: {
        main: './index',
        utils: './utils/index'
    } as Entry,

    output: {
        path: path.resolve(distFolder(), 'js'),
        filename: '[name].bundle.js',
        publicPath: '/js/'
    } as Output,

    node: {
        fs: 'empty'
    } as Node,

    resolve: {
        extensions: ['.ts', '.js', '.json']
    } as Resolve,


    rules: [{
        // Include ts/js files.
        test: /\.(ts)|(js)$/,

        exclude: [ // https://github.com/webpack/webpack/issues/6544
            /node_modules/,
        ],
        loader: 'babel-loader',
    },
    {
        test: /\.(png|jpg|gif|bmp)$/,
        use: [
        {
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: '../img/[name].[ext]',
            }
        }]
    }] as RuleSetRule[] ,

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: '../index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, '../dist/css/**/*'),
                path.resolve(__dirname, '../dist/js/**/*'),
            ],
            verbose: true
        })
    ] as Plugin[],

    optimization: (cacheGroups?: { [key: string]: Options.CacheGroupsOptions }): Options.Optimization => ({
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    name: 'vendors',
                    chunks: 'all'
                },
                ...cacheGroups || {}
            }
        },
        runtimeChunk: {
            name: 'vendors'
        }
    })
})
