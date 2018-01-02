import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';


import { uploadImage } from './uploadImage';
import { returnbookError, returnbookRequest, returnbookResponse } from '../../actions/returnBook';


/**
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */
export default function returnbook(bookData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return async (dispatch) => {
    dispatch(returnbookRequest(bookData));
    const response = await fetch('/api/v2/users/' + userId + '/books', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(bookData)
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(returnbookResponse(jsonResponse.message)) :
      dispatch(returnbookError(jsonResponse.message))
  }
}
