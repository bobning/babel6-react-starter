/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('./package.json');

var config = {
  entry: {
    vendor: ['react', 'react-dom', 'isomorphic-fetch'],
    index: ['./src/js/home/index'],
    news: ['./src/js/news/index']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.DEBUG ? '/dist/' : 'http://your-cdn-url/',
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
      template: './src/templates/base.html'
    }),
    new HtmlWebpackPlugin({
      title: 'news',
      chunks: ['vendor', 'news'],
      filename: 'news.html',
      template: './src/templates/base.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192!file-loader?name=[path]/[name].[ext]'
      }
    ]
  }
};

if (process.env.ONLINE) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}


module.exports = config