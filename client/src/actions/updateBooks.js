import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { updatebookError, updatebookRequest, updatebookResponse } from '../../actions/updateBooks';

/**
 * 
 * 
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */

export function updateBook(bookData, token) {
  return (dispatch) => {
    dispatch(updatebookRequest(bookData));

    return fetch('/api/v2/books/' + bookData.bookId, {
      method: 'PUT',
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
            dispatch(updatebookError(response.message));
          })
        } else {
          res.json().then((response) => {
            dispatch(updatebookResponse(response.message));
          })
        }
      })
  }
}
