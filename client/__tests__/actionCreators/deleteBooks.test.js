import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  deleteBookError,
  deleteBookRequest,
  deleteBookResponse,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST
} from '../../actions/deleteBook';

import { deleteBook } from '../../src/actions/deleteBook';
import localStorageMock from '../../__mock__/localStorage';

import book from '../../__mock__/book';


window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const response = {
  status: 204,
  message: 'book has been deleted',
};

const action = {
  response: response.message,
  bookData: book[0].bookId,
  error: 'delete book failed'
};


describe('Test delete book Actions', () => {
  it('should create an action to send delete book request', () => {
    const expectedAction = {
      type: DELETE_BOOK_REQUEST,
      isDeleting: true,
      bookData: action.bookData
    };
    expect(deleteBookRequest(action.bookData)).toEqual(expectedAction);
  });

  it('should create an action to send delete book response', () => {
    const expectedAction = {
      type: DELETE_BOOK_SUCCESS,
      isDeleting: false,
      response: action.response
    };
    expect(deleteBookResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send delete book error', () => {
    const expectedAction = {
      type: DELETE_BOOK_FAILURE,
      isDeleting: false,
      error: action.error
    };
    expect(deleteBookError(action.error)).toEqual(expectedAction);
  });


  it('should delete books if the request is successful', () => {
    fetchMock.delete(`/api/v2/books/${action.bookData}`,
      { body: response, status: 204 });

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
        type: DELETE_BOOK_SUCCESS,
        isDeleting: false,
        response: action.response
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
