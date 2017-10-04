import { UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, UPDATE_USER_REQUEST } from '../actions/updateUser';

const initialState = [{
  isUpdating: false,
  data: '',
  error: '',
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return [{
        isUpdating: true,
        data: action.data,
        error: '',
      }, ...state];
    case UPDATE_USER_SUCCESS:
      return [{
        isUpdating: false,
        data: action.response,
        error: '',
      }, ...state];
    case UPDATE_USER_FAILURE:
      return [{
        isUpdating: false,
        data: '',
        error: action.error,
      }, ...state];
    default:
      return state;
  }
};
