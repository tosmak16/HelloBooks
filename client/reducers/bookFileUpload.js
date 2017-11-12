import { UPLOAD_FILE_FAILURE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_REQUEST } from '../actions/uploadBookFile';

const initialState = [{
  data: '',
  error: '',
  isUploading: false,
  response: ''
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return [{
        data: action.fileData,
        error: '',
        isUploading: true,
        response: ''
      }, ...state];
    case UPLOAD_FILE_SUCCESS:
      return [{
        response: action.response,
        data: '',
        error: '',
        isUploading: false,
      }, ...state];
    case UPLOAD_FILE_FAILURE:
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
