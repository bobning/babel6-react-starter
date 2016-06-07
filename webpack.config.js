/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('./package.json');

var config = {
  entry: {
    vendor: ['react', 'react-dom', 'isomorphic-fetch'],
    index: ['./src/entry/index'],
    news: ['./src/entry/news'],
    stock: ['./src/entry/stock']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.DEBUG ? '/dist/' : 'your cdn url',
    filename: pkg.version + '/[name].min.js'
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js', '.css', '.less', '.jpg', '.png', '.gif']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash:8].min.js'
    }),
    new ExtractTextPlugin('./src/css/[name]', 'css/[name].[hash:8].min.css'),
    new HtmlWebpackPlugin({
      title: 'index',
      chunks: ['vendor', 'index'],
      filename: 'index.html',
      template: './src/base.html'
    }),
    new HtmlWebpackPlugin({
      title: 'news',
      chunks: ['vendor', 'news'],
      filename: 'news.html',
      template: './src/base.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.jsx$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader')
      }
    ]
  }
};

if (!process.env.DEBUG) {
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
}


module.exports = config