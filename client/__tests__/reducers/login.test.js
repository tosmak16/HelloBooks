import expect from 'expect';
import isEmpty from 'lodash/isEmpty';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from '../../actions/loginActions';

import reducer from '../../reducers/login';

const action = {
  userData: { username: 'tosmak', password: '12345' },
  response: { message: 'logged in successfully' },
  error: { message: 'username and password is invalid' }
};

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isAuthenticated: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });

  it('should return  sign in request state', () => {
    expect(reducer(undefined, {
      type: LOGIN_REQUEST,
      userData: { username: 'tosmak', password: '12345' }
    })).toEqual([
      {
        isAuthenticated: false,
        data: action.userData,
        error: '',
        isFetching: true,
        response: {}
      },
      {
        isAuthenticated: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });

  it('should return  signin success state', () => {
    expect(reducer(undefined, {
      type: LOGIN_SUCCESS,
      response: { message: 'logged in successfully' }
    })).toEqual([
      {
        isAuthenticated: !isEmpty({ message: 'logged in successfully' }),
        response: action.response,
        data: {},
        error: '',
        isFetching: false,
      },
      {
        isAuthenticated: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });

  it('should return  signin failed state', () => {
    expect(reducer(undefined, {
      type: LOGIN_FAILURE,
      error: { message: 'username and password is invalid' }
    })).toEqual([
      {
        isAuthenticated: isEmpty({ message: 'username and password is invalid' }),
        error: action.error,
        data: {},
        isFetching: false,
        response: {}
      },
      {
        isAuthenticated: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });
});
