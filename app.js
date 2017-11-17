import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.dev';
import route from './server/routes';

dotenv.config();
// Set up the express app
const app = express();
const DIST_DIR = path.join(__dirname, '/client/public');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
// Require routes into the application.
route(app);

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleware(compiler));
  //  A default catch-all route for serving index.html.
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/public/index.html')));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => res.sendFile(HTML_FILE));
}


server.listen(port);
export default app;
