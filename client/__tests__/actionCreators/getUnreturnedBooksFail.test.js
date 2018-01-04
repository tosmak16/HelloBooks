import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  GET_UNRETURNED_BOOKS_FAILURE,
  GET_UNRETURNED_BOOKS_REQUEST,
} from '../../actions/getUnreturnedBook';

import getUnreturnedBook from '../../src/actions/getUnreturnedBook';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = {
  message: 'Books can not be fetched',
};

describe('Test getUnreturnedBook Actions failed', () => {
  it('should not return unreturn books resources if the request is not successful', () => {
    fetchMock.get(`/api/v2/users/${1}/books?returned=false`,
      { status: 403, body: response });
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: GET_UNRETURNED_BOOKS_REQUEST,
        isFetching: true,
        isFetched: false,
      },
      {
        type: GET_UNRETURNED_BOOKS_FAILURE,
        isFetching: false,
        isFetched: false,
        error: response.message
      },
    ];
    return store.dispatch(getUnreturnedBook(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
