import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.min.js';
import routes from './src/routes/routes';
import './public/js/jquery';

import './public/js/dashboard';


const store = createStore(
  (state = {}) => state, applyMiddleware(thunk)
);

export default store;
render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('app'));
