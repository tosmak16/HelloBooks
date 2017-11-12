import { UPLOAD_AVATAR_FAILURE, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_REQUEST } from '../actions/uploadAvatar';

const initialState = [{
  data: '',
  error: '',
  isUploading: false,
  response: ''
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_AVATAR_REQUEST:
      return [{
        data: action.data,
        error: '',
        isUploading: true,
        response: ''
      }, ...state];
    case UPLOAD_AVATAR_SUCCESS:
      return [{
        response: action.response,
        data: '',
        error: '',
        isUploading: false,
      }, ...state];
    case UPLOAD_AVATAR_FAILURE:
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
