import expect from 'expect';

import {
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS
} from '../../actions/getUser';

import reducer from '../../reducers/userDetail';
import user from '../../__mock__/user';


const action = {
  error: 'bad request',
  data: user[0]
};

describe('user details reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isFetching: false,
        data: [],
        error: '',
      }
    ]);
  });

  it('should return user details state when a request is sent', () => {
    expect(reducer(undefined, {
      type: GET_USER_DETAILS_REQUEST,
    })).toEqual([
      {
        isFetching: true,
        data: [],
        error: '',
      },
      {
        isFetching: false,
        data: [],
        error: '',
      }
    ]);
  });

  it('should return  getbooks success state', () => {
    expect(reducer(undefined, {
      type: GET_USER_DETAILS_SUCCESS,
      data: action.data
    })).toEqual([
      {
        isFetching: false,
        data: action.data,
        error: '',
      },
      {
        isFetching: false,
        data: [],
        error: '',
      }
    ]);
  });

  it('should return  getbooks failure state', () => {
    expect(reducer(undefined, {
      type: GET_USER_DETAILS_FAILURE,
      error: action.error
    })).toEqual([
      {
        isFetching: false,
        data: [],
        error: action.error,
      },
      {
        isFetching: false,
        data: [],
        error: '',
      }
    ]);
  });
});

