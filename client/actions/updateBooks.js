//Action types
export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST'
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS'
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE'


//Action creators
export function updatebookRequest(bookData) {
  return {
    type: UPDATE_BOOK_REQUEST,
    isUpdating: true,
    bookData
  }
}

export function updatebookResponse(response) {
  return {
    type: UPDATE_BOOK_SUCCESS,
    isUpdating: false,
    response
  }
}

export function updatebookError(error) {
  return {
    type: UPDATE_BOOK_FAILURE,
    isUpdating: false,
    error
  }
}
