/* eslint-disable no-console */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true
  }
}).listen(4000, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Listening at 0.0.0.0:4000');
});

var spawn = require('child_process').spawn;
var path = require('path');

var npm = spawn('npm', ['run', 'start'], {cwd: path.join(__dirname, '../server')});

function transString(fn) {
  return function() {
    fn.apply(this, ['SERVER'].concat(Array.prototype.slice.call(arguments).map(function(buf) {
      return buf.toString();
    })));
  };
}

npm.stdout.on('data', transString(console.log));
npm.stderr.on('data', transString(console.log));
npm.on('close', transString(console.log.bind(this, 'Child process exited')));
