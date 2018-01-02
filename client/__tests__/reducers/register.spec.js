import expect from 'expect';
import isEmpty from 'lodash/isEmpty';

import { SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from '../../actions/signupActions';
import reducer from '../../reducers/register';

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isRegistered: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });

  it('should return  sign up request state', () => {
    expect(reducer(undefined, {
      type: SIGNUP_REQUEST,
      userData: { username: 'tosmak', password: '12345' }
    })).toEqual([
      {
        isRegistered: false,
        data: { username: 'tosmak', password: '12345' },
        error: '',
        isFetching: true,
        response: {}
      },
      {
        isRegistered: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });

  it('should return  signup successful state', () => {
    expect(reducer(undefined, {
      type: SIGNUP_SUCCESS,
      response: 'Registration successful'
    })).toEqual([

      {
        isRegistered: !isEmpty('Registration successful'),
        response: 'Registration successful',
        data: {},
        error: '',
        isFetching: false,
      },
      {
        isRegistered: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });

  it('should return  signup failed state', () => {
    expect(reducer(undefined, {
      type: SIGNUP_FAILURE,
      error: 'Bad request'
    })).toEqual([

      {
        isRegistered: isEmpty('Bad request'),
        error: 'Bad request',
        data: {},
        isFetching: false,
        response: {}

      },
      {
        isRegistered: false,
        data: {},
        error: '',
        isFetching: false,
        response: {}
      }
    ]);
  });
});
