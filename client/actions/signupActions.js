//Action types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'


//Action creators
/**
 * @param {object} userData 
 * 
 * @returns {object} of signup state
 */
export const signupRequest = (userData) => {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isRegistered: false,
    userData
  }
}
/**
 * @param {string} resposne 
 * 
 * @returns {object} of signup state
 */
export const signupResponse = (response) => {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isRegistered: true,
    response
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of signup state
 */
export const signupError = (error) => {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isRegistered: false,
    error
  }
}
