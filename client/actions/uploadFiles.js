//Action types
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'


//Action creators
export function uploadFileRequest(fileData) {
  return {
    type: UPLOAD_FILE_REQUEST,
    isUploading: true,
    fileData
  }
}

export function uploadFileResponse(response) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    isUploading: false,
    response
  }
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_FAILURE,
    isUploading: false,
    error
  }
}
