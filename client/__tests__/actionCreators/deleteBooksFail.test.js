import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  deletebookError,
  deletebookRequest,
  deletebookResponse,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST
} from '../../actions/deleteBooks';

import { deleteBook } from '../../src/actions/deleteBooks';
import localStorageMock from '../../__mock__/localStorage';

import book from '../../__mock__/book';


window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const response = {
  status: 400,
  message: 'delete book failed',
};

const action = {
  response: response.message,
  bookData: book[0].bookId,
  error: 'delete book failed'
};


describe('Test delete book Actions', () => {
  it('should not delete books if the request is not successful', () => {
    fetchMock.delete(`http://localhost:8000/api/v2/books/${action.bookData}`,
      { body: response, status: 400 });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: DELETE_BOOK_REQUEST,
        isDeleting: true,
        bookData: action.bookData
      },
      {
        type: DELETE_BOOK_FAILURE,
        isDeleting: false,
        error: action.error
      },
    ];
    return store.dispatch(deleteBook(action.bookData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
