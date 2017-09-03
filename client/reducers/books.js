import { GET_ALL_BOOKS_FAILURE, GET_ALL_BOOKS_SUCCESS, GET_ALL_BOOKS_REQUEST } from '../actions/getBooks';

const initialState = {
  isFetching: false,
  isFetched: false,
  data: [],
  error: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return {
        isFetching: true,
        isFetched: false,
        data: [],
        error: '',
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        isFetching: false,
        isFetched: true,
        data: action.data,
        error: '',
      };
    case GET_ALL_BOOKS_FAILURE:
      return {
        isFetching: false,
        isFetched: false,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
};
