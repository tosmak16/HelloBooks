import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { changepasswordError, changepasswordRequest, changepasswordResponse } from '../../actions/changePassword';
import { validatePasswordChange } from '../helperFunctions/validatePasswordChange';
/**
 * @export
 * @param {object} userData 
 * @param {string} token 
 * @returns 
 */
export default function changePassword(userData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(changepasswordRequest(userData));
    const validationResponse = await validatePasswordChange(userData);
    if (validationResponse !== '') {
      dispatch(changepasswordError(validationResponse));
    }
    else {
      const response = await fetch('/api/v2/users/' + userId + '/password', {
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
        dispatch(changepasswordResponse(jsonResponse.message)) :
        dispatch(changepasswordError(jsonResponse.message))
    }
  }
}
