import { DELETE_BOOK_FAILURE, DELETE_BOOK_SUCCESS, DELETE_BOOK_REQUEST } from '../actions/deleteBooks';

const initialState = [{
  data: '',
  error: '',
  isDeleting: false,
  response: ''
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_BOOK_REQUEST:
      return [{
        data: action.bookData,
        error: '',
        isDeleting: true,
        response: ''
      }, ...state];
    case DELETE_BOOK_SUCCESS:
      return [{
        response: action.response,
        data: '',
        error: '',
        isDeleting: false,
      }, ...state];
    case DELETE_BOOK_FAILURE:
      return [{
        error: action.error,
        data: '',
        isDeleting: false,
        response: ''

      }, ...state];
    default:
      return state;
  }
};
