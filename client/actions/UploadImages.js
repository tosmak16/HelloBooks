//Action types
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'


//Action creators
export function uploadimageRequest(imageData) {
  return {
    type: UPLOAD_IMAGE_REQUEST,
    isUploading: true,
    imageData
  }
}

export function uploadimageResponse(response) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    isUploading: false,
    response
  }
}

export function uploadimageError(error) {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    isUploading: false,
    error
  }
}
