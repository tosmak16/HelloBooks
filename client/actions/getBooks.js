export const GET_ALL_BOOKS_REQUEST = 'GET_ALL_BOOKS_REQUEST';
export const GET_ALL_BOOKS_SUCCESS = 'GET_ALL_BOOKS_SUCCESS';
export const GET_ALL_BOOKS_FAILURE = 'GET_ALL_BOOKS_FAILURE';

/** 
 * @returns {object} of get books state
 */
export const getBooksRequest = () => {
  return {
    type: GET_ALL_BOOKS_REQUEST,
    isFetching: true,
    isFetched: false,
  }
}
/**
 * @param {object} data 
 * @returns {object} of get books state
 */
export const getBooksReponse = (data) => {
  return {
    type: GET_ALL_BOOKS_SUCCESS,
    isFetching: false,
    isFetched: true,
    data,
  }
}
/**
 * @param {string} error 
 * @returns {object} of get books state
 */
export const getBooksError = (error) => {
  return {
    type: GET_ALL_BOOKS_FAILURE,
    isFetching: false,
    isFetched: false,
    error,
  }
}

