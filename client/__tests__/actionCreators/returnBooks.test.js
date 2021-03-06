import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  returnBookError, returnBookRequest,
  returnBookResponse, RETURN_BOOK_FAILURE,
  RETURN_BOOK_REQUEST, RETURN_BOOK_SUCCESS
} from '../../actions/returnBook';

import returnBook from '../../src/actions/returnBook';
import books from '../../__mock__/book';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'books returned successfully',
  bookData: books[0],
  error: 'you have returned this book already'
};

const payload = {
  bookData: books[0]
};

const response = {
  message: 'books returned successfully',
};

describe('Test return books Actions', () => {
  it('should create an action to send returnBook request', () => {
    const expectedAction = {
      type: RETURN_BOOK_REQUEST,
      isReturning: true,
      bookData: action.bookData
    };
    expect(returnBookRequest(action.bookData)).toEqual(expectedAction);
  });

  it('should create an action to send returnBook response', () => {
    const expectedAction = {
      type: RETURN_BOOK_SUCCESS,
      isReturning: false,
      response: action.response
    };
    expect(returnBookResponse(action.response)).toEqual(expectedAction);
  });
  it('should create an action to send returnBook error', () => {
    const expectedAction = {
      type: RETURN_BOOK_FAILURE,
      isReturning: false,
      error: action.error
    };
    expect(returnBookError(action.error)).toEqual(expectedAction);
  });

  it('should return book if the request is successful', () => {
    fetchMock.put(`/api/v2/users/${1}/books`,
      { status: 200, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: RETURN_BOOK_REQUEST,
        isReturning: true,
        bookData: action.bookData
      },
      {
        type: RETURN_BOOK_SUCCESS,
        isReturning: false,
        response: action.response
      },
    ];
    return store.dispatch(returnBook(payload.bookData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
