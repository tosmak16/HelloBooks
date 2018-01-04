//Action types
export const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST'
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS'
export const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE'

/** 
 * @param {object} bookData 
 * @returns {object} of deleteBook state
 */
//Action creators
export function deleteBookRequest(bookData) {
  return {
    type: DELETE_BOOK_REQUEST,
    isDeleting: true,
    bookData
  }
}
/**
 * 
 * 
 * @param {string} response 
 * @returns {object} of deleteBook state
 */
export function deleteBookResponse(response) {
  return {
    type: DELETE_BOOK_SUCCESS,
    isDeleting: false,
    response
  }
}
/**
 * 
 * 
 * @param {string} error 
 * @returns {object} of deleteBook state
 */
export function deleteBookError(error) {
  return {
    type: DELETE_BOOK_FAILURE,
    isDeleting: false,
    error
  }
}
