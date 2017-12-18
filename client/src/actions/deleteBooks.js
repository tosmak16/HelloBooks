import axios from 'axios';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { deletebookError, deletebookRequest, deletebookResponse } from '../../actions/deleteBooks';



/**
 * 
 * 
 * @export
 * @param {any} bookData 
 * @param {any} token 
 * @returns 
 */
export function deleteBook(bookData, token) {
  return (dispatch) => {
    dispatch(deletebookRequest(bookData));
    return fetch('/api/v2/books/' + bookData, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      }
    })
      .then(
      (res) => {
        if (res.status === 204) {
          dispatch(deletebookResponse('book has been deleted'));
        }
        else if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(deletebookError(response.message));
          })
        }
      })
  }

}
