import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { uploadbookError, uploadbookRequest, uploadbookResponse } from '../../actions/uploadBooks';


/**
 * 
 * 
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */
export function uploadBook(bookData, token) {
  return (dispatch) => {
    dispatch(uploadbookRequest(bookData));

    return fetch('http://localhost:8000/api/v2/books', {
      method: 'POST',
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
        else if (response.status === 201) {
          dispatch(uploadbookResponse(response.message));
        }
      })
      .catch(error => {
        dispatch(uploadbookError(error));
      });

  }

}
