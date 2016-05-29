const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const host = '0.0.0.0'
const port = 8080

config.devtool = 'source-map';

for (let e in config.entry) {
  config.entry[e].unshift('webpack-dev-server/client?http://'+ host + ':'+ port +'/', 'webpack/hot/dev-server');
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  progress: true,
  inline: true
});

server.listen(port, host, function(err, ret) {
  if (err) console.log(err)
  console.log('listening at ' + host + ':' + port)
});