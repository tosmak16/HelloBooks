import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  GET_BORROWED_BOOKS_FAILURE,
  GET_BORROWED_BOOKS_REQUEST,
} from '../../actions/getborrowedBooks';

import getborrowedBooks from '../../src/actions/getborrowedBooks';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = {
  message: 'borrowed books can not be fetch',
};

describe('Test getBorrowedBooks failed Actions', () => {
  it('should not return borrowed books resources if the request is not successful', () => {
    fetchMock.get(`/api/v2/user/${1}/books`,
      { status: 400, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: GET_BORROWED_BOOKS_REQUEST,
        isFetching: true,
        isFetched: false,
      },
      {
        type: GET_BORROWED_BOOKS_FAILURE,
        isFetching: false,
        isFetched: false,
        error: response.message
      },
    ];
    return store.dispatch(getborrowedBooks(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

