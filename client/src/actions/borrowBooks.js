import jwtDecode from 'jwt-decode';
import axios from 'axios';
import 'whatwg-fetch'


import { borrowBookError, borrowBookRequest, borrowBookResponse } from '../../actions/borrowBook';
import { popMessage } from '../../actions/popMessages';


/**
 * 
 * @description this is borrow books action controller
 * @export
 * @param {any} token 
 * @param {any} bookId 
 * @returns response with no error if request is successful
 * @returns error if request is not succcesful
 */
export default function borrowBooks(token, bookId) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(borrowBookRequest(bookId));
    return fetch('/api/v2/users/' + userId + '/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify({ bookId: bookId, token: token })
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(borrowBookError(response.message));
          })
        } else {
          res.json().then((response) => {
            dispatch(borrowBookResponse(response.message));
          })
        }
      })
  }
}
