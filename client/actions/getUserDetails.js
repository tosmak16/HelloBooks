export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE';


export function getuserdetailsRequest() {
  return {
    type: GET_USER_DETAILS_REQUEST,
    isFetching: true,
  }
}

export function getuserdetailsReponse(data) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    isFetching: false,
    data,
  }
}

export function getuserdetailsError(error) {
  return {
    type: GET_USER_DETAILS_FAILURE,
    isFetching: false,
    error,
  }
}
