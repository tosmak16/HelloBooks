//Action types
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

//Action creators
/**
 * @param {object} data 
 * @returns {object} of update users state
 */
export const updateUserRequest = (data) => {
  return {
    type: UPDATE_USER_REQUEST,
    isUpdating: true,
    data
  }
}
/**
 * @param {string} response 
 * @returns {object} of update users state
 */
export const updateUserResponse = (response) => {
  return {
    type: UPDATE_USER_SUCCESS,
    isUpdating: false,
    response
  }
}
/**
 * @param {string} error 
 * @returns {object} of update users state
 */
export const updateUserError = (error) => {
  return {
    type: UPDATE_USER_FAILURE,
    isUpdating: false,
    error
  }
}
