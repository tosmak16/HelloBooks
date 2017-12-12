import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { uploadbookError, uploadbookRequest, uploadbookResponse } from '../../actions/uploadBooks';


/** 
 * @export
 * @param {object} bookData 
 * @param {string} token 
 * @returns 
 */
export function uploadBook(bookData, token) {
  return (dispatch) => {
    dispatch(uploadbookRequest(bookData));
    return fetch('/api/v2/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(bookData)
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(uploadbookError(response.message));
          })
        } else {
          res.json().then(() => {
            dispatch(uploadbookResponse(response.message));
          })
        }
      })
  }
}
