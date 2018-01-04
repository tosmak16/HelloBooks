import { combineReducers } from 'redux';

import auth from './auth';
import register from './register';
import login from './login';
import books from './books';
import filteredBooks from '../reducers/filteredBooks';
import category from './category';
import selectedBookDetails from './selectedBookDetails';
import borrowBooks from './borrowBooks';
import displayMessages from './displayMessages';
import uploadBooks from './uploadBooks';
import uploadImages from './uploadImages';
import deleteBooks from './deleteBooks';
import refreshPage from './refreshPage';
import updateBooks from './updateBooks';
import borrowedBooksHistory from './borrowedBooksHistory';
import unreturnedBooks from './unreturnedBooks';
import returnBooks from './returnBooks';
import userDetail from './userDetail';
import updateUser from './updateUser';
import passwordChange from './passwordChange';
import userProfileImage from './userProfileImage';
import bookFileUpload from './bookFileUpload';
import resetPassword from './resetPassword';

export default combineReducers({
  auth,
  register,
  login,
  books,
  filteredBooks,
  category,
  selectedBookDetails,
  borrowBooks,
  displayMessages,
  uploadBooks,
  uploadImages,
  deleteBooks,
  refreshPage,
  updateBooks,
  borrowedBooksHistory,
  unreturnedBooks,
  returnBooks,
  userDetail,
  updateUser,
  passwordChange,
  userProfileImage,
  bookFileUpload,
  resetPassword
});
