import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import lodash from 'lodash';

import { NAVIGATE_TO_DETAILS_PAGE, showBookDetails } from '../../actions/showBookDetails';
import books from '../../__mock__/book';
import checkBookDetails from '../../src/actions/checkBookDetails';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const response = {
  status: 200,
  message: 'Book fetch successfully',
  result: books,
  category: 'Music',
  filterBy: 'bookTitle',
  data: books
};
describe('Test showBookDtail action creator', () => {
  it('should show book details', () => {
    const expectedAction = {
      type: NAVIGATE_TO_DETAILS_PAGE,
      data: response.data
    };

    expect(showBookDetails(response.data)).toEqual(expectedAction);
  });

  it('should dispatch action to search books by bookTitle', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: NAVIGATE_TO_DETAILS_PAGE,
        data: '1'
      },
    ];

    store.dispatch(checkBookDetails('1', false));

    expect(actions).toEqual(expectedActions);
  });
});
