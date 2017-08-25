import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './src/routes/routes';
import $ from 'jquery';
import './public/js/jquery';


import './public/js/dashboard';

render(<Router history={ browserHistory } routes={ routes } />, document.getElementById('app'));
