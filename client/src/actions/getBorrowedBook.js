import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import 'whatwg-fetch'


import {
  getBorrowedBookError,
  getBorrowedBookRequest,
  getBorrowedBookReponse
} from '../../actions/getBorrowedBook';

/**
 * @export getBorrowedBook
 * 
 * @description it sends  get borrowedbooks request
 * 
 * @param {string} token 
 * 
 * @returns {action} dispacted actions
 */
export default function getBorrowedBook(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(getBorrowedBookRequest());
    const response = await fetch('/api/v2/user/' + userId + '/books', {
      method: 'GET',
      body: { token },
      headers: { token },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getBorrowedBookReponse(jsonResponse.borrowBooks)) :
      dispatch(getBorrowedBookError(jsonResponse.message))
  };
}
