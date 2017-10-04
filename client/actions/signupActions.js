//Action types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'


//Action creators
export const signupRequest = (userData) => {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isRegistered: false,
    userData
  }
}

export const signupResponse = (response) => {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isRegistered: true,
    response
  }
}

export const signupError = (error) => {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isRegistered: false,
    error
  }
}
