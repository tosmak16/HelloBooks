export const GET_ALL_BOOKS_REQUEST = 'GET_ALL_BOOKS_REQUEST';
export const GET_ALL_BOOKS_SUCCESS = 'GET_ALL_BOOKS_SUCCESS';
export const GET_ALL_BOOKS_FAILURE = 'GET_ALL_BOOKS_FAILURE';

/**
 * 
 * 
 * @export
 * @returns 
 */
export function getbooksRequest() {
  return {
    type: GET_ALL_BOOKS_REQUEST,
    isFetching: true,
    isFetched: false,
  }
}
/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function getbooksReponse(data) {
  return {
    type: GET_ALL_BOOKS_SUCCESS,
    isFetching: false,
    isFetched: true,
    data,
  }
}
/**
 * 
 * 
 * @export
 * @param {any} error 
 * @returns 
 */
export function getbooksError(error) {
  return {
    type: GET_ALL_BOOKS_FAILURE,
    isFetching: false,
    isFetched: false,
    error,
  }
}

