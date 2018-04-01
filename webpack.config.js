const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }))
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {presets: ['env']}
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        inline: true,
        hot: true,
        hotOnly: true,
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
            disable: process.env.NODE_ENV === 'development'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        // new HtmlWebpackPlugin(),
        // new BrowserSyncPlugin({
        //     host: 'localhost',
        //     port: 3000,
        //     server: { baseDir: ['dist'] }
        // })
    ]
};