//Action types
export const BORROW_BOOK_REQUEST = 'BORROW_BOOK_REQUEST'
export const BORROW_BOOK_SUCCESS = 'BORROW_BOOK_SUCCESS'
export const BORROW_BOOK_FAILURE = 'BORROW_BOOK_FAILURE'


//Action creators
/**
 * 
 * 
 * @export
 * @param {any} userData 
 * @returns 
 */
export function borrowBookRequest(userData) {
  return {
    type: BORROW_BOOK_REQUEST,
    isSending: true,
    isStored: false,
    userData
  }
}
/**
 * 
 * 
 * @export
 * @param {any} response 
 * @returns 
 */
export function borrowBookResponse(response) {
  return {
    type: BORROW_BOOK_SUCCESS,
    isSending: false,
    isStored: true,
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
export function borrowBookError(error) {
  return {
    type: BORROW_BOOK_FAILURE,
    isSending: false,
    isStored: false,
    error
  }
}
