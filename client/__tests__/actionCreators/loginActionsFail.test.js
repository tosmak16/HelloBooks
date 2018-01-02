import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
} from '../../actions/loginActions';

import userSignin from '../../src/actions/loginAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const payload = {
  username: 'pggthe',
  password: '123456'
};

const response = {
  message: 'username and paswword is not valid'
};


describe('Test LoginActions failed', () => {
  it('returns username and pawword is invalid when user is invalid', () => {
    fetchMock.post('/api/v2/users/signin',
      { status: 400, body: response });

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
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        error: response.message
      }
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

