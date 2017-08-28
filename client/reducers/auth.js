import isEmpty from 'lodash/isEmpty';

import { SET_USER } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};

