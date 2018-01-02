import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import lodash from 'lodash';

import { showBooksByCategory, SEARCH_BOOKS, getFilteredBooks, SHOW_BOOKS_BY_CATEGORY } from '../../actions/getFilteredBooks';
import books from '../../__mock__/book';
import showbooksByCategory from '../../src/actions/showbooksByCategory';
import searchbooks from '../../src/actions/searchbooks';


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

const selectedCategory = response.category;

const filteredData = lodash.filter(response.data, ['category', selectedCategory]);


describe('Test showBooksByCategory action creator', () => {
  it('should return books data by category', () => {
    const expectedAction = {
      type: SHOW_BOOKS_BY_CATEGORY,
      data: response.data,
      category: response.category
    };

    expect(showBooksByCategory(response.data, response.category)).toEqual(expectedAction);
  });

  it('should filter books data by searching', () => {
    const expectedAction = {
      type: SEARCH_BOOKS,
      data: response.data
    };

    expect(getFilteredBooks(response.data)).toEqual(expectedAction);
  });

  it('should dispatch action to return books by category', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SHOW_BOOKS_BY_CATEGORY,
        data: filteredData,
        category: response.category
      },
    ];
    store.dispatch(showbooksByCategory(selectedCategory, response.data));

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch action to search books by bookTitle', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_BOOKS,
        data: [response.data[1]]
      },
    ];
    store.dispatch(searchbooks(response.filterBy, 'LATE', response.data));

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch action to search books by category', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_BOOKS,
        data: [response.data[2], response.data[6]]
      },
    ];
    store.dispatch(searchbooks('category', 'Music', response.data));

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch action to search books by author', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_BOOKS,
        data: [response.data[1]]
      },
    ];
    store.dispatch(searchbooks('author', 'Adam', response.data));

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch action to search books by isbn', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_BOOKS,
        data: [response.data[1]]
      },
    ];
    store.dispatch(searchbooks('isbn', '234560878', response.data));

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch action to search books by bookTitle', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_BOOKS,
        data: [response.data[6]]
      },
    ];
    store.dispatch(searchbooks(response.filterBy, 'SONG', response.data));

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch action to search last book in an array of books', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_BOOKS,
        data: [response.data[7]]
      },
    ];
    store.dispatch(searchbooks(response.filterBy, 'THE ILIAD', response.data));

    expect(actions).toEqual(expectedActions);
  });
});
