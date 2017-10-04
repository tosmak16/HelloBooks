import { UPDATE_BOOK_FAILURE, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_REQUEST } from '../actions/updateBooks';

const initialState = [{
  data: '',
  error: '',
  isUpdating: false,
  response: ''
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOK_REQUEST:
      return [{
        data: action.bookData,
        error: '',
        isUpdating: true,
        response: ''
      }, ...state];
    case UPDATE_BOOK_SUCCESS:
      return [{
        response: action.response,
        data: '',
        error: '',
        isUpdating: false,
      }, ...state];
    case UPDATE_BOOK_FAILURE:
      return [{
        error: action.error,
        data: '',
        isUpdating: false,
        response: ''

      }, ...state];
    default:
      return state;
  }
};
