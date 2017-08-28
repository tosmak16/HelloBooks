import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


import 'materialize-css/dist/js/materialize.min';
import routes from './src/routes/routes';
import './public/js/jquery';
import './public/js/dashboard';
import rootReducer from './reducers/rootReducer';
import './public/scss/materialize.scss';


const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f));

export default store;
render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('app'));
