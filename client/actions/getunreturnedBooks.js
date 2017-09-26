export const GET_UNRETURNED_BOOKS_REQUEST = 'GET_UNRETURNED_BOOKS_REQUEST';
export const GET_UNRETURNED_BOOKS_SUCCESS = 'GET_UNRETURNED_BOOKS_SUCCESS';
export const GET_UNRETURNED_BOOKS_FAILURE = 'GET_UNRETURNED_BOOKS_FAILURE';


export function getunreturnedbooksRequest() {
  return {
    type: GET_UNRETURNED_BOOKS_REQUEST,
    isFetching: true,
    isFetched: false,
  }
}

export function getunreturnedbooksReponse(data) {
  return {
    type: GET_UNRETURNED_BOOKS_SUCCESS,
    isFetching: false,
    isFetched: true,
    data,
  }
}

export function getunreturnedbooksError(error) {
  return {
    type: GET_UNRETURNED_BOOKS_FAILURE,
    isFetching: false,
    isFetched: false,
    error,
  }
}

