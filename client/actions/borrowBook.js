//Action types
export const BORROW_BOOK_REQUEST = 'BORROW_BOOK_REQUEST'
export const BORROW_BOOK_SUCCESS = 'BORROW_BOOK_SUCCESS'
export const BORROW_BOOK_FAILURE = 'BORROW_BOOK_FAILURE'


//Action creators
/**
 * @param {object} userData 
 * 
 * @returns {object} of borrow books state
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
 * @param {string} response 
 * 
 * @returns {object} of borrow books state
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
 * @param {string} error 
 * 
 * @returns {object} of borrow books state
 */
export function borrowBookError(error) {
  return {
    type: BORROW_BOOK_FAILURE,
    isSending: false,
    isStored: false,
    error
  }
}
