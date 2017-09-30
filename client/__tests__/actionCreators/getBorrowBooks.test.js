import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  getborrowedbooksError,
  getborrowedbooksReponse,
  getborrowedbooksRequest,
  GET_BORROWED_BOOKS_FAILURE,
  GET_BORROWED_BOOKS_REQUEST,
  GET_BORROWED_BOOKS_SUCCESS
} from '../../actions/getborrowedBooks';

import getborrowedBooks from '../../src/actions/getborrowedBooks';
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
  result: books.slice(0, 3)
};

describe('Test getBorrowedBooks Actions', () => {
  it('should create an action to send getborrowedbooks request', () => {
    const expectedAction = {
      type: GET_BORROWED_BOOKS_REQUEST,
      isFetching: true,
      isFetched: false,
    };
    expect(getborrowedbooksRequest()).toEqual(expectedAction);
  });

  it('should create an action to return getborrowedbooks response', () => {
    const expectedAction = {
      type: GET_BORROWED_BOOKS_SUCCESS,
      isFetching: false,
      isFetched: true,
      data: []
    };
    expect(getborrowedbooksReponse([])).toEqual(expectedAction);
  });

  it('should create an action that returns getborrowedbooks failure', () => {
    const expectedAction = {
      type: GET_BORROWED_BOOKS_FAILURE,
      isFetching: false,
      isFetched: false,
      error: []
    };
    expect(getborrowedbooksError([])).toEqual(expectedAction);
  });

  it('should return borrowed books resources if the request is successful', () => {
    fetchMock.get(`http://localhost:8000/api/v2/user/${1}/books`,
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
        data: response.result
      },
    ];
    return store.dispatch(getborrowedBooks(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

