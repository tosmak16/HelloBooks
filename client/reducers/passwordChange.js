import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST } from '../actions/changePassword';

const initialState = [{
  isSending: false,
  data: '',
  error: '',
}];
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return [{
        isSending: true,
        data: action.data,
        error: '',
      }, ...state];
    case CHANGE_PASSWORD_SUCCESS:
      return [{
        isSending: false,
        data: action.response,
        error: '',
      }, ...state];
    case CHANGE_PASSWORD_FAILURE:
      return [{
        isSending: false,
        data: '',
        error: action.error,
      }, ...state];
    default:
      return state;
  }
};
