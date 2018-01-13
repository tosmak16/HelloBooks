import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  updateUserError,
  updateUserRequest,
  updateUserResponse,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../../actions/updateUser';

import updateUser from '../../src/actions/updateUser';
import localStorageMock from '../../__mock__/localStorage';

import user from '../../__mock__/user';


window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const response = {
  status: 200,
  message: 'user updated not success',
};

const action = {
  response: response.message,
  userData: user[0],
  error: 'update failed'
};


describe('Test update user Actions', () => {
  it('should not update user if no valid user details', () => {
    fetchMock.put(`/api/v2/users/${1}`,
      { body: response, status: 400 });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: UPDATE_USER_REQUEST,
        isUpdating: true,
        data: action.userData
      },
      {
        type: UPDATE_USER_FAILURE,
        isUpdating: false,
        error: action.response
      },
    ];
    return store.dispatch(updateUser(action.userData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
