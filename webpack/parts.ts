import path from 'path'
import webpack, { Entry, Output, Node, Resolve, Plugin, RuleSetRule, Options } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const folders = {
    dist: () => path.resolve(__dirname, '../dist'),
    distJs: () => path.resolve(__dirname, '../dist/js')
}

export const getParts = () => ({
    context: path.join(__dirname, '../src'),

    entry: {
        main: './index',
        utils: './utils/index'
    } as Entry,

    output: {
        path: folders.distJs(),
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
        exclude: /favicons/,
        use: [
        {
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: '../img/[name].[ext]',
            }
        }]
    },
    {
        test: /favicons\/.*\.(ico|png)$/,
        loader: 'file-loader?name=../[name].[ext]'
    }] as RuleSetRule[] ,

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                `${folders.dist()}/**/*`
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
