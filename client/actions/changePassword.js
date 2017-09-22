//Action types
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'


//Action creators
export function changepasswordRequest(userData) {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    isSending: true,
    userData
  }
}

export function changepasswordResponse(response) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    isSending: false,
    response
  }
}

export function changepasswordError(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    isSending: false,
    error
  }
}
