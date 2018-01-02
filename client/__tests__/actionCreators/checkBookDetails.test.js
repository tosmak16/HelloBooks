import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';
import { showBookDetails, NAVIGATE_TO_DETAILS_PAGE } from '../../actions/showBookDetails';
import checkBookDetails from '../../src/actions/checkBookDetails';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const action = {
  data: '1'
}


describe('Test checkBookDetails Actions', () => {
  it('should create an action to select book request', () => {
    const expectedAction = {
      type: NAVIGATE_TO_DETAILS_PAGE,
      data: action.data
    };
    expect(showBookDetails(action.data)).toEqual(expectedAction);
  });


  it('should create an action to select book request', () => {
    const expectedAction = [{
      type: NAVIGATE_TO_DETAILS_PAGE,
      data: action.data
    }];
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    return store.dispatch(checkBookDetails(action.data, false))
      .then(() => {
        expect(actions).toEqual(expectedAction);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});
