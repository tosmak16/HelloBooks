//Action types
export const UPLOAD_BOOK_REQUEST = 'UPLOAD_BOOK_REQUEST'
export const UPLOAD_BOOK_SUCCESS = 'UPLOAD_BOOK_SUCCESS'
export const UPLOAD_BOOK_FAILURE = 'UPLOAD_BOOK_FAILURE'


//Action creators
export function uploadbookRequest(bookData) {
  return {
    type: UPLOAD_BOOK_REQUEST,
    isUploading: true,
    bookData
  }
}

export function uploadbookResponse(response) {
  return {
    type: UPLOAD_BOOK_SUCCESS,
    isUploading: false,
    response
  }
}

export function uploadbookError(error) {
  return {
    type: UPLOAD_BOOK_FAILURE,
    isUploading: false,
    error
  }
}
