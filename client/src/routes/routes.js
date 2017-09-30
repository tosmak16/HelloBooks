import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
// import Welcome from '../components/Welcome';
import Login from '../components/Login';
import SignUpPage from '../components/SignUpPage';
import BooksPage from '../components/Books/BooksPage';
import BookDetailsPage from '../components/BookDetail/BookDetailsPage';
import DashboardPage from '../components/Dashboard/DashboardPage';
import AdminPage from '../components/Admin/AdminPage';
import cAuth from '../components/middlewares/cAuth';
import adminAuth from '../components/middlewares/adminAuth';

export default
(

  <Route path="/" component={ App }>
    <IndexRoute component={ Login } />
    <Route path="login" component={ Login } />
    <Route path="signup" component={ SignUpPage } />
    <Route path="books" component={ BooksPage } />
    <Route path="details" component={ cAuth(BookDetailsPage) } />
    <Route path="dashboard" component={ cAuth(DashboardPage) } />
    <Route path="admin" component={ adminAuth(AdminPage) } />
  </Route>


);
