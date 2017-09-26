import { UPLOAD_BOOK_FAILURE, UPLOAD_BOOK_SUCCESS, UPLOAD_BOOK_REQUEST } from '../actions/uploadBooks';

const initialState = {
  data: '',
  error: '',
  isUploading: false,
  response: ''
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPLOAD_BOOK_REQUEST:
      return [{
        data: action.bookData,
        error: '',
        isUploading: true,
        response: ''
      }, ...state];
    case UPLOAD_BOOK_SUCCESS:
      return [{
        response: action.response,
        data: '',
        error: '',
        isUploading: false,
      }, ...state];
    case UPLOAD_BOOK_FAILURE:
      return [{
        error: action.error,
        data: '',
        isUploading: false,
        response: ''

      }, ...state];
    default:
      return state;
  }
};
