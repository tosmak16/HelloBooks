import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import route from './server/server/routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));


// Parse incoming requests data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log('app running');
// Require our routes into the application.
route(app);
// from('./server/routes')(app);
// import app from './server/routes';

// Setup a default catch-all route that sends back a welcome message in JSON format.


export default app;
