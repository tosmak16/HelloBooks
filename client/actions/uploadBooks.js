//Action types
export const UPLOAD_BOOK_REQUEST = 'UPLOAD_BOOK_REQUEST'
export const UPLOAD_BOOK_SUCCESS = 'UPLOAD_BOOK_SUCCESS'
export const UPLOAD_BOOK_FAILURE = 'UPLOAD_BOOK_FAILURE'

//Action creators
/**
 * @param {object} bookData 
 * @returns {object} of upload books state
 */
export const uploadBookRequest = (bookData) => {
  return {
    type: UPLOAD_BOOK_REQUEST,
    isUploading: true,
    bookData
  }
}
/**
 * @param {string} response 
 * @returns {object} of upload books state
 */
export const uploadBookResponse = (response) => {
  return {
    type: UPLOAD_BOOK_SUCCESS,
    isUploading: false,
    response
  }
}
/**
 * @param {string} error 
 * @returns {object} of upload books state
 */
export const uploadBookError = (error) => {
  return {
    type: UPLOAD_BOOK_FAILURE,
    isUploading: false,
    error
  }
}
