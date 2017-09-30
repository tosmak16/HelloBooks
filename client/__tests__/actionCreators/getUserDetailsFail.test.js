import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_REQUEST,
} from '../../actions/getUserDetails';

import getUserDetails from '../../src/actions/getUserDetails';
import user from '../../__mock__/user';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'user details fetched successfully',
  userData: user[0],
  error: 'Bad request'
};

const response = {
  status: 400,
  message: 'Bad request',

};

describe('Test get user Actions', () => {
  it('should not return user details resources if the request is successful', () => {
    fetchMock.get(`http://localhost:8000/api/v2/users/${1}`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: GET_USER_DETAILS_REQUEST,
        isFetching: true,
      },
      {
        type: GET_USER_DETAILS_FAILURE,
        isFetching: false,
        error: action.error
      },
    ];
    return store.dispatch(getUserDetails(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
