import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { SIGNUP_FAILURE, SIGNUP_REQUEST } from '../../actions/signupActions';
import { signup } from '../../src/actions/signup';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const wrongPayload = {
  username: 'pggthe',
  password: '123456',
  firstName: 'tobi',
  lastName: 'lastName',
  membershipType: 'Basic',
  email: 'teigxeijra@gmail.com',
  password: '123456'
};

const response = {
  message: 'Please enter the required fields'
}

describe('Test signupActions fail', () => {
  it('returns SIGNUP_FALURE when user provide invalid details', () => {
    fetchMock.post('/api/v2/users/signup', { status: 400, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();

    const expectedActions = [
      {
        type: SIGNUP_REQUEST,
        isFetching: true,
        isRegistered: false,
        userData: wrongPayload
      },
      {
        type: SIGNUP_FAILURE,
        isFetching: false,
        isRegistered: false,
        error: 'Please enter the required fields'
      },

    ];
    return store.dispatch(signup(wrongPayload))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });

  it('returns SIGNUP_FALURE when user provide incomplete details', () => {
    wrongPayload.firstName = ''
    fetchMock.post('/api/v2/users/signup', { status: 400, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();

    const expectedActions = [
      {
        type: SIGNUP_REQUEST,
        isFetching: true,
        isRegistered: false,
        userData: wrongPayload
      },
      {
        type: SIGNUP_FAILURE,
        isFetching: false,
        isRegistered: false,
        error: 'first name is required'
      },

    ];
    return store.dispatch(signup(wrongPayload))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
