//Action types
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'


//Action creators
export function updateuserRequest(userData) {
  return {
    type: UPDATE_USER_REQUEST,
    isUpdating: true,
    userData
  }
}

export function updateuserResponse(response) {
  return {
    type: UPDATE_USER_SUCCESS,
    isUpdating: false,
    response
  }
}

export function updateuserError(error) {
  return {
    type: UPDATE_USER_FAILURE,
    isUpdating: false,
    error
  }
}
