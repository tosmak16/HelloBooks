import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  uploadbookError,
  uploadbookRequest,
  uploadbookResponse,
  UPLOAD_BOOK_FAILURE,
  UPLOAD_BOOK_SUCCESS,
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
  status: 201,
  message: 'book uploaded successfully',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'Upload failed'
};


describe('Test upload book Actions', () => {
  it('should create an action to send upload book request', () => {
    const expectedAction = {
      type: UPLOAD_BOOK_REQUEST,
      isUploading: true,
      bookData: action.bookData
    };
    expect(uploadbookRequest(action.bookData)).toEqual(expectedAction);
  });

  it('should create an action to send upload book response', () => {
    const expectedAction = {
      type: UPLOAD_BOOK_SUCCESS,
      isUploading: false,
      response: action.response
    };
    expect(uploadbookResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send upload book error', () => {
    const expectedAction = {
      type: UPLOAD_BOOK_FAILURE,
      isUploading: false,
      error: action.error
    };
    expect(uploadbookError(action.error)).toEqual(expectedAction);
  });

  it('should upload books if the request is successful', () => {
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
        type: UPLOAD_BOOK_SUCCESS,
        isUploading: false,
        response: action.response
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
