var webpack = require('webpack');
var pjson = require('./package.json');

module.exports = {
  output: { filename: pjson.name + '-' + pjson.version + '.js' },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  }
};
