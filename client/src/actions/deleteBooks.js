import axios from 'axios';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { deletebookError, deletebookRequest, deletebookResponse } from '../../actions/deleteBooks';

/**
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */
export function deleteBook(bookData, token) {
  return async (dispatch) => {
    dispatch(deletebookRequest(bookData));
    const response = await fetch('/api/v2/books/' + bookData, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      }
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 204 ?
      dispatch(deletebookResponse('book has been deleted')) :
      dispatch(deletebookError(jsonResponse.message))
  }
}
