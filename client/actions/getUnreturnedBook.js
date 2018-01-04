export const GET_UNRETURNED_BOOKS_REQUEST = 'GET_UNRETURNED_BOOKS_REQUEST';
export const GET_UNRETURNED_BOOKS_SUCCESS = 'GET_UNRETURNED_BOOKS_SUCCESS';
export const GET_UNRETURNED_BOOKS_FAILURE = 'GET_UNRETURNED_BOOKS_FAILURE';

/** 
 * @returns {object} unreturned books state 
 */
export const getUnreturnedBookRequest = () => {
  return {
    type: GET_UNRETURNED_BOOKS_REQUEST,
    isFetching: true,
    isFetched: false,
  }
}
/**
 * @param {object} data 
 * @returns {object} unreturned books state 
 */
export const getUnreturnedBookReponse = (data) => {
  return {
    type: GET_UNRETURNED_BOOKS_SUCCESS,
    isFetching: false,
    isFetched: true,
    data,
  }
}
/**
 * @param {string} error 
 * @returns {object} unreturned books state 
 */
export const getUnreturnedBookError = (error) => {
  return {
    type: GET_UNRETURNED_BOOKS_FAILURE,
    isFetching: false,
    isFetched: false,
    error,
  }
}

