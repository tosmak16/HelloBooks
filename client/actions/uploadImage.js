//Action types
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'

//Action creators
/**
 * @param {object} imageData 
 * 
 * @returns {object} of upload book cover image state
 */
export const uploadImageRequest = (imageData) => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
    isUploading: true,
    imageData
  }
}
/**
 * @param {string} response 
 * 
 * @returns {object} of upload book cover image state
 */
export const uploadImageResponse = (response) => {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    isUploading: false,
    response
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of upload book cover image state
 */
export const uploadImageError = (error) => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    isUploading: false,
    error
  }
}
