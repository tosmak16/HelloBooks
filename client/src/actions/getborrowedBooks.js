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
  return (dispatch) => {
    dispatch(getborrowedbooksRequest());

    return fetch('/api/v2/user/' + userId + '/books', {
      method: 'GET',
      body: {
        token: token
      },
      headers: {
        token: token
      },
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(getborrowedbooksError(response.message))
          })
        } else {
          res.json().then((response) => {
            dispatch(getborrowedbooksReponse(response.borrowBooks));
          })
        }
      })
  };
}
