export const GET_BORROWED_BOOKS_REQUEST = 'GET_BORROWED_BOOKS_REQUEST';
export const GET_BORROWED_BOOKS_SUCCESS = 'GET_BORROWED_BOOKS_SUCCESS';
export const GET_BORROWED_BOOKS_FAILURE = 'GET_BORROWED_BOOKS_FAILURE';

/**
 * @returns {object} of borrowed books state
 */
export const getBorrowedBookRequest = () => {
  return {
    type: GET_BORROWED_BOOKS_REQUEST,
    isFetching: true,
    isFetched: false,
  }
}
/**
 * @param {object} data 
 * @returns {object} of borrowed books state
 */
export const getBorrowedBookReponse = (data) => {
  return {
    type: GET_BORROWED_BOOKS_SUCCESS,
    isFetching: false,
    isFetched: true,
    data,
  }
}
/**
 * @param {string} error 
 * @returns {object} of borrowed books state
 */
export const getBorrowedBookError = (error) => {
  return {
    type: GET_BORROWED_BOOKS_FAILURE,
    isFetching: false,
    isFetched: false,
    error,
  }
}

