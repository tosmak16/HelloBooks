import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';


import 'materialize-css/dist/js/materialize.min';
import routes from './src/routes/routes';
import './public/js/jquery';
import './public/js/dashboard';
import rootReducer from './reducers/rootReducer';
import './public/scss/materialize.scss';
import setAuthToken from './shield/setAuthToken';
import { setCurrentuser } from './actions/setCurrentuser';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.eot';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.woff';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.svg';
import './public/font-awesome-4.7.0/scss/font-awesome.scss';


const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f));

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentuser(jwtDecode(localStorage.jwtToken)));
}
export default store;
render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('app'));
