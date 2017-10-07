import expect from 'expect';

import {
  UPLOAD_AVATAR_FAILURE,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS
} from '../../actions/uploadAvatar';

import reducer from '../../reducers/userProfileImage';
import user from '../../__mock__/user';


const response = {
  status: 200,
  message: 'image uploaded successfully',
  result: user[0].image
};

const action = {
  response,
  userData: user[0].image,
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

  it('should return upload image state when a request is sent', () => {
    expect(reducer(undefined, {
      type: UPLOAD_AVATAR_REQUEST,
      data: action.data
    })).toEqual([
      {
        data: action.data,
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
      type: UPLOAD_AVATAR_SUCCESS,
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
      type: UPLOAD_AVATAR_FAILURE,
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

