// This config is used by dev and production configuration

const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  entry: [path.join(__dirname, '/client/index.jsx')],
  output: {
    path: path.join(__dirname, '/client/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    // it Automatically load modules instead of having to import or require them everywhere
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    // DefinePlugin allows to create global constants which can be configured at compile time
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        UPLOAD_PRESET: JSON.stringify(process.env.UPLOAD_PRESET),
        SECRET: JSON.stringify(process.env.SECRET),
      }
    })
  ],
  module: {
    // Loaders help in transformations
    // that are applied on the source code of a module which allow 
    // to pre-process files when imported or loaded
    loaders: [{
      // jsx file loader
      test: /\.jsx?$/,
      include: path.join(__dirname, 'client'),
      exclude: path.join(__dirname, 'node_modules/asx/js/'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
      },
    },
    // Style loader
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },
    {
      test: /\.(ttf|woff|woff2|eot|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: './',
        },
      },
    },
    // file-loader
    {
      test: /\.(png|jpg|gif|svg)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: './',
        },
      },
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
      }],
    },
    {
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader'
      },
    },

    ],
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
  },
};
