import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  uploadimageError,
  uploadimageRequest,
  uploadimageResponse
} from '../../actions/UploadImages';

import { uploadImage } from '../../src/actions/uploadImage';
import book from '../../__mock__/book';
import localStorageMock from '../../__mock__/localStorage';

window.localStorage = localStorageMock;
const token = jwt.sign({ id: 1, user: 'Tosmak', role: 'admin' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const action = {
  response: 'image uploaded successfully',
  bookData: book[0].image,
  error: 'Bad request',
  secure_url: 'image'
};

const data = new FormData();
data.append('file', action.bookData);
data.append('upload_preset', 'bjfllgrd');

const response = {
  status: 200,
  message: 'image uploaded successfully',
  result: book[0].image,
  secure_url: 'image'
};

describe('Test upload cover image Actions', () => {
  it('should create an action to send upload cover image request', () => {
    const expectedAction = {
      type: UPLOAD_IMAGE_REQUEST,
      isUploading: true,
      imageData: action.bookData
    };
    expect(uploadimageRequest(action.bookData)).toEqual(expectedAction);
  });

  it('should create an action to send upload cover image response', () => {
    const expectedAction = {
      type: UPLOAD_IMAGE_SUCCESS,
      isUploading: false,
      response: action.response
    };
    expect(uploadimageResponse(action.response)).toEqual(expectedAction);
  });

  it('should create an action to send upload cover image error', () => {
    const expectedAction = {
      type: UPLOAD_IMAGE_FAILURE,
      isUploading: false,
      error: action.error
    };
    expect(uploadimageError(action.error)).toEqual(expectedAction);
  });

  it('should return books resources if the request is successful', () => {
    fetchMock.post('https://api.cloudinary.com/v1_1/tosmak/upload',
      { body: response, status: 200 });

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: UPLOAD_IMAGE_REQUEST,
        isUploading: true,
        imageData: data
      },
      {
        type: UPLOAD_IMAGE_SUCCESS,
        isUploading: false,
        response: action.secure_url
      },
    ];
    return store.dispatch(uploadImage(action.bookData))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
