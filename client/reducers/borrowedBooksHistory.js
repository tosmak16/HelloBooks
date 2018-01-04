import { GET_BORROWED_BOOKS_FAILURE, GET_BORROWED_BOOKS_SUCCESS, GET_BORROWED_BOOKS_REQUEST } from '../actions/getBorrowedBook';

const initialState = [{
  isFetching: false,
  isFetched: false,
  data: [],
  error: '',
}];
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BORROWED_BOOKS_REQUEST:
      return [{
        isFetching: true,
        isFetched: false,
        data: [],
        error: '',
      }, ...state];
    case GET_BORROWED_BOOKS_SUCCESS:
      return [{
        isFetching: false,
        isFetched: true,
        data: action.data,
        error: '',
      }, ...state];
    case GET_BORROWED_BOOKS_FAILURE:
      return [{
        isFetching: false,
        isFetched: false,
        data: [],
        error: action.error,
      }, ...state];
    default:
      return state;
  }
};
