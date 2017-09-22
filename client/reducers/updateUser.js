import { UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, UPDATE_USER_REQUEST } from '../actions/updateUser';

const initialState = {
  isUpdating: false,
  data: '',
  error: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        isUpdating: true,
        data: action.data,
        error: '',
      };
    case UPDATE_USER_SUCCESS:
      return {
        isUpdating: false,
        data: action.response,
        error: '',
      };
    case UPDATE_USER_FAILURE:
      return {
        isUpdating: false,
        data: '',
        error: action.error,
      };
    default:
      return state;
  }
};