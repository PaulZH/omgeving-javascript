const path = require('path');
const fs = require('fs-extra');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

fs.emptyDir(path.resolve(__dirname, '../dist'));

module.exports = {
    entry: {
        // "VIEW-NAME": './src/js/VIEW-NAME.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'dist/',
        filename: '[name]-bundle.js?[chunkhash:4]'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash:4]',
                            publicPath: './',
                            emitFile: false,
                            useRelativePath: false
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['.vue', '.js']
    }
};
