import path from 'path'
import webpack, { Entry, Output, Node, Resolve, Plugin, RuleSetRule, Options } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const folders = {
    dist: () => path.resolve(__dirname, '../dist'),
    assets: {
        fonts: '../assets/fonts',
        favicons: '../assets/favicons',
        faviconsManifest: '../assets/favicons/manifest.json'
    }
}

export const getParts = () => ({
    context: path.join(__dirname, '../src'),

    entry: {
        main: './index'
    } as Entry,

    output: {
        path: folders.dist(),
        filename: '[name].bundle.js',
        publicPath: '/'
    } as Output,

    node: {
        fs: 'empty'
    } as Node,

    resolve: {
        extensions: ['.ts', '.js', '.json']
    } as Resolve,


    rules: {
        babel: {
            // Include ts/js files.
            test: /\.(ts)|(js)$/,

            exclude: [ /node_modules/ ],
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        },

        images: (name?: string) => ({
                test: /\.(png|jpg|gif|bmp)$/,
                exclude: /favicons/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: './img/[name].[ext]',
                        ...(name ? { name } : {})
                    }
                }]
        }) as RuleSetRule
    },

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                `${folders.dist()}/**/*`
            ],
            verbose: true
        })
    ] as Plugin[]
})
