import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  UPDATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
} from '../../actions/updateBooks';

import { updateBook } from '../../src/actions/updateBooks';
import localStorageMock from '../../__mock__/localStorage';

import book from '../../__mock__/book';


window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const response = {
  status: 400,
  message: 'update failed',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'update failed'
};


describe('Test update book Actions', () => {
  it('should not update books if the request is not successful', () => {
    fetchMock.put(`http://localhost:8000/api/v2/books/${action.bookData.bookId}`,
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
        type: UPDATE_BOOK_FAILURE,
        isUpdating: false,
        error: action.error
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
