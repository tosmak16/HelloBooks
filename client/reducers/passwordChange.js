import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST } from '../actions/changePassword';

const initialState = {
  isSending: false,
  data: '',
  error: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return [...state, {
        isSending: true,
        data: action.data,
        error: '',
      }];
    case CHANGE_PASSWORD_SUCCESS:
      return [...state, {
        isSending: false,
        data: action.response,
        error: '',
      }];
    case CHANGE_PASSWORD_FAILURE:
      return [...state, {
        isSending: false,
        data: '',
        error: action.error,
      }];
    default:
      return state;
  }
};
