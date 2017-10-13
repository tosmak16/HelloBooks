import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { updatebookError, updatebookRequest, updatebookResponse } from '../../actions/updateBooks';



export function updateBook(bookData, token) {
  return (dispatch) => {
    dispatch(updatebookRequest(bookData));

    console.log(bookData);

    return fetch('http://localhost:8000/api/v2/books/' + bookData.bookId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(bookData)
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {
          throw response.message
        }
        else if (response.status === 200) {
          dispatch(updatebookResponse(response.message));
        }
      })
      .catch(error => {
        dispatch(updatebookError(error));
      });
  }

}
