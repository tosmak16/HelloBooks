import { UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_REQUEST } from '../actions/UploadImages';

const initialState = [{
  data: '',
  error: '',
  isUploading: false,
  response: ''
}];
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return [{
        data: action.imageData,
        error: '',
        isUploading: true,
        response: ''
      }, ...state];
    case UPLOAD_IMAGE_SUCCESS:
      return [{
        response: action.response,
        data: '',
        error: '',
        isUploading: false,
      }, ...state];
    case UPLOAD_IMAGE_FAILURE:
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
