const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

// merge all configuration in webpack.common.js to this config
module.exports = merge(common, {
  // devtools helps to control if and how source maps are generated
  // inline-source-map  uses original source why? because in production mode
  // file can be trace after file has been bundled and minified
  devtool: 'source-map',
  plugins: [
    // it minifies application file
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // DefinePlugin allows to create global constants which can be configured at compile time
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
