import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
// import Welcome from '../components/Welcome';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import BooksPage from '../components/Books/BooksPage';
import BookDetailsPage from '../components/BookDetail/BookDetailsPage';


export default
(

  <Route path="/" component={ App }>
    <IndexRoute component={ Login } />
    <Route path="login" component={ Login } />
    <Route path="signup" component={ SignUp } />
    <Route path="books" component={ BooksPage } />
    <Route path="details" component={ BookDetailsPage } />
  </Route>


);
