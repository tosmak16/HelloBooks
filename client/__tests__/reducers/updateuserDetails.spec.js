import expect from 'expect';

import {
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../../actions/updateUser';

import reducer from '../../reducers/updateUser';
import user from '../../__mock__/user';

const response = {
  status: 200,
  message: 'book updated successfully',
};

const action = {
  response: response.message,
  userData: user[0],
  error: 'update failed'
};


describe('update user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isUpdating: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return update user details state when a request is sent', () => {
    expect(reducer(undefined, {
      type: UPDATE_USER_REQUEST,
      data: action.userData
    })).toEqual([
      {
        isUpdating: true,
        data: action.userData,
        error: '',
      },
      {
        isUpdating: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return  update user details success state', () => {
    expect(reducer(undefined, {
      type: UPDATE_USER_SUCCESS,
      response: action.response
    })).toEqual([
      {
        isUpdating: false,
        data: action.response,
        error: '',
      },
      {
        isUpdating: false,
        data: '',
        error: '',
      }
    ]);
  });

  it('should return update user details error state', () => {
    expect(reducer(undefined, {
      type: UPDATE_USER_FAILURE,
      error: action.error
    })).toEqual([
      {
        isUpdating: false,
        data: '',
        error: action.error,
      },
      {
        isUpdating: false,
        data: '',
        error: '',
      }
    ]);
  });
});

