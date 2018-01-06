import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { uploadBookError, uploadBookRequest, uploadBookResponse } from '../../actions/uploadBooks';

/** 
 * @export uploadBook
 * @description it dispatches actions for upload books request and response
 * @param {object} bookData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export const uploadBook = (bookData, token) => {
  return async (dispatch) => {
    dispatch(uploadBookRequest(bookData));
    const response = await fetch('/api/v2/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(bookData)
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 201 ?
      dispatch(uploadBookResponse(jsonResponse.message)) :
      dispatch(uploadBookError(jsonResponse.message))
  }
}
export default uploadBook;
