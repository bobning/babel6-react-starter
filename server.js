const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const host = '0.0.0.0'
const port = 8080
const url = 'http://'+ host + ':'+ port

config.devtool = 'source-map';

for (let e in config.entry) {
  config.entry[e].unshift('webpack-dev-server/client?' + url, 'webpack/hot/dev-server');
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  progress: true,
  inline: true,
  proxy: {
    '*.html': url + config.output.publicPath
  }
});

server.listen(port, host, function(err, ret) {
  if (err) console.log(err)
  console.log('listening at ' + url)
});