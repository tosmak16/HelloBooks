import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { updatebookError, updatebookRequest, updatebookResponse } from '../../actions/updateBooks';

/**
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */

export function updateBook(bookData, token) {
  return async (dispatch) => {
    dispatch(updatebookRequest(bookData));

    const response = await fetch('/api/v2/books/' + bookData.bookId, {
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
      dispatch(updatebookResponse(jsonResponse.message)) :
      dispatch(updatebookError(jsonResponse.message))
  }
}
