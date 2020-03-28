import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { getParts, folders } from './parts'
import { requireManifest, generatePlain, generateFromManifest } from './manifest'

const readManifest = requireManifest(folders.assets.faviconsManifest)
const parts = getParts()

const config: Configuration = {

    context: parts.context,

    mode: 'production',

    entry: parts.entry,

    output: {
        ...parts.output,
        filename: '[name].[contenthash:8].js',
    },

    devtool: 'source-map',

    resolve: parts.resolve,

    module: {
        rules: [
            parts.rules.babel,
            parts.rules.images('img/[name].[contenthash:8].[ext]'),
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                sideEffects: true
            },
            {
                test: /\.pcss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                sideEffects: true
            },
            parts.rules.fonts('fonts/[name].[contenthash:8].[ext]')
        ]
    },

    node: parts.node,

    plugins: [
        ...parts.plugins(),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: './index.html',
            template: './webpack/index.html',
            alwaysWriteToDisk: true,
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            generate: (_, files) =>
                readManifest.result ?
                    generateFromManifest(readManifest.manifest!, files) :
                    generatePlain(files)
        }),

        new CopyPlugin([{
            from: folders.assets.favicons,
            to: folders.dist()
        }]),
    ],

    performance: {
        hints: 'error'
    },

    optimization: {
        moduleIds: 'hashed',
        minimize: true,
        removeAvailableModules: true,
        usedExports: true,
        concatenateModules: true,

        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    name(module: { context: string }) {
                        const packageName =
                            module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)![1]
                            .toLowerCase();

                        if(packageName.startsWith('core-js') ||
                            packageName.startsWith('babel')) {
                            return 'vendor.babel'
                        }

                        return `vendor.${packageName.replace('@', '')}`;
                    }
                }
            }
        },

        minimizer: [
            new TerserPlugin({
                terserOptions: {
                  compress: {
                    comparisons: false,
                    ecma: 5,
                    inline: true,
                    warnings: false,
                  },
                  keep_classnames: true,
                  keep_fnames: true,
                  parse: {
                    ecma: 8,
                  },
                  output: {
                    ascii_only: true,
                    ecma: 5,
                    comments: false,
                  },
                },
                sourceMap: true,
              })
        ]
    }
}

export default config
