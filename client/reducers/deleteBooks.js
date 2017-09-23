import { DELETE_BOOK_FAILURE, DELETE_BOOK_SUCCESS, DELETE_BOOK_REQUEST } from '../actions/deleteBooks';

const initialState = {
  data: '',
  error: '',
  isDeleting: false,
  response: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_BOOK_REQUEST:
      return [...state, {
        data: action.bookData,
        error: '',
        isDeleting: true,
        response: ''
      }];
    case DELETE_BOOK_SUCCESS:
      return [...state, {
        response: action.response,
        data: '',
        error: '',
        isDeleting: false,
      }];
    case DELETE_BOOK_FAILURE:
      return [...state, {
        error: action.error,
        data: '',
        isDeleting: false,
        response: ''

      }];
    default:
      return state;
  }
};
