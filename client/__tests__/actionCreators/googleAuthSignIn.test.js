import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { signupError, signupRequest, signupResponse, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from '../../actions/signupActions';
import { googleAuthSignIn } from '../../src/actions/googleAuthSignIn';
import { DISPLAY_MESSAGE } from '../../actions/actionTypes';
import localStorageMock from '../../__mock__/localStorage';
import { SET_USER } from '../../actions/actionTypes';

window.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

const Zi = {
  access_token: 'gfdcghvghvghvbhvgvvh',
  id_token: 'hcghvhgvghvjbhvhvjh'
}
const w3 = {
  ofa: 'tosmak',
  U3: 'tosmak16@gmail.com',
  wea: 'tosmak'
}

const payload = {
  Zi,
  w3
};

const userData = {
  token: payload.Zi.access_token,
  username: payload.w3.ofa,
  password: payload.Zi.id_token,
  email: payload.w3.U3,
  firstName: payload.w3.ofa,
  lastName: payload.w3.wea
}

const response = {
  message: 'Registration successful',
  token
}
describe('Test googleAuthSignin', () => {
  it('creates SIGNUP_SUCCESS when user has been registered', () => {
    fetchMock.postOnce('/api/v2/users/googleAuth',
      { status: 201, body: response });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SIGNUP_REQUEST,
        isFetching: true,
        isRegistered: false,
        userData
      },
      {
        type: SET_USER,
        user: jwtDecode(token),
      },
      {
        type: SIGNUP_SUCCESS,
        isFetching: false,
        isRegistered: true,
        response: response.message
      }
    ];
    return store.dispatch(googleAuthSignIn(payload))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

