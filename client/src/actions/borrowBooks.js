import jwtDecode from 'jwt-decode';
import axios from 'axios';
import 'whatwg-fetch'


import { borrowBookError, borrowBookRequest, borrowBookResponse } from '../../actions/borrowBook';
import { popMessage } from '../../actions/popMessages';



export default function borrowBooks(token, bookId) {

  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(borrowBookRequest(bookId));
    return fetch('http://localhost:8000/api/v2/users/' + userId + '/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify({ bookId: bookId, token: token })
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          dispatch(borrowBookResponse(response.message));
        }
        else if (response.status >= 400) {
          throw response.message
        }
      })
      .catch(error => {
        dispatch(borrowBookError(error));
      })
  }

}
