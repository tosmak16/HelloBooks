import { combineReducers } from 'redux';

import popMessages from './popMessages';
import auth from './auth';
import reg from './reg';
import log from './log';
import books from './books';
import getFilteredBooks from '../reducers/getFilteredBooks';

export default combineReducers({
  popMessages,
  auth,
  reg,
  log,
  books,
  getFilteredBooks,
});
