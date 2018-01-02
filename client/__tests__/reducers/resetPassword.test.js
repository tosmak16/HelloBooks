import expect from 'expect';

import {
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from '../../actions/resetPassword';

import reducer from '../../reducers/resetPassword';



const action = {
  error: 'bad request',
  data: { email: 'tosmak16@gmail.com' },
  response: 'password reset'
};

describe('resetPassword reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isSending: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return resetpassowrd request state', () => {
    expect(reducer(undefined, {
      type: RESET_PASSWORD_REQUEST,
      data: action.data
    })).toEqual([
      {
        isSending: true,
        data: action.data,
        error: '',
      },
      {
        isSending: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return resetpassowrd success state', () => {
    expect(reducer(undefined, {
      type: RESET_PASSWORD_SUCCESS,
      response: action.response
    })).toEqual([
      {
        isSending: false,
        data: action.response,
        error: '',
      },
      {
        isSending: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return resetpassowrd failure state', () => {
    expect(reducer(undefined, {
      type: RESET_PASSWORD_FAILURE,
      error: action.error
    })).toEqual([
      {
        isSending: false,
        data: '',
        error: action.error,
      },
      {
        isSending: false,
        data: '',
        error: '',
      }
    ]);
  });
});
