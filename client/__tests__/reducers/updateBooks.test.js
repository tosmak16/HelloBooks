import expect from 'expect';

import {
  UPDATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS
} from '../../actions/updateBooks';

import reducer from '../../reducers/updateBooks';
import book from '../../__mock__/book';

const response = {
  status: 201,
  message: 'book updated successfully',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'update failed'
};


describe('update book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        data: '',
        error: '',
        isUpdating: false,
        response: ''
      }
    ]);
  });

  it('should return update book state when a request is sent', () => {
    expect(reducer(undefined, {
      type: UPDATE_BOOK_REQUEST,
      bookData: action.bookData
    })).toEqual([
      {
        data: action.bookData,
        error: '',
        isUpdating: true,
        response: ''
      },
      {
        data: '',
        error: '',
        isUpdating: false,
        response: ''
      }
    ]);
  });

  it('should return  update image success state', () => {
    expect(reducer(undefined, {
      type: UPDATE_BOOK_SUCCESS,
      response: action.response
    })).toEqual([
      {
        response: action.response,
        data: '',
        error: '',
        isUpdating: false,
      },
      {
        data: '',
        error: '',
        isUpdating: false,
        response: ''
      }
    ]);
  });

  it('should return update image error state', () => {
    expect(reducer(undefined, {
      type: UPDATE_BOOK_FAILURE,
      error: action.error
    })).toEqual([
      {
        error: action.error,
        data: '',
        isUpdating: false,
        response: ''
      },
      {
        data: '',
        error: '',
        isUpdating: false,
        response: ''
      }
    ]);
  });
});

