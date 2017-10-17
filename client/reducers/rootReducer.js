import { combineReducers } from 'redux';

import popMessages from './popMessages';
import auth from './auth';
import reg from './reg';
import log from './log';
import books from './books';
import getFilteredBooks from '../reducers/getFilteredBooks';
import category from './category';
import selectedbook from './selectedbook';
import counter from './counter';
import borrowBooks from './borrowBooks';
import displayMessages from './displayMessages';
import uploadBooks from './uploadBooks';
import uploadImages from './uploadImages';
import deleteBooks from './deleteBooks';
import refreshPage from './refreshPage';
import updateBooks from './updateBooks';
import getborrowedBooks from './getborrowedBooks';
import getunreturnedBooks from './getunreturnedBooks';
import returnBooks from './returnBooks';
import UserDetails from './UserDetails';
import updateUser from './updateUser';
import passwordChange from './passwordChange';
import userProfileImage from './userProfileImage';
import bookFileUpload from './bookFileUpload';

export default combineReducers({
  popMessages,
  auth,
  reg,
  log,
  books,
  getFilteredBooks,
  category,
  selectedbook,
  counter,
  borrowBooks,
  displayMessages,
  uploadBooks,
  uploadImages,
  deleteBooks,
  refreshPage,
  updateBooks,
  getborrowedBooks,
  getunreturnedBooks,
  returnBooks,
  UserDetails,
  updateUser,
  passwordChange,
  userProfileImage,
  bookFileUpload
});
