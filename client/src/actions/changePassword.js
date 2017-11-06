import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { changepasswordError, changepasswordRequest, changepasswordResponse } from '../../actions/changePassword';


/**
 * 
 * 
 * @export
 * @param {any} userData 
 * @param {any} token 
 * @returns 
 */
export default function changePassword(userData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return (dispatch) => {
    dispatch(changepasswordRequest(userData));

    return fetch('/api/v2/users/' + userId + '/password', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(userData)
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {
          throw response.message
        }
        else if (response.status === 200) {
          dispatch(changepasswordResponse(response.message));
        }
      })
      .catch(error => {
        dispatch(changepasswordError(error))
      });

  }

}
