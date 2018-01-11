const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// merge all configuration in webpack.common.js to this config
module.exports = merge(common, {
  // devtools helps to control if and how source maps are generated
  // inline-source-map  transformed code are (lines only)
  devtool: 'inline-source-map',
  plugins: [
    // it exchanges, adds, or removes modules while an application is running without a page reload.
    new webpack.HotModuleReplacementPlugin(),
  ]
});
