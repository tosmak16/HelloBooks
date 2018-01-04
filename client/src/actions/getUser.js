import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import {
  getUserError,
  getUserReponse,
  getUserRequest
} from '../../actions/getUser';

/**
 * @export getUser
 * @description it sends request to get user's details
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export default function getUser(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return async (dispatch) => {
    dispatch(getUserRequest());

    const response = await fetch('/api/v2/users/' + userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token,
      },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getUserReponse(jsonResponse.userDetails)) :
      dispatch(getUserError(jsonResponse.message))
  };
}
