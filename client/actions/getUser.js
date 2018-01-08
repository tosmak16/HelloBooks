export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE';

/**
 * @returns {object} of user state
 */
export const getUserRequest = () => {
  return {
    type: GET_USER_DETAILS_REQUEST,
    isFetching: true,
  }
}
/**
 * @param {object} data 
 * 
 * @returns {object} of user state
 */
export const getUserReponse = (data) => {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    isFetching: false,
    data,
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of user state
 */
export const getUserError = (error) => {
  return {
    type: GET_USER_DETAILS_FAILURE,
    isFetching: false,
    error,
  }
}

