import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import pdfjsLib from 'pdfjs-dist';


import 'react-pdf-reader/dist/sass/TextLayerBuilder.scss';
import 'react-pdf-reader/dist/sass/PdfReader.scss';

import 'materialize-css/dist/js/materialize.min';

import './public/js/jquery';
import './public/js/dashboard';

import './public/scss/materialize.scss';
import { setCurrentuser } from './actions/setCurrentuser';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.eot';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.woff';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2';
import './public/font-awesome-4.7.0/fonts/fontawesome-webfont.svg';
import './public/font-awesome-4.7.0/scss/font-awesome.scss';
import './public/fonts/roboto/Roboto-Bold.woff';
import './public/fonts/roboto/Roboto-Bold.woff2';
import './public/fonts/roboto/Roboto-Light.woff';
import './public/fonts/roboto/Roboto-Light.woff2';
import './public/fonts/roboto/Roboto-Medium.woff';
import './public/fonts/roboto/Roboto-Medium.woff2';
import './public/fonts/roboto/Roboto-Regular.woff';
import './public/fonts/roboto/Roboto-Regular.woff2';
import './public/fonts/roboto/Roboto-Thin.woff';
import './public/fonts/roboto/Roboto-Thin.woff2';
import './public/js/googlePlatformScript/googlePlatform';
import routes from './src/routes/routes';
import rootReducer from './reducers/rootReducer';

pdfjsLib.PDFJS.workerSrc = '../../build/webpack/pdf.worker.bundle.js';
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f));
if (localStorage.jwtToken) {
  store.dispatch(setCurrentuser(jwtDecode(localStorage.jwtToken)));
}
export default store;
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));
