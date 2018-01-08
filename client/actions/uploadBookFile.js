//Action types
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'

//Action creators
/**
 * @param {object} fileData 
 * 
 * @returns {object} of upload book file state
 */
export const uploadFileRequest = (fileData) => {
  return {
    type: UPLOAD_FILE_REQUEST,
    isUploading: true,
    fileData
  }
}
/**
 * @param {string} response 
 * 
 * @returns {object} of upload book file state
 */
export const uploadFileResponse = (response) => {
  return {
    type: UPLOAD_FILE_SUCCESS,
    isUploading: false,
    response
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of upload book file state
 */
export const uploadFileError = (error) => {
  return {
    type: UPLOAD_FILE_FAILURE,
    isUploading: false,
    error
  }
}
