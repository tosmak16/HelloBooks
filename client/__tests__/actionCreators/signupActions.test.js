import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { signupError, signupRequest, signupResponse, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from '../../actions/signupActions';
import { userSignup } from '../../src/actions/signupAction';
import { DISPLAY_MESSAGE } from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const payload = {
  username: 'pggthe',
  email: 'teigxeijra@gmail.com',
  password: '123456',
  firstName: 'tobi',
  lastName: 'lastName',
  membershipType: 'Basic'

};


describe('Test signupActions', () => {
  it('should create an action to send signup request', () => {
    const expectedAction = {
      type: SIGNUP_REQUEST,
      isFetching: true,
      isRegistered: false,
      userData: []
    };
    expect(signupRequest([])).toEqual(expectedAction);
  });

  it('should create an action to receive signup response', () => {
    const expectedAction = {
      type: SIGNUP_SUCCESS,
      isFetching: false,
      isRegistered: true,
      response: ''
    };
    expect(signupResponse('')).toEqual(expectedAction);
  });

  it('should create an action to receive signup error if error', () => {
    const expectedAction = {
      type: SIGNUP_FAILURE,
      isFetching: false,
      isRegistered: false,
      error: ''
    };
    expect(signupError('')).toEqual(expectedAction);
  });


  it('creates SIGNUP_SUCCESS when user has been registered', () => {
    fetchMock.post('http://localhost:8000/api/v2/users/signup', JSON.stringify({ status: 201, message: 'Registration successful' }));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SIGNUP_REQUEST,
        isFetching: true,
        isRegistered: false,
        userData: payload
      },
      {
        type: SIGNUP_SUCCESS,
        isFetching: false,
        isRegistered: true,
        response: 'Registration successful'
      },
      {
        type: DISPLAY_MESSAGE,
        message: {
          type: 'success',
          text: 'Registration successful'
        }
      },
      {
        type: SIGNUP_FAILURE,
        isFetching: false,
        isRegistered: false,
        error: {}
      },
    ];
    return store.dispatch(userSignup(payload))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

