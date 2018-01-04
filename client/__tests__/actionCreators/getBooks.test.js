import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  getBooksError,
  getBooksReponse,
  getBooksRequest,
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS
} from '../../actions/getBooks';

import getBooks from '../../src/actions/getBooks';
import books from '../../__mock__/book';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = {
  status: 200,
  message: 'Book fetch successfully',
  books
};

describe('Test getBooks Actions', () => {
  it('should create an action to send getBooks request', () => {
    const expectedAction = {
      type: GET_ALL_BOOKS_REQUEST,
      isFetching: true,
      isFetched: false,
    };
    expect(getBooksRequest()).toEqual(expectedAction);
  });

  it('should create getBooks action response', () => {
    const expectedAction = {
      type: GET_ALL_BOOKS_SUCCESS,
      isFetching: false,
      isFetched: true,
      data: []
    };
    expect(getBooksReponse([])).toEqual(expectedAction);
  });

  it('should create an action to receive getBooks error if error', () => {
    const expectedAction = {
      type: GET_ALL_BOOKS_FAILURE,
      isFetching: false,
      isFetched: false,
      error: []
    };
    expect(getBooksError([])).toEqual(expectedAction);
  });

  it('should return books resources if the request is successful', () => {
    fetchMock.get('/api/v2/books',
      JSON.stringify(response));

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
        type: GET_ALL_BOOKS_SUCCESS,
        isFetching: false,
        isFetched: true,
        data: response.books
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

