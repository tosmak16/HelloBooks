import axios from 'axios';
import {
  browserHistory
} from 'react-router';
import jwtDecode from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';


import {
  getunreturnedbooksError,
  getunreturnedbooksRequest,
  getunreturnedbooksReponse
} from '../../actions/getunreturnedBooks';

/**
 * 
 * 
 * @export
 * @param {any} token 
 * @returns 
 */
export default function getunreturnedBooks(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return (dispatch) => {
    dispatch(getunreturnedbooksRequest());
    return fetch('/api/v2/users/' + userId + '/books?returned=false', {
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
            dispatch(getunreturnedbooksError(response.message))
          })
        }
        else {
          res.json().then((response) => {
            dispatch(getunreturnedbooksReponse(response.unreturnedBook));
          }).catch((error) => error);
        }
      })
  };
}
