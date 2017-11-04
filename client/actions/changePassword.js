//Action types
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'


//Action creators
/**
 * 
 * 
 * @export
 * @param {any} userData 
 * @returns 
 */
export function changepasswordRequest(userData) {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    isSending: true,
    userData
  }
}
/**
 * 
 * 
 * @export
 * @param {any} response 
 * @returns 
 */
export function changepasswordResponse(response) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    isSending: false,
    response
  }
}
/**
 * 
 * 
 * @export
 * @param {any} error 
 * @returns 
 */
export function changepasswordError(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    isSending: false,
    error
  }
}
