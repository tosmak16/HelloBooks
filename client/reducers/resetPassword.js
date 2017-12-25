import {
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from '../actions/resetPassword';

const initialState = [{
  isSending: false,
  data: '',
  error: '',
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return [{
        isSending: true,
        data: action.data,
        error: '',
      }, ...state];
    case RESET_PASSWORD_SUCCESS:
      return [{
        isSending: false,
        data: action.response,
        error: '',
      }, ...state];
    case RESET_PASSWORD_FAILURE:
      return [{
        isSending: false,
        data: '',
        error: action.error,
      }, ...state];
    default:
      return state;
  }
};
