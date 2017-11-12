import React from 'react';
import { Route, IndexRoute } from 'react-router';

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
import cAuth from '../components/middlewares/cAuth';
import adminAuth from '../components/middlewares/adminAuth';
import UploadBooksContainer from '../components/Admin/Containers/UploadBooksContainer';
import UpdateBooksContainer from '../components/Admin/Containers/UpdateBooksContainer';


export default
(
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/books" component={BookPage} />
    <Route path="/books/:category" component={BookPage} />
    <Route path="/book/details" component={cAuth(BooksDetailsPage)} />
    <Route path="/dashboard" component={cAuth(BorrowBooksPage)} />
    <Route path="/dashboard/borrowedbooks" component={cAuth(BorrowBooksPage)} />
    <Route path="/dashboard/history" component={cAuth(BorrowedHistoryPage)} />
    <Route path="/dashboard/userprofile" component={cAuth(UserProfilePage)} />
    <Route path="/dashboard/changepassword" component={cAuth(ChangedPasswordPage)} />
    <Route path="/admin" component={adminAuth(BookStoreContainer)} />
    <Route path="/admin/bookstore" component={adminAuth(BookStoreContainer)} />
    <Route path="/admin/uploadbook" component={adminAuth(UploadBooksContainer)} />
    <Route path="/admin/updatebook" component={adminAuth(UpdateBooksContainer)} />
  </Route>
);
