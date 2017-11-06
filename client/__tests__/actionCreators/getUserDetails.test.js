import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  getuserdetailsError, getuserdetailsReponse,
  getuserdetailsRequest, GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS
} from '../../actions/getUserDetails';

import getUserDetails from '../../src/actions/getUserDetails';
import user from '../../__mock__/user';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'user details fetched successfully',
  userData: user[0],
  error: 'Bad request'
};

const response = {
  status: 200,
  message: 'user details fetched successfully',
  userDetails: user[0]
};


describe('Test get user Actions', () => {
  it('should create an action to send getUserDetails request', () => {
    const expectedAction = {
      type: GET_USER_DETAILS_REQUEST,
      isFetching: true,
    };
    expect(getuserdetailsRequest()).toEqual(expectedAction);
  });

  it('should create an action to send getUserDetails response', () => {
    const expectedAction = {
      type: GET_USER_DETAILS_SUCCESS,
      isFetching: false,
      data: action.userData
    };
    expect(getuserdetailsReponse(action.userData)).toEqual(expectedAction);
  });

  it('should create an action to send getUserDetails failed', () => {
    const expectedAction = {
      type: GET_USER_DETAILS_FAILURE,
      isFetching: false,
      error: action.error
    };
    expect(getuserdetailsError(action.error)).toEqual(expectedAction);
  });

  it('should return books resources if the request is successful', () => {
    fetchMock.get(`/api/v2/users/${1}`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: GET_USER_DETAILS_REQUEST,
        isFetching: true,
      },
      {
        type: GET_USER_DETAILS_SUCCESS,
        isFetching: false,
        data: action.userData
      },
    ];
    return store.dispatch(getUserDetails(token))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
