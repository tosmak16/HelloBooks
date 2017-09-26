export const GET_BORROWED_BOOKS_REQUEST = 'GET_BORROWED_BOOKS_REQUEST';
export const GET_BORROWED_BOOKS_SUCCESS = 'GET_BORROWED_BOOKS_SUCCESS';
export const GET_BORROWED_BOOKS_FAILURE = 'GET_BORROWED_BOOKS_FAILURE';


export function getborrowedbooksRequest() {
  return {
    type: GET_BORROWED_BOOKS_REQUEST,
    isFetching: true,
    isFetched: false,
  }
}

export function getborrowedbooksReponse(data) {
  return {
    type: GET_BORROWED_BOOKS_SUCCESS,
    isFetching: false,
    isFetched: true,
    data,
  }
}

export function getborrowedbooksError(error) {
  return {
    type: GET_BORROWED_BOOKS_FAILURE,
    isFetching: false,
    isFetched: false,
    error,
  }
}

