import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';


import { uploadImage } from './uploadImage';
import { returnbookError, returnbookRequest, returnbookResponse } from '../../actions/returnBook';


/**
 * 
 * 
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */
export default function returnbook(bookData, token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;

  return (dispatch) => {
    dispatch(returnbookRequest(bookData));

    return fetch('/api/v2/users/' + userId + '/books', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(bookData)
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {
          throw response.message
        }
        else if (response.status === 200) {
          dispatch(returnbookResponse(response.message));
        }
      })
      .catch(error => {
        dispatch(returnbookError(error));
      });

  }

}
