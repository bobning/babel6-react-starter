/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

for (var e in config.entry) {
  config.entry[e].unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');    
}
config.devtool = 'source-map';

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  progress: true,
  devtool: 'source-map',
  inline: true
});

server.listen(8080, '0.0.0.0', function(err, ret) {
  if (err) console.log(err)
  console.log('listening at 0.0.0.0:8080')
});