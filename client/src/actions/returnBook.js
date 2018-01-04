import jwtDecode from 'jwt-decode';
import { uploadImage } from './uploadImage';
import { returnBookError, returnBookRequest, returnBookResponse } from '../../actions/returnBook';
/**
 * @export returnBook
 * @description it dispatches actions for return book request and response 
 * @param {object} bookData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export default function returnBook(bookData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return async (dispatch) => {
    dispatch(returnBookRequest(bookData));
    const response = await fetch('/api/v2/users/' + userId + '/books', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(bookData)
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(returnBookResponse(jsonResponse.message)) :
      dispatch(returnBookError(jsonResponse.message))
  }
}
