const path = require('path');
const webpack = require('webpack');

// eslint-disable-next-line no-process-env
const isCi = process.env.NODE_ENV === 'ci';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    })
  ],

  module: {

    rules:
      (isCi ? [{
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          // typeCheck: true
        }
      }, {
        test: /\.ts$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'test')
        ],
        loader: 'sourcemap-istanbul-instrumenter-loader'
      }] : [])
      .concat({
        test: /\.ts$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'awesome-typescript-loader',
        options: {
          sourceMap: false,
          inlineSourceMap: true
        }
      })
  }
};
