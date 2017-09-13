import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { updatebookError, updatebookRequest, updatebookResponse } from '../../actions/updateBooks';



export function updateBook(bookData) {
  console.log(bookData.bookId);
  return (dispatch) => {
    dispatch(updatebookRequest(bookData));
    axios.put('/api/v2/books/' + bookData.bookId, bookData).then(
      (res) => {
        dispatch(updatebookResponse(res.data.message));

      }
    ).catch(error => {
      dispatch(updatebookError(error.response.data));
    });
  }

}
