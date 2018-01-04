import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  getUnreturnedBookError, getUnreturnedBookReponse,
  getUnreturnedBookRequest, GET_UNRETURNED_BOOKS_FAILURE,
  GET_UNRETURNED_BOOKS_REQUEST, GET_UNRETURNED_BOOKS_SUCCESS
} from '../../actions/getUnreturnedBook';

import getUnreturnedBook from '../../src/actions/getUnreturnedBook';
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
  unreturnedBook: books.slice(0, 3),
  error: 'Books can not be fetched'
};

describe('Test getUnreturnedBook Actions', () => {
  it('should create an action to send getUnreturnedBook request', () => {
    const expectedAction = {
      type: GET_UNRETURNED_BOOKS_REQUEST,
      isFetching: true,
      isFetched: false,
    };
    expect(getUnreturnedBookRequest()).toEqual(expectedAction);
  });

  it('should create an action to send getUnreturnedBook successful', () => {
    const expectedAction = {
      type: GET_UNRETURNED_BOOKS_SUCCESS,
      isFetching: false,
      isFetched: true,
      data: response.result
    };
    expect(getUnreturnedBookReponse(response.result)).toEqual(expectedAction);
  });


  it('should create an action to send getUnreturnedBook failed', () => {
    const expectedAction = {
      type: GET_UNRETURNED_BOOKS_FAILURE,
      isFetching: false,
      isFetched: false,
      error: response.error
    };
    expect(getUnreturnedBookError(response.error)).toEqual(expectedAction);
  });

  it('should return borrowed books resources if the request is successful', () => {
    fetchMock.get(`/api/v2/users/${1}/books?returned=false`,
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
        data: response.unreturnedBook
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
