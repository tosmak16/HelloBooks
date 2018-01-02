import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  UPLOAD_AVATAR_FAILURE,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS,
  uploadProfileImageError,
  uploadProfileImageRequest,
  uploadProfileImageResponse
} from '../../actions/uploadAvatar';

import { uploadAvatar } from '../../src/actions/uploadUserAvatar';
import user from '../../__mock__/user';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'image uploaded successfully',
  userData: user[0].image,
  error: 'Bad request',
  secure_url: 'image'
};

const data = new FormData();
data.append('file', action.userData);
data.append('upload_preset', process.env.UPLOAD_PRESET);

const response = {
  status: 200,
  message: 'image uploaded successfully',
  result: user[0].image,
  secure_url: 'image'
};

describe('Test upload profile picture Actions', () => {
  it('should create an action to send upload picture request', () => {
    const expectedAction = {
      type: UPLOAD_AVATAR_REQUEST,
      isUploading: true,
      data: action.userData
    };
    expect(uploadProfileImageRequest(action.userData)).toEqual(expectedAction);
  });

  it('should create an action to send upload picture response', () => {
    const expectedAction = {
      type: UPLOAD_AVATAR_SUCCESS,
      isUploading: false,
      response: action.response
    };
    expect(uploadProfileImageResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send upload picture error', () => {
    const expectedAction = {
      type: UPLOAD_AVATAR_FAILURE,
      isUploading: false,
      error: action.error
    };
    expect(uploadProfileImageError(action.error)).toEqual(expectedAction);
  });

  it('should return books resources if the request is successful', () => {
    fetchMock.post('https://api.cloudinary.com/v1_1/tosmak/upload',
      { body: response, status: 200 });
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: UPLOAD_AVATAR_REQUEST,
        isUploading: true,
        data
      },
      {
        type: UPLOAD_AVATAR_SUCCESS,
        isUploading: false,
        response: action.secure_url
      },
    ];
    return store.dispatch(uploadAvatar(action.userData))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
