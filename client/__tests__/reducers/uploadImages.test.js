import expect from 'expect';

import {
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS
} from '../../actions/UploadImages';

import reducer from '../../reducers/uploadImages';
import book from '../../__mock__/book';


const response = {
  status: 200,
  message: 'image uploaded successfully',
  result: book[0].image
};

const action = {
  response,
  bookData: book[0].image,
  error: 'Bad request'
};


describe('upload profile image reducer', () => {
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

  it('should return upload cover image state when a request is sent', () => {
    expect(reducer(undefined, {
      type: UPLOAD_IMAGE_REQUEST,
      imageData: action.bookData
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

  it('should return  upload cover image success state', () => {
    expect(reducer(undefined, {
      type: UPLOAD_IMAGE_SUCCESS,
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

  it('should return upload cover image error state', () => {
    expect(reducer(undefined, {
      type: UPLOAD_IMAGE_FAILURE,
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

