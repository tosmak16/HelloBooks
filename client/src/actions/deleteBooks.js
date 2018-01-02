import axios from 'axios';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { deletebookError, deletebookRequest, deletebookResponse } from '../../actions/deleteBooks';

/**
 * @export deleteBook
 * @description sends delete books request and dispatch appropiate based on 
 * the recieved response
 * @param {object} bookData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export const deleteBook = (bookData, token) => {
  return async (dispatch) => {
    dispatch(deletebookRequest(bookData));
    const response = await fetch('/api/v2/books/' + bookData, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token
      }
    })
    if (response.status >= 400) {
      const jsonResponse = await response.json().then(jsonRes => jsonRes)
      dispatch(deletebookError(jsonResponse.message));
    }
    else {
      dispatch(deletebookResponse('book has been deleted'));
    }
  }
}
export default deleteBook;
