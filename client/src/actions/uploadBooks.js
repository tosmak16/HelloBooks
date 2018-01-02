import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { uploadbookError, uploadbookRequest, uploadbookResponse } from '../../actions/uploadBooks';

/** 
 * @export uploadBook
 * @description it dispatches actions for upload books request and response
 * @param {object} bookData 
 * @param {string} token 
 * @returns {action} dispacted actions
 */
export const uploadBook = (bookData, token) => {
  return async (dispatch) => {
    dispatch(uploadbookRequest(bookData));
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
    response.status === 200 ?
      dispatch(uploadbookResponse(jsonResponse.message)) :
      dispatch(uploadbookError(jsonResponse.message))
  }
}
export default uploadBook;
