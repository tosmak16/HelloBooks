import expect from 'expect';

import {
  GET_UNRETURNED_BOOKS_FAILURE,
  GET_UNRETURNED_BOOKS_REQUEST,
  GET_UNRETURNED_BOOKS_SUCCESS
} from '../../actions/getUnreturnedBook';

import reducer from '../../reducers/unreturnedBooks';
import books from '../../__mock__/book';


const action = {
  error: 'bad request',
  data: books.slice(1, 3)
};

describe('unreturnedbooks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isFetching: false,
        isFetched: false,
        data: [],
        error: '',
      }
    ]);
  });

  it('should return  getborrowedbooks request state', () => {
    expect(reducer(undefined, {
      type: GET_UNRETURNED_BOOKS_REQUEST,
    })).toEqual([
      {
        isFetching: true,
        isFetched: false,
        data: [],
        error: '',
      },
      {
        isFetching: false,
        isFetched: false,
        data: [],
        error: '',
      }
    ]);
  });

  it('should return  getborrowedbooks success state', () => {
    expect(reducer(undefined, {
      type: GET_UNRETURNED_BOOKS_SUCCESS,
      data: action.data
    })).toEqual([
      {
        isFetching: false,
        isFetched: true,
        data: action.data,
        error: '',
      },
      {
        isFetching: false,
        isFetched: false,
        data: [],
        error: '',
      }
    ]);
  });

  it('should return  getborrowedbooks failure state', () => {
    expect(reducer(undefined, {
      type: GET_UNRETURNED_BOOKS_FAILURE,
      error: action.error
    })).toEqual([
      {
        isFetching: false,
        isFetched: false,
        data: [],
        error: action.error,
      },
      {
        isFetching: false,
        isFetched: false,
        data: [],
        error: '',
      }
    ]);
  });
});
