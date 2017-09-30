import expect from 'expect';

import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS
} from '../../actions/changePassword';

import reducer from '../../reducers/passwordChange';
import user from '../../__mock__/user';


const action = {
  error: 'bad request',
  data: user[0],
  response: 'Password change'
};

describe('password change reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isSending: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return password changed state when a request is sent', () => {
    expect(reducer(undefined, {
      type: CHANGE_PASSWORD_REQUEST,
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

  it('should return  password change success state', () => {
    expect(reducer(undefined, {
      type: CHANGE_PASSWORD_SUCCESS,
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

  it('should return  password change error state', () => {
    expect(reducer(undefined, {
      type: CHANGE_PASSWORD_FAILURE,
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

