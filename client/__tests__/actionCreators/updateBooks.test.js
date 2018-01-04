import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  updateBookError,
  updateBookRequest,
  updateBookResponse,
  UPDATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS
} from '../../actions/updateBook';

import { updateBook } from '../../src/actions/updateBook';
import localStorageMock from '../../__mock__/localStorage';

import book from '../../__mock__/book';


window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const response = {
  status: 200,
  message: 'book updated successfully',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'update failed'
};


describe('Test update book Actions', () => {
  it('should create an action to send update book request', () => {
    const expectedAction = {
      type: UPDATE_BOOK_REQUEST,
      isUpdating: true,
      bookData: action.bookData
    };
    expect(updateBookRequest(action.bookData)).toEqual(expectedAction);
  });

  it('should create an action to send update book response', () => {
    const expectedAction = {
      type: UPDATE_BOOK_SUCCESS,
      isUpdating: false,
      response: action.response
    };
    expect(updateBookResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send update book error', () => {
    const expectedAction = {
      type: UPDATE_BOOK_FAILURE,
      isUpdating: false,
      error: action.error
    };
    expect(updateBookError(action.error)).toEqual(expectedAction);
  });

  it('should update books if the request is successful', () => {
    fetchMock.put(`/api/v2/books/${action.bookData.bookId}`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: UPDATE_BOOK_REQUEST,
        isUpdating: true,
        bookData: action.bookData
      },
      {
        type: UPDATE_BOOK_SUCCESS,
        isUpdating: false,
        response: action.response
      },
    ];
    return store.dispatch(updateBook(action.bookData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });


});
