import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import auth from './auth';
import reg from './reg';

export default combineReducers({
  flashMessages,
  auth,
  reg
});
