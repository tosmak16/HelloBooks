import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';


import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import route from './server/routes';


// Set up the express app
const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);


// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

// Require our routes into the application.
route(app);


app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/public/index.html')));

export default app;
