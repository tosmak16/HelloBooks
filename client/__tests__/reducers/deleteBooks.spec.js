import expect from 'expect';

import {
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS
} from '../../actions/deleteBook';

import reducer from '../../reducers/deleteBooks';
import book from '../../__mock__/book';

const response = {
  status: 201,
  message: 'book deleted successfully',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'delete failed'
};
describe('delete book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        data: '',
        error: '',
        isDeleting: false,
        response: ''
      }
    ]);
  });

  it('should return delete book state when a request is sent', () => {
    expect(reducer(undefined, {
      type: DELETE_BOOK_REQUEST,
      bookData: action.bookData
    })).toEqual([
      {
        data: action.bookData,
        error: '',
        isDeleting: true,
        response: ''
      },
      {
        data: '',
        error: '',
        isDeleting: false,
        response: ''
      }
    ]);
  });

  it('should return  delete image success state', () => {
    expect(reducer(undefined, {
      type: DELETE_BOOK_SUCCESS,
      response: action.response
    })).toEqual([
      {
        response: action.response,
        data: '',
        error: '',
        isDeleting: false,
      },
      {
        data: '',
        error: '',
        isDeleting: false,
        response: ''
      }
    ]);
  });

  it('should return delete image error state', () => {
    expect(reducer(undefined, {
      type: DELETE_BOOK_FAILURE,
      error: action.error
    })).toEqual([
      {
        error: action.error,
        data: '',
        isDeleting: false,
        response: ''
      },
      {
        data: '',
        error: '',
        isDeleting: false,
        response: ''
      }
    ]);
  });
});

