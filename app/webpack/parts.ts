import path from 'path'
import webpack, {
    Entry,
    ResolveOptions,
    RuleSetRule,
    Configuration,
    WebpackPluginInstance,
    container
} from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const { ModuleFederationPlugin } = container

type Output = Configuration["output"]
type Rules = {
    babel: RuleSetRule
    images: (name?: string) => RuleSetRule
    fonts: (name?: string) => RuleSetRule
}
type Parts = {
    context: string
    entry: Entry
    output: Output
    resolve: ResolveOptions
    rules: Rules
    plugins: (param: { cleanVerbose?: boolean; remoteAppUrl?: string }) => WebpackPluginInstance[]
}

export const folders = {
    dist: (): string => path.resolve(__dirname, '../dist'),
    assets: {
        favicon: './assets/favicons/favicon.ico',
        favicons: './assets/favicons',
        faviconsManifest: path.resolve('./assets/favicons/manifest.json')
    }
}

export const getParts = (): Parts => ({
    context: path.join(__dirname, '../.'),

    entry: {
        main: './src/index'
    },

    output: {
        path: folders.dist(),
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        fallback: { fs: false }
    },

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
        }),

        fonts: (name?: string) => ({
            test: /\.(woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    ...(name ? { name } : {})
                    }
            }]
        })
    },

    plugins: ({ cleanVerbose, remoteAppUrl}) => {
        if(!remoteAppUrl) {
            throw new Error('Missing remoteAppUrl value')
        }

        return [
            new webpack.EnvironmentPlugin(['NODE_ENV']),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    `${folders.dist()}/**/*`,
                    `!${folders.dist()}/stats.json`
                ],
                verbose: cleanVerbose
            }),
            new ModuleFederationPlugin({
                name: "app1",
                remotes: {
                    app2: remoteAppUrl,
                },
                shared: ["date-fns"]
            })
        ]
    }
})
