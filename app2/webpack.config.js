const path = require("path");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const argv = require('webpack-nano/argv');
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { mode, watch } = argv;

module.exports = {
  watch,
  mode,
  entry: ['./src/index', 'webpack-plugin-serve/client'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-typescript'],
      }
    }]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./Text": "./src/text-component",
      },
      shared: ["date-fns"]

    }),
    new MiniHtmlWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, 'dist')
      ],
      verbose: true
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 8081,
      static: "./dist",
      liveReload: true,
      waitForBuild: true,
      hmr: true
    })
  ]
};