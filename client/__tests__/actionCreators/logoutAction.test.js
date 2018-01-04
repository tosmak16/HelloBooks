import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_USER } from '../../actions/actionTypes';
import '../../public/js/googlePlatformScript/googlePlatform';
import logout from '../../src/actions/logout';
import localStorageMock from '../../__mock__/localStorage';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test LoginActions', () => {
  beforeAll(() => {
    window.localStorage = localStorageMock;
    localStorage.setItem('jwtToken', '123');
    localStorage.setItem('count', '123');
    localStorage.setItem('bookId', '123');
    localStorage.setItem('id');

    localStorage.setItem('category', '123');
    localStorage.setItem('isbn', '123');
    localStorage.setItem('stocknumber', '123');
    localStorage.setItem('author', '123');
    localStorage.setItem('summary', '123');
    localStorage.setItem('bookTitle', '123');
    localStorage.setItem('image', '123');
    localStorage.removeItem('image');
  });


  it('returns signin success when user has logged in successfully', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SET_USER,
        user: {},
      },
    ];
    store.dispatch(logout());
    expect(actions).toEqual(expectedActions);
  });
});

