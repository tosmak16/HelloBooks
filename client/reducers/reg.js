import isEmpty from 'lodash/isEmpty';

import { SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from '../actions/signupActions';

const initialState = [{
  isRegistered: false,
  data: {},
  error: '',
  isFetching: false,
  response: {}
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return [{
        isRegistered: false,
        data: action.userData,
        error: '',
        isFetching: true,
        response: {}
      }, ...state];
    case SIGNUP_SUCCESS:
      return [{
        isRegistered: !isEmpty(action.response),
        response: action.response,
        data: {},
        error: '',
        isFetching: false,
      }, ...state];
    case SIGNUP_FAILURE:
      return [{
        isRegistered: isEmpty(action.error),
        error: action.error,
        data: {},
        isFetching: false,
        response: {}

      }, ...state];
    default:
      return state;
  }
};
