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
 * @export
 * @param {string} token 
 * @returns 
 */
export default function getUserdetails(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return async (dispatch) => {
    dispatch(getuserdetailsRequest());

    const response = await fetch('/api/v2/users/' + userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getuserdetailsReponse(jsonResponse.userDetails)) :
      dispatch(getuserdetailsError(jsonResponse.message))
  };
}
