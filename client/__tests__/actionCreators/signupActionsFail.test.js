import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { SIGNUP_FAILURE, SIGNUP_REQUEST } from '../../actions/signupActions';
import { userSignup } from '../../src/actions/signupAction';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const wrongPayload = {
  email: 'teigxeijra@gmail.com',
  password: '123456',
};

describe('Test signupActions fail', () => {
  it('returns SIGNUP_FALURE when user provide incomplete details', () => {
    fetchMock.post('http://localhost:8000/api/v2/users/signup', JSON.stringify({ status: 400, message: 'Please enter the required fields' }));

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
    return store.dispatch(userSignup(wrongPayload))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
