import expect from 'expect';

import {
  RETURN_BOOK_FAILURE,
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_SUCCESS,
} from '../../actions/returnBook';

import reducer from '../../reducers/returnBooks';
import books from '../../__mock__/book';


const action = {
  error: 'bad request',
  bookData: books.slice(1, 3),
  response: 'book returned succesfully'
};

describe('returnedbooks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        data: '',
        error: '',
        isReturning: false,
        response: ''
      }
    ]);
  });

  it('should send return books request state', () => {
    expect(reducer(undefined, {
      type: RETURN_BOOK_REQUEST,
      bookData: action.bookData
    })).toEqual([
      {
        data: action.bookData,
        error: '',
        isReturning: true,
        response: ''
      },
      {
        data: '',
        error: '',
        isReturning: false,
        response: ''
      }
    ]);
  });

  it('should send return books success state', () => {
    expect(reducer(undefined, {
      type: RETURN_BOOK_SUCCESS,
      response: action.response
    })).toEqual([
      {
        response: action.response,
        data: '',
        error: '',
        isReturning: false,
      },
      {
        data: '',
        error: '',
        isReturning: false,
        response: ''
      }
    ]);
  });

  it('should send return books failure state', () => {
    expect(reducer(undefined, {
      type: RETURN_BOOK_FAILURE,
      error: action.error
    })).toEqual([
      {
        error: action.error,
        data: '',
        isReturning: false,
        response: ''
      },
      {
        data: '',
        error: '',
        isReturning: false,
        response: ''
      }
    ]);
  });
});
