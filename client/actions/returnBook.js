//Action types
export const RETURN_BOOK_REQUEST = 'RETURN_BOOK_REQUEST'
export const RETURN_BOOK_SUCCESS = 'RETURN_BOOK_SUCCESS'
export const RETURN_BOOK_FAILURE = 'RETURN_BOOK_FAILURE'

//Action creators
/**
 * @param {object} bookData 
 * 
 * @returns {object} of return books state
 */
export const returnBookRequest = (bookData) => {
  return {
    type: RETURN_BOOK_REQUEST,
    isReturning: true,
    bookData
  }
}
/**
 * @param {string} response 
 * 
 * @returns {object} of return books state
 */
export const returnBookResponse = (response) => {
  return {
    type: RETURN_BOOK_SUCCESS,
    isReturning: false,
    response
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of return books state
 */
export const returnBookError = (error) => {
  return {
    type: RETURN_BOOK_FAILURE,
    isReturning: false,
    error
  }
}
