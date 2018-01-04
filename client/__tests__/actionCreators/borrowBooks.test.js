import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  borrowBookError,
  borrowBookRequest,
  borrowBookResponse,
  BORROW_BOOK_FAILURE,
  BORROW_BOOK_REQUEST,
  BORROW_BOOK_SUCCESS,
} from '../../actions/borrowBook';

import borrowBooks from '../../src/actions/borrowBook';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const payload = {
  bookId: 1,
  token,
};

const response = {
  status: 200,
  message: 'Book added to personal archive. happy reading!',
};

describe('Test borrowBooks Actions', () => {
  it('should create an action to send borrow books request', () => {
    const expectedAction = {
      type: BORROW_BOOK_REQUEST,
      isSending: true,
      isStored: false,
      userData: [],
    };
    expect(borrowBookRequest([])).toEqual(expectedAction);
  });
  it('should create an action to send borrow books response', () => {
    const expectedAction = {
      type: BORROW_BOOK_SUCCESS,
      isSending: false,
      isStored: true,
      response: [],
    };
    expect(borrowBookResponse([])).toEqual(expectedAction);
  });

  it('should create an action to send borrow books response', () => {
    const expectedAction = {
      type: BORROW_BOOK_FAILURE,
      isSending: false,
      isStored: false,
      error: [],
    };
    expect(borrowBookError([])).toEqual(expectedAction);
  });

  it('should borrow book if the request is successful', () => {
    fetchMock.postOnce(`/api/v2/users/${1}/books`,
      { status: 200, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: BORROW_BOOK_REQUEST,
        isSending: true,
        isStored: false,
        userData: payload.bookId,
      },
      {
        type: BORROW_BOOK_SUCCESS,
        isSending: false,
        isStored: true,
        response: response.message,
      },
    ];

    store.dispatch(borrowBooks(payload.token, payload.bookId))
      .then(() => {

      }).then(() => {
        expect(actions).toEqual(expectedActions);
      })

  });
});


const fakePayload = {
  bookId: 1,
  token,
};

const fakeResponse = {
  status: 400,
  message: 'Book can not be processed!',
};

describe('Test borrowBooks fail Actions', () => {
  it('should not borrow books if required parameters are not assigned', () => {
    fetchMock.postOnce(`/api/v2/users/${1}/books`,
      { status: 400, body: fakeResponse });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: BORROW_BOOK_REQUEST,
        isSending: true,
        isStored: false,
        userData: fakePayload.bookId,
      },
      {
        type: BORROW_BOOK_FAILURE,
        isSending: false,
        isStored: false,
        error: fakeResponse.message,
      },
    ];
    store.dispatch(borrowBooks(fakePayload.token, fakePayload.bookId))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
