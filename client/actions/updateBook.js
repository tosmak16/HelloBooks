//Action types
export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST'
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS'
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE'


//Action creators
/**
 * @param {object} bookData 
 * @returns {object} of update books state
 */
export const updateBookRequest = (bookData) => {
  return {
    type: UPDATE_BOOK_REQUEST,
    isUpdating: true,
    bookData
  }
}
/**
 * @param {string} response 
 * @returns {object} of update books state
 */
export const updateBookResponse = (response) => {
  return {
    type: UPDATE_BOOK_SUCCESS,
    isUpdating: false,
    response
  }
}
/**
 * @param {string} error 
 * @returns {object} of update books state
 */
export const updateBookError = (error) => {
  return {
    type: UPDATE_BOOK_FAILURE,
    isUpdating: false,
    error
  }
}
