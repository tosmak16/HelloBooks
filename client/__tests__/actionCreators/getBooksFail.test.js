import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
} from '../../actions/getBooks';

import getBooks from '../../src/actions/getBooks';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');
window.localStorage.setItem('jwtToken', token);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = {
  message: 'bad request',
};

describe('Test getBooks Actions failed', () => {
  it('should not return books resources if the request is not successful', () => {
    fetchMock.get('/api/v2/books',
      { status: 400, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: GET_ALL_BOOKS_REQUEST,
        isFetching: true,
        isFetched: false,
      },
      {
        type: GET_ALL_BOOKS_FAILURE,
        isFetching: false,
        isFetched: false,
        error: response.message
      },
    ];
    return store.dispatch(getBooks(true))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

