import { GET_USER_DETAILS_FAILURE, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_REQUEST } from '../actions/getUserDetails';

const initialState = {
  isFetching: false,
  data: '',
  error: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return {
        isFetching: true,
        data: '',
        error: '',
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        isFetching: false,
        data: action.data,
        error: '',
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        isFetching: false,
        data: '',
        error: action.error,
      };
    default:
      return state;
  }
};
