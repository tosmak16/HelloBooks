//Action types
export const RETURN_BOOK_REQUEST = 'RETURN_BOOK_REQUEST'
export const RETURN_BOOK_SUCCESS = 'RETURN_BOOK_SUCCESS'
export const RETURN_BOOK_FAILURE = 'RETURN_BOOK_FAILURE'


//Action creators
/**
 * 
 * 
 * @export
 * @param {any} bookData 
 * @returns 
 */
export function returnbookRequest(bookData) {
  return {
    type: RETURN_BOOK_REQUEST,
    isReturning: true,
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
export function returnbookResponse(response) {
  return {
    type: RETURN_BOOK_SUCCESS,
    isReturning: false,
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
export function returnbookError(error) {
  return {
    type: RETURN_BOOK_FAILURE,
    isReturning: false,
    error
  }
}
