import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  RETURN_BOOK_FAILURE,
  RETURN_BOOK_REQUEST,
} from '../../actions/returnBook';

import returnedBooks from '../../src/actions/returnBooks';
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
  message: 'you have returned this book already',
};

describe('Test return books Actions', () => {
  it('should not return book if the request is not successful', () => {
    fetchMock.put(`/api/v2/users/${1}/books`,
      { status: 400, body: response });

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
        type: RETURN_BOOK_FAILURE,
        isReturning: false,
        error: action.error
      },
    ];
    return store.dispatch(returnedBooks(payload.bookData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
