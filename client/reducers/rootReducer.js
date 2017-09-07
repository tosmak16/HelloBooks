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
});
