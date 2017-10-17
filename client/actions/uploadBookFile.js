//Action types
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'


//Action creators
/**
 * 
 * 
 * @export
 * @param {any} fileData 
 * @returns 
 */
export function uploadFileRequest(fileData) {
  return {
    type: UPLOAD_FILE_REQUEST,
    isUploading: true,
    fileData
  }
}
/**
 * 
 * 
 * @export
 * @param {any} response 
 * @returns 
 */
export function uploadFileResponse(response) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    isUploading: false,
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
export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_FAILURE,
    isUploading: false,
    error
  }
}
