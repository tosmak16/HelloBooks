//Action types
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'


//Action creators
/**
 * @param {object} userData 
 * 
 * @returns {object} of change password state
 */
export const changePasswordRequest = (userData) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    isSending: true,
    userData
  }
}
/**
 * @param {string} response 
 * 
 * @returns {object} of change password state
 */
export const changePasswordResponse = (response) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    isSending: false,
    response
  }
}
/**
 * @param {string} error 
 * 
 * @returns {object} of change password state
 */
export const changePasswordError = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    isSending: false,
    error
  }
}
