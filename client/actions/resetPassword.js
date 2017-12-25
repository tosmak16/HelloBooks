//Action types
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'


//Action creators
export const resetPasswordRequest = (data) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    isSending: true,
    data
  }
}

export const resetPasswordResponse = (response) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    isSending: false,
    response
  }
}

export const resetPasswordError = (error) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    isSending: false,
    error
  }
}
