import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';

import {
  BORROW_BOOK_FAILURE,
  BORROW_BOOK_REQUEST,
} from '../../actions/borrowBook';

import borrowBooks from '../../src/actions/borrowBooks';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const payload = {
  bookId: 1,
  token
};

const response = {
  status: 400,
  message: 'Book can not be processed!',
};

describe('Test borrowBooks fail Actions', () => {
  it('should not borrow books if required parameters are not assigned', () => {
    fetchMock.post(`http://localhost:8000/api/v2/users/${1}/books`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: BORROW_BOOK_REQUEST,
        isSending: true,
        isStored: false,
        userData: payload.bookId
      },
      {
        type: BORROW_BOOK_FAILURE,
        isSending: false,
        isStored: false,
        error: response.message
      },
    ];
    return store.dispatch(borrowBooks(payload.token, payload.bookId))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
