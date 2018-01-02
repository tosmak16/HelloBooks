import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { uploadImage } from './uploadImage';
import { updateuserError, updateuserRequest, updateuserResponse } from '../../actions/updateUser';
/**
 * @export updateuserDetails
 * @description it dispatches action for update user details reuest and response
 * @param {object} userData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export default function updateuserDetails(userData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(updateuserRequest(userData));
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
      dispatch(updateuserResponse(jsonResponse.message)) :
      dispatch(updateuserError(jsonResponse.message))
  }
}
