import isEmpty from 'lodash/isEmpty';

import { BORROW_BOOK_FAILURE, BORROW_BOOK_SUCCESS, BORROW_BOOK_REQUEST } from '../actions/borrowBook';

const initialState = [{
  isStored: false,
  data: {},
  error: '',
  isSending: false,
  response: ''
}];
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BORROW_BOOK_REQUEST:
      return [{
        isStored: false,
        data: action.userData,
        error: '',
        isSending: true,
        response: ''
      }, ...state];
    case BORROW_BOOK_SUCCESS:
      return [{
        isStored: !isEmpty(action.response),
        response: action.response,
        data: {},
        error: '',
        isSending: false,
      }, ...state];
    case BORROW_BOOK_FAILURE:
      return [{
        isStored: isEmpty(action.error),
        error: action.error,
        data: {},
        isSending: false,
        response: ''

      }, ...state];
    default:
      return state;
  }
};
