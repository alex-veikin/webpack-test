const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
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
                        options: {presets: ['env', 'stage-3']}
                    }
                ]
            }
        ]
    },
    devServer: {
        overlay: true,
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

module.exports = (env, options) => {
    let productions = options.mode === 'production';

    conf.devtool = productions ? false : 'eval-sourcemap';

    return conf;
};