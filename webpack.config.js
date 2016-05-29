/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    libs: ['react', 'react-dom', 'isomorphic-fetch'],
    index: ['./src/entry/index'],
    news: ['./src/entry/news'],
    stock: ['./src/entry/stock']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.DEBUG ? '/dist/' : 'your cdn url',
    filename: '[name].[chunkhash:8].min.js'
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js', '.css', '.less', '.jpg', '.png', '.gif']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
      filename: 'libs.[hash:8].min.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      chunks: ['libs', 'index'],
      filename: 'index.html',
      template: './src/base.html'
    }),
    new HtmlWebpackPlugin({
      title: 'news',
      chunks: ['libs', 'news'],
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
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
};