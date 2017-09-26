//Action types
export const RETURN_BOOK_REQUEST = 'RETURN_BOOK_REQUEST'
export const RETURN_BOOK_SUCCESS = 'RETURN_BOOK_SUCCESS'
export const RETURN_BOOK_FAILURE = 'RETURN_BOOK_FAILURE'


//Action creators
export function returnbookRequest(bookData) {
  return {
    type: RETURN_BOOK_REQUEST,
    isReturning: true,
    bookData
  }
}

export function returnbookResponse(response) {
  return {
    type: RETURN_BOOK_SUCCESS,
    isReturning: false,
    response
  }
}

export function returnbookError(error) {
  return {
    type: RETURN_BOOK_FAILURE,
    isReturning: false,
    error
  }
}
