import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  UPLOAD_BOOK_FAILURE,
  UPLOAD_BOOK_REQUEST
} from '../../actions/uploadBooks';

import { uploadBook } from '../../src/actions/uploadBooks';
import localStorageMock from '../../__mock__/localStorage';

import book from '../../__mock__/book';


window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const response = {
  status: 400,
  message: 'Upload failed',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'Upload failed'
};


describe('Test upload book Actions', () => {
  it('should not upload book if the request is not successful', () => {
    fetchMock.post('/api/v2/books',
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: UPLOAD_BOOK_REQUEST,
        isUploading: true,
        bookData: action.bookData
      },
      {
        type: UPLOAD_BOOK_FAILURE,
        isUploading: false,
        error: action.error
      },
    ];
    return store.dispatch(uploadBook(action.bookData, token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
