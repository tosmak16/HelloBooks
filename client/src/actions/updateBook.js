import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { updateBookError, updateBookRequest, updateBookResponse } from '../../actions/updateBook';

/**
 * @export updateBook
 * @description it dispatch actions for updateBooks request and response
 * @param {object} bookData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export const updateBook = (bookData, token) => {
  return async (dispatch) => {
    dispatch(updateBookRequest(bookData));
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
      dispatch(updateBookResponse(jsonResponse.message)) :
      dispatch(updateBookError(jsonResponse.message))
  }
}
export default updateBook;
