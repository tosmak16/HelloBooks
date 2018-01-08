//Action types
export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST'
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS'
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE'

//Action creators
/**

 * @param {object} data 
 * 
 * @returns {object} of upload Image state
 */
export const uploadProfileImageRequest = (data) => {
  return {
    type: UPLOAD_AVATAR_REQUEST,
    isUploading: true,
    data
  }
}
/**
 * @param {string} response 
 * 
 * @returns {object} of upload Image state
 */
export const uploadProfileImageResponse = (response) => {
  return {
    type: UPLOAD_AVATAR_SUCCESS,
    isUploading: false,
    response
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of upload Image state
 */
export const uploadProfileImageError = (error) => {
  return {
    type: UPLOAD_AVATAR_FAILURE,
    isUploading: false,
    error
  }
}
