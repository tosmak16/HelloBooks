import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';
import {
  getunreturnedbooksError,
  getunreturnedbooksRequest,
  getunreturnedbooksReponse
} from '../../actions/getunreturnedBooks';

/**
 * @export getunreturnedBooks
 * @description it sends request to get unreturned books 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export default function getunreturnedBooks(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(getunreturnedbooksRequest());
    const response = await fetch('/api/v2/users/' + userId + '/books?returned=false', {
      method: 'GET',
      body: { token },
      headers: { token },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getunreturnedbooksReponse(jsonResponse.unreturnedBook)) :
      dispatch(getunreturnedbooksError(jsonResponse.message))
  };
}
