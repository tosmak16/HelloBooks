import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  UPLOAD_AVATAR_FAILURE,
  UPLOAD_AVATAR_REQUEST,
} from '../../actions/uploadAvatar';

import { uploadUserAvatar } from '../../src/actions/uploadUserAvatar';
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
  error: 'Bad request'
};

const data = new FormData();
data.append('file', action.userData);
data.append('upload_preset', process.env.UPLOAD_PRESET);

const response = {
  status: 400,
  message: 'image not uploaded successfully',
  result: user[0].image,
  error: 'Bad request'
};

describe('Test upload profile picture Actions', () => {
  it('should not upload picture if the request is not successful', () => {
    fetchMock.post('https://api.cloudinary.com/v1_1/tosmak/upload',
      { body: response, status: 400 });

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
        type: UPLOAD_AVATAR_FAILURE,
        isUploading: false,
        error: action.error
      },
    ];
    return store.dispatch(uploadUserAvatar(action.userData))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
