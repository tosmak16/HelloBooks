import jwtDecode from 'jwt-decode';
import axios from 'axios';
import 'whatwg-fetch'
import { borrowBookError, borrowBookRequest, borrowBookResponse } from '../../actions/borrowBook';

/**
 * @description this is borrow books action controller
 * @export borrowBooks
 * @param {string} token 
 * @param {string} bookId 
 * @returns {action} dispacted actions
 */
export const borrowBooks = (token, bookId) => {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(borrowBookRequest(bookId));
    const response = await fetch('/api/v2/users/' + userId + '/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify({ bookId: bookId, token })
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(borrowBookResponse(jsonResponse.message)) :
      dispatch(borrowBookError(jsonResponse.message))
  }
}
export default borrowBooks;
