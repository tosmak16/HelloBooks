import expect from 'expect';

import {
  UPLOAD_BOOK_FAILURE,
  UPLOAD_BOOK_REQUEST,
  UPLOAD_BOOK_SUCCESS
} from '../../actions/uploadBooks';

import reducer from '../../reducers/uploadBooks';
import book from '../../__mock__/book';

const response = {
  status: 201,
  message: 'book uploaded successfully',
};

const action = {
  response: response.message,
  bookData: book[0],
  error: 'Upload failed'
};


describe('upload book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        data: '',
        error: '',
        isUploading: false,
        response: ''
      }
    ]);
  });

  it('should return upload book state when a request is sent', () => {
    expect(reducer(undefined, {
      type: UPLOAD_BOOK_REQUEST,
      bookData: action.bookData
    })).toEqual([
      {
        data: action.bookData,
        error: '',
        isUploading: true,
        response: ''
      },
      {
        data: '',
        error: '',
        isUploading: false,
        response: ''
      }
    ]);
  });

  it('should return  upload image success state', () => {
    expect(reducer(undefined, {
      type: UPLOAD_BOOK_SUCCESS,
      response: action.response
    })).toEqual([
      {
        response: action.response,
        data: '',
        error: '',
        isUploading: false,
      },
      {
        data: '',
        error: '',
        isUploading: false,
        response: ''
      }
    ]);
  });

  it('should return upload image error state', () => {
    expect(reducer(undefined, {
      type: UPLOAD_BOOK_FAILURE,
      error: action.error
    })).toEqual([
      {
        error: action.error,
        data: '',
        isUploading: false,
        response: ''
      },
      {
        data: '',
        error: '',
        isUploading: false,
        response: ''
      }
    ]);
  });
});

