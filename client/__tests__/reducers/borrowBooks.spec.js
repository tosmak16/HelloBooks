import expect from 'expect';
import isEmpty from 'lodash/isEmpty';

import {
  BORROW_BOOK_FAILURE,
  BORROW_BOOK_REQUEST,
  BORROW_BOOK_SUCCESS
} from '../../actions/borrowBook';

import reducer from '../../reducers/borrowBooks';

const action = {
  error: 'You can not borrow this book',
  userData: '1',
  response: 'Book borrowed successfully'
};

describe('borrow books reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isStored: false,
        data: {},
        error: '',
        isSending: false,
        response: ''
      }
    ]);
  });

  it('should return  borrow book request state', () => {
    expect(reducer(undefined, {
      type: BORROW_BOOK_REQUEST,
      userData: action.userData
    })).toEqual([
      {
        isStored: false,
        data: action.userData,
        error: '',
        isSending: true,
        response: ''
      },
      {
        isStored: false,
        data: {},
        error: '',
        isSending: false,
        response: ''
      }
    ]);
  });

  it('should return  borrow books success state', () => {
    expect(reducer(undefined, {
      type: BORROW_BOOK_SUCCESS,
      response: action.response
    })).toEqual([
      {
        isStored: !isEmpty(action.response),
        response: action.response,
        data: {},
        error: '',
        isSending: false,
      },
      {
        isStored: false,
        data: {},
        error: '',
        isSending: false,
        response: ''
      }
    ]);
  });

  it('should return  borrow books failure state', () => {
    expect(reducer(undefined, {
      type: BORROW_BOOK_FAILURE,
      error: action.error
    })).toEqual([
      {
        isStored: isEmpty(action.error),
        error: action.error,
        data: {},
        isSending: false,
        response: ''
      },
      {
        isStored: false,
        data: {},
        error: '',
        isSending: false,
        response: ''
      }
    ]);
  });
});
