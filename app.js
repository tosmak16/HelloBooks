import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';
import webpackHotMiddleware from 'webpack-hot-middleware';
import route from './server/server/routes';


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
// Require our routes into the application.
route(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
export default app;
