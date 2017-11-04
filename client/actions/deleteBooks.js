//Action types
export const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST'
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS'
export const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE'

/**
 * 
 * 
 * @export
 * @param {any} bookData 
 * @returns 
 */
//Action creators
export function deletebookRequest(bookData) {
  return {
    type: DELETE_BOOK_REQUEST,
    isDeleting: true,
    bookData
  }
}
/**
 * 
 * 
 * @export
 * @param {any} response 
 * @returns 
 */
export function deletebookResponse(response) {
  return {
    type: DELETE_BOOK_SUCCESS,
    isDeleting: false,
    response
  }
}
/**
 * 
 * 
 * @export
 * @param {any} error 
 * @returns 
 */
export function deletebookError(error) {
  return {
    type: DELETE_BOOK_FAILURE,
    isDeleting: false,
    error
  }
}
