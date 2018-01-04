import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  getBorrowedBookError,
  getBorrowedBookReponse,
  getBorrowedBookRequest,
  GET_BORROWED_BOOKS_FAILURE,
  GET_BORROWED_BOOKS_REQUEST,
  GET_BORROWED_BOOKS_SUCCESS
} from '../../actions/getBorrowedBook';

import getBorrowedBook from '../../src/actions/getBorrowedBook';
import books from '../../__mock__/book';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = {
  status: 200,
  message: 'Borrowed books fetch successfully',
  borrowBooks: books.slice(0, 3)
};

describe('Test getBorrowedBook Actions', () => {
  it('should create an action to send getBorrowedBook request', () => {
    const expectedAction = {
      type: GET_BORROWED_BOOKS_REQUEST,
      isFetching: true,
      isFetched: false,
    };
    expect(getBorrowedBookRequest()).toEqual(expectedAction);
  });

  it('should create an action to return getBorrowedBook response', () => {
    const expectedAction = {
      type: GET_BORROWED_BOOKS_SUCCESS,
      isFetching: false,
      isFetched: true,
      data: []
    };
    expect(getBorrowedBookReponse([])).toEqual(expectedAction);
  });

  it('should create an action that returns getBorrowedBook failure', () => {
    const expectedAction = {
      type: GET_BORROWED_BOOKS_FAILURE,
      isFetching: false,
      isFetched: false,
      error: []
    };
    expect(getBorrowedBookError([])).toEqual(expectedAction);
  });

  it('should return borrowed books resources if the request is successful', () => {
    fetchMock.get(`/api/v2/user/${1}/books`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: GET_BORROWED_BOOKS_REQUEST,
        isFetching: true,
        isFetched: false,
      },
      {
        type: GET_BORROWED_BOOKS_SUCCESS,
        isFetching: false,
        isFetched: true,
        data: response.borrowBooks
      },
    ];
    return store.dispatch(getBorrowedBook(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

