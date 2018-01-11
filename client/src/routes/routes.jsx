import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from '../components/App';
import LoginPage from '../components/Login';
import SignupPage from '../components/SignUpPage';
import BookPage from '../components/Books/BooksPage';
import BooksDetailsPage from '../components/BookDetail/BookDetailsPage';
import BorrowBooksPage from '../components/Dashboard/Containers/BorrowedBooksPage';
import BorrowedHistoryPage from '../components/Dashboard/Containers/BorrowHistoryBooksPage';
import UserProfilePage from '../components/Dashboard/Containers/UserProfile';
import ChangedPasswordPage from '../components/Dashboard/Containers/ChangePasswordPage';
import BookStoreContainer from '../components/Admin/Containers/BookStoreContainer';
import UserAuth from '../components/middlewares/UserAuth';
import AdminShield from '../components/middlewares/AdminShield';
import UploadBooksContainer from '../components/Admin/Containers/UploadBooksContainer';
import UpdateBooksContainer from '../components/Admin/Containers/UpdateBooksContainer';
import LoginAuth from '../components/middlewares/LoginAuth';


export default
(
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginAuth(LoginPage)} />
    <Route path="/signup" component={LoginAuth(SignupPage)} />
    <Route path="/books" component={BookPage} />
    <Route path="/books/:category" component={BookPage} />
    <Route path="/book/details" component={UserAuth(BooksDetailsPage)} />
    <Route path="/dashboard" component={UserAuth(BorrowBooksPage)} />
    <Route path="/dashboard/borrowedbooks" component={UserAuth(BorrowBooksPage)} />
    <Route path="/dashboard/history" component={UserAuth(BorrowedHistoryPage)} />
    <Route path="/dashboard/userprofile" component={UserAuth(UserProfilePage)} />
    <Route path="/dashboard/changepassword" component={UserAuth(ChangedPasswordPage)} />
    <Route path="/admin" component={AdminShield(BookStoreContainer)} />
    <Route path="/admin/bookstore" component={AdminShield(BookStoreContainer)} />
    <Route path="/admin/uploadbook" component={AdminShield(UploadBooksContainer)} />
    <Route path="/admin/updatebook" component={AdminShield(UpdateBooksContainer)} />
    <Redirect from="/*" to="/login" component={LoginPage} />
  </Route>
);
