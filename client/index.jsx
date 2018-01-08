import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import pdfjsLib from 'pdfjs-dist';
import { setCurrentUserAuth } from './actions/setCurrentUserAuth';
import routes from './src/routes/routes';
import rootReducer from './reducers/rootReducer';
import './style';

pdfjsLib.PDFJS.workerSrc = '../../build/webpack/pdf.worker.bundle.js';
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f));
if (localStorage.jwtToken) {
  store.dispatch(setCurrentUserAuth(jwtDecode(localStorage.jwtToken)));
}
export default store;
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));
