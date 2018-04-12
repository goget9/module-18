const path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'app.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    devServer: {
      proxy: {
          '/socket.io': {
              target: 'http://localhost:3000',
              ws: true
          }
      }
    },
    plugins: 
        [
            new webpack.optimize.UglifyJsPlugin(),
            new OptimizeJsPlugin({
                sourceMap: false
            }),
            new HtmlWebpackPlugin({
                template: 'client/index.html',
                filename: 'index.html',
                inject: 'body'
            })
        ]
};