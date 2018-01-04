import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  changePasswordError, CHANGE_PASSWORD_FAILURE,
  changePasswordRequest, CHANGE_PASSWORD_REQUEST,
  changePasswordResponse, CHANGE_PASSWORD_SUCCESS
} from '../../actions/changePassword';

import changePassword from '../../src/actions/changePassword';
import user from '../../__mock__/user';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'password changed successfully',
  userData: { oldPassword: '123456', newPassword: '123456a' },
  error: 'Bad request'
};

const response = {
  message: 'password changed successfully',
  result: user[0]
};

describe('Test change paswword Actions', () => {
  it('should create an action to send changePassword request', () => {
    const expectedAction = {
      type: CHANGE_PASSWORD_REQUEST,
      isSending: true,
      userData: action.userData,
    };
    expect(changePasswordRequest(action.userData)).toEqual(expectedAction);
  });

  it('should create an action to send changePassword response', () => {
    const expectedAction = {
      type: CHANGE_PASSWORD_SUCCESS,
      isSending: false,
      response: action.response
    };
    expect(changePasswordResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send changePassword error', () => {
    const expectedAction = {
      type: CHANGE_PASSWORD_FAILURE,
      isSending: false,
      error: action.error
    };
    expect(changePasswordError(action.error)).toEqual(expectedAction);
  });

  it('should change password if the request is successful', () => {
    fetchMock.put(`/api/v2/users/${1}/password`,
      { status: 200, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: CHANGE_PASSWORD_REQUEST,
        isSending: true,
        userData: action.userData,
      },
      {
        type: CHANGE_PASSWORD_SUCCESS,
        isSending: false,
        response: action.response
      },
    ];
    store.dispatch(changePassword(action.userData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      }).catch()
  });
});
