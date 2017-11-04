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

    return fetch('http://localhost:8000/api/v2/users/' + userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          token: token
        },
      })
      .then(
        (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {
          throw response.message
        } else if (response.status === 200) {
          dispatch(getuserdetailsReponse(response.userDetails));
        }
      })
      .catch(error => {
        dispatch(getuserdetailsError(error))
      });

  };
}
