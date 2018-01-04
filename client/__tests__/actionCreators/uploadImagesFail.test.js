import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  uploadImageError,
  uploadImageRequest,
  uploadImageResponse
} from '../../actions/uploadImage';

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
  error: 'Bad request'
};

const data = new FormData();
data.append('file', action.bookData);
data.append('upload_preset', process.env.UPLOAD_PRESET);

const response = {
  status: 400,
  message: action.error,
  result: book[0].image
};

describe('Test upload cover image Actions', () => {
  it('should return books resources if the request is successful', () => {
    fetchMock.post('https://api.cloudinary.com/v1_1/tosmak/upload',
      { body: response, status: 400 });


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
        type: UPLOAD_IMAGE_FAILURE,
        isUploading: false,
        error: action.error
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
