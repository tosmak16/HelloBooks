import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';
import {
  getUnreturnedBookError,
  getUnreturnedBookRequest,
  getUnreturnedBookReponse
} from '../../actions/getUnreturnedBook';

/**
 * @export getUnreturnedBook
 * @description it sends request to get unreturned books 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export default function getUnreturnedBook(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(getUnreturnedBookRequest());
    const response = await fetch('/api/v2/users/' + userId + '/books?returned=false', {
      method: 'GET',
      body: { token },
      headers: { token },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getUnreturnedBookReponse(jsonResponse.unreturnedBook)) :
      dispatch(getUnreturnedBookError(jsonResponse.message))
  };
}
