import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { uploadImage } from './uploadImage';
import { updateUserError, updateUserRequest, updateUserResponse } from '../../actions/updateUser';
/**
 * @export updateUser
 * @description it dispatches action for update user details reuest and response
 * @param {object} userData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export default function updateUser(userData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(updateUserRequest(userData));
    const response = await fetch('/api/v2/users/' + userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(userData)
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(updateUserResponse(jsonResponse.message)) :
      dispatch(updateUserError(jsonResponse.message))
  }
}
