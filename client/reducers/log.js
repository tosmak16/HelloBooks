import isEmpty from 'lodash/isEmpty';

import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from '../actions/loginActions';

const initialState = [{
  isAuthenticated: false,
  data: {},
  error: '',
  isFetching: false,
  response: {}
}];
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return [{
        isAuthenticated: false,
        data: action.userData,
        error: '',
        isFetching: true,
        response: {}
      }, ...state];
    case LOGIN_SUCCESS:
      return [{
        isAuthenticated: !isEmpty(action.response),
        response: action.response,
        data: {},
        error: '',
        isFetching: false,
      }, ...state];
    case LOGIN_FAILURE:
      return [{
        isAuthenticated: isEmpty(action.error),
        error: action.error,
        data: {},
        isFetching: false,
        response: {}
      }, ...state];
    default:
      return state;
  }
};
