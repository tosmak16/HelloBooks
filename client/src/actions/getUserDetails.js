import axios from 'axios';
import {
  browserHistory
} from 'react-router';
import jwtDecode from 'jwt-decode';

import {
  getuserdetailsError,
  getuserdetailsReponse,
  getuserdetailsRequest
} from '../../actions/getUserDetails';

/**
 * 
 * 
 * @export
 * @param {any} token 
 * @returns 
 */
export default function getUserdetails(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(getuserdetailsRequest());

    return fetch('/api/v2/users/' + userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(getuserdetailsError(response.message))
          })
        } else {
          res.json().then((response) => {
            dispatch(getuserdetailsReponse(response.userDetails));
          })
        }
      })
  };
}
