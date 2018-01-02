import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';


import { SET_USER } from '../../actions/actionTypes';

import {
  loginError,
  loginRequest,
  loginResponse,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from '../../actions/loginActions';

import userSignin from '../../src/actions/loginAction';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const payload = {
  username: 'pggthe',
  password: '123456'
};

const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');


describe('Test LoginActions', () => {
  it('should create an action to send login request', () => {
    const expectedAction = {
      type: LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
      userData: payload
    };
    expect(loginRequest(payload)).toEqual(expectedAction);
  });

  it('should create an action to receive signin response', () => {
    const expectedAction = {
      type: LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      response: 'logged in successfully'
    };
    expect(loginResponse('logged in successfully')).toEqual(expectedAction);
  });

  it('should create an action to receive signin error if error', () => {
    const expectedAction = {
      type: LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      error: 'username and password is incorrect'
    };
    expect(loginError('username and password is incorrect')).toEqual(expectedAction);
  });

  it('returns signin success when user has logged in successfully', () => {
    fetchMock.post('/api/v2/users/signin', JSON.stringify({ token, status: 200, message: 'logged in successfully' }));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        userData: payload
      },
      {
        type: SET_USER,
        user: jwtDecode(token),
      },
      {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        response: 'logged in successfully'
      },
    ];
    return store.dispatch(userSignin(payload))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

