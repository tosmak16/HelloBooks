import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  resetPasswordError, RESET_PASSWORD_FAILURE,
  resetPasswordRequest, RESET_PASSWORD_REQUEST,
  resetPasswordResponse, RESET_PASSWORD_SUCCESS
} from '../../actions/resetPassword';

import { resetUserPassword } from '../../src/actions/resetUserPassword';
import user from '../../__mock__/user';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'password reset successfully',
  data: 'tosmak16@gmail.com',
  error: 'Bad request'
};

const response = {
  message: 'password reset successfully',
  result: user[0]
};

describe('Test Reset paswword Actions', () => {
  it('should create an action to send resetPassword request', () => {
    const expectedAction = {
      type: RESET_PASSWORD_REQUEST,
      isSending: true,
      userData: action.userData,
    };
    expect(resetPasswordRequest(action.userData)).toEqual(expectedAction);
  });

  it('should create an action to send resetPassword response', () => {
    const expectedAction = {
      type: RESET_PASSWORD_SUCCESS,
      isSending: false,
      response: action.response
    };
    expect(resetPasswordResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send resetPassword error', () => {
    const expectedAction = {
      type: RESET_PASSWORD_FAILURE,
      isSending: false,
      error: action.error
    };
    expect(resetPasswordError(action.error)).toEqual(expectedAction);
  });

  it('should reset password if email is valid', () => {
    fetchMock.putOnce(`/api/v2/users/resetPassword`,
      { status: 200, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: RESET_PASSWORD_REQUEST,
        isSending: true,
        data: action.data,
      },
      {
        type: RESET_PASSWORD_SUCCESS,
        isSending: false,
        response: action.response
      },
    ];
    store.dispatch(resetUserPassword(action.data, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      }).catch()
  });

  it('should not reset password if email deos not exist', () => {
    fetchMock.putOnce(`/api/v2/users/resetPassword`,
      { status: 400, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: RESET_PASSWORD_REQUEST,
        isSending: true,
        data: action.data,
      },
      {
        type: RESET_PASSWORD_FAILURE,
        isSending: false,
        error: action.error
      },
    ];
    store.dispatch(resetUserPassword(action.data))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      }).catch()
  });


  it('should not reset password if email is not valid', () => {
    action.data = '';
    fetchMock.put(`/api/v2/users/resetPassword`,
      { status: 400, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: RESET_PASSWORD_FAILURE,
        isSending: false,
        error: 'valid email address is required'
      },
    ];
    store.dispatch(resetUserPassword(action.data, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      }).catch()
  });


});
