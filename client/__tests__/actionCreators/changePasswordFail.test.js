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
  response: 'password changed successfully',
  userData: user[0],
  error: 'Bad request'
};

const response = {
  status: 400,
  message: 'Bad request',
  result: user[0]
};

describe('Test change paswword Actions', () => {
  it('should not change password if the request is not successful', () => {
    fetchMock.put(`/api/v2/users/${1}/password`,
      JSON.stringify(response));

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
        error: action.error
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
