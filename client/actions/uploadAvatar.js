//Action types
export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST'
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS'
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE'


//Action creators
export function uploadProfileImageRequest(data) {
  return {
    type: UPLOAD_AVATAR_REQUEST,
    isUploading: true,
    data
  }
}

export function uploadProfileImageResponse(response) {
  return {
    type: UPLOAD_AVATAR_SUCCESS,
    isUploading: false,
    response
  }
}

export function uploadProfileImageError(error) {
  return {
    type: UPLOAD_AVATAR_FAILURE,
    isUploading: false,
    error
  }
}
