import axios from 'axios';
import {
  browserHistory
} from 'react-router';
import jwtDecode from 'jwt-decode';
import 'whatwg-fetch'


import {
  getborrowedbooksError,
  getborrowedbooksRequest,
  getborrowedbooksReponse
} from '../../actions/getborrowedBooks';

/**
 * 
 * 
 * @export
 * @param {any} token 
 * @returns 
 */
export default function getborrowedBooks(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(getborrowedbooksRequest());

    const response = await fetch('/api/v2/user/' + userId + '/books', {
      method: 'GET',
      body: {
        token: token
      },
      headers: {
        token: token
      },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getborrowedbooksReponse(jsonResponse.borrowBooks)) :
      dispatch(getborrowedbooksError(jsonResponse.message))
  };
}
