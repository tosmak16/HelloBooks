import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
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
  userData: { oldPassword: '123456', newPassword: '1234565', confirmPassword: '1234565' },
};

const response = {
  message: 'Bad request',
};

describe('Test change paswword Actions', () => {
  it('should not change password if the request is not successful', () => {
    fetchMock.put(`/api/v2/users/${1}/password`,
      { status: 400, body: response });

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
        type: CHANGE_PASSWORD_FAILURE,
        isSending: false,
        error: response.message
      },
    ];
    return store.dispatch(changePassword(action.userData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });

  it('should not change password if oldpassword is not inputed', () => {
    action.userData.oldPassword = '';
    response.message = 'current password is required'
    fetchMock.put(`/api/v2/users/${1}/password`,
      { status: 400, body: response });

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
        type: CHANGE_PASSWORD_FAILURE,
        isSending: false,
        error: response.message
      },
    ];
    return store.dispatch(changePassword(action.userData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });

  it('should not change password if new password is not inputed', () => {
    action.userData.oldPassword = '123456';
    action.userData.newPassword = '';
    response.message = 'new password is required'
    fetchMock.put(`/api/v2/users/${1}/password`,
      { status: 400, body: response });

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
        type: CHANGE_PASSWORD_FAILURE,
        isSending: false,
        error: response.message
      },
    ];
    return store.dispatch(changePassword(action.userData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });

  it('should not change password if new and old password are the same', () => {
    action.userData.oldPassword = '123456';
    action.userData.newPassword = '123456';
    response.message = 'Oh! sorry you can not use the same password'
    fetchMock.put(`/api/v2/users/${1}/password`,
      { status: 400, body: response });

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
        type: CHANGE_PASSWORD_FAILURE,
        isSending: false,
        error: response.message
      },
    ];
    return store.dispatch(changePassword(action.userData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
