import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  getunreturnedbooksError, getunreturnedbooksReponse,
  getunreturnedbooksRequest, GET_UNRETURNED_BOOKS_FAILURE,
  GET_UNRETURNED_BOOKS_REQUEST, GET_UNRETURNED_BOOKS_SUCCESS
} from '../../actions/getunreturnedBooks';

import getunreturnedBooks from '../../src/actions/getunreturnedBooks';
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
  result: books.slice(0, 3),
  error: 'Books can not be fetched'
};

describe('Test getUnreturnedBooks Actions', () => {
  it('should create an action to send getunreturnedbooks request', () => {
    const expectedAction = {
      type: GET_UNRETURNED_BOOKS_REQUEST,
      isFetching: true,
      isFetched: false,
    };
    expect(getunreturnedbooksRequest()).toEqual(expectedAction);
  });

  it('should create an action to send getunreturnedbooks successful', () => {
    const expectedAction = {
      type: GET_UNRETURNED_BOOKS_SUCCESS,
      isFetching: false,
      isFetched: true,
      data: response.result
    };
    expect(getunreturnedbooksReponse(response.result)).toEqual(expectedAction);
  });


  it('should create an action to send getunreturnedbooks failed', () => {
    const expectedAction = {
      type: GET_UNRETURNED_BOOKS_FAILURE,
      isFetching: false,
      isFetched: false,
      error: response.error
    };
    expect(getunreturnedbooksError(response.error)).toEqual(expectedAction);
  });

  it('should return borrowed books resources if the request is successful', () => {
    fetchMock.get(`http://localhost:8000/api/v2/users/${1}/books?returned=false`,
      JSON.stringify(response));

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
        type: GET_UNRETURNED_BOOKS_SUCCESS,
        isFetching: false,
        isFetched: true,
        data: response.result
      },
    ];
    return store.dispatch(getunreturnedBooks(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
