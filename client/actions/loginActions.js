//Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

//Action creators
/**
 * @param {object} userData 
 * @returns {object} of login state
 */
export const loginRequest = (userData) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    userData
  }
}
/**
 * @param {string} response 
 * @returns {object} of login state
 */
export const loginResponse = (response) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    response
  }
}
/**
 * @param {string} error 
 * @returns {object} of login state
 */
export const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}
