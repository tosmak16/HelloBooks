import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { uploadImage } from './uploadImage';
import { updateuserError, updateuserRequest, updateuserResponse } from '../../actions/updateUser';


/**
 * @export
 * @param {any} userData 
 * @param {any} token 
 * @returns 
 */
export default function updateUser(userData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(updateuserRequest(userData));

    return fetch('/api/v2/users/' + userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(userData)
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(updateuserError(response.message));
          })
        } else {
          res.json().then((response) => {
            dispatch(updateuserResponse(response.message));
          })
        }
      }
      )
  }
}
