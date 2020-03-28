import path from 'path'
import webpack, { Entry, Output, Node, Resolve, Plugin, RuleSetRule, Options } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const folders = {
    dist: () => path.resolve(__dirname, '../dist'),
    assets: {
        favicon: './assets/favicons/favicon.ico',
        favicons: './assets/favicons',
        faviconsManifest: path.resolve('./assets/favicons/manifest.json')
    }
}

export const getParts = () => ({
    context: path.join(__dirname, '../.'),

    entry: {
        main: './src/index'
    } as Entry,

    output: {
        path: folders.dist(),
        filename: '[name].js',
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
                        esModule: false,
                        limit: 10000,
                        name: 'img/[name].[ext]',
                        ...(name ? { name } : {})
                    }
                }]
        }) as RuleSetRule,

        fonts: (name?: string) => ({
            test: /\.(woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    ...(name ? { name } : {})
                    }
            }]
        }) as RuleSetRule
    },

    plugins: ({ cleanVerbose = false }: { cleanVerbose: boolean } = {cleanVerbose: false}) => ([
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                `${folders.dist()}/**/*`,
                `!${folders.dist()}/stats.json`
            ],
            verbose: cleanVerbose
        })
    ]) as Plugin[]
})
