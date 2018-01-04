import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { deleteBookError, deleteBookRequest, deleteBookResponse } from '../../actions/deleteBook';

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
    dispatch(deleteBookRequest(bookData));
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
      dispatch(deleteBookError(jsonResponse.message));
    }
    else {
      dispatch(deleteBookResponse('book has been deleted'));
    }
  }
}
export default deleteBook;
