import { RETURN_BOOK_FAILURE, RETURN_BOOK_SUCCESS, RETURN_BOOK_REQUEST } from '../actions/returnBook';

const initialState = {
  data: '',
  error: '',
  isReturning: false,
  response: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RETURN_BOOK_REQUEST:
      return {
        data: action.bookData,
        error: '',
        isReturning: true,
        response: ''
      };
    case RETURN_BOOK_SUCCESS:
      return {
        response: action.response,
        data: '',
        error: '',
        isReturning: false,
      };
    case RETURN_BOOK_FAILURE:
      return {
        error: action.error,
        data: '',
        isReturning: false,
        response: ''

      };
    default:
      return state;
  }
};
