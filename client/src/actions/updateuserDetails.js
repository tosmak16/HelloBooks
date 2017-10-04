import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { uploadImage } from './uploadImage';
import { updateuserError, updateuserRequest, updateuserResponse } from '../../actions/updateUser';



export default function updateUser(userData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(updateuserRequest(userData));

    return fetch('http://localhost:8000/api/v2/users/' + userId, {
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
          dispatch(updateuserResponse(response.message));
        }
      })
      .catch(error => {
        dispatch(uupdateuserError(error));
      });
  }

}
