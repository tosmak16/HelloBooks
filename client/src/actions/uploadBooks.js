import axios from 'axios';
import { browserHistory } from 'react-router';
import { uploadImage } from './uploadImage';
import { uploadbookError, uploadbookRequest, uploadbookResponse } from '../../actions/uploadBooks';



export function uploadBook(bookData) {
  return (dispatch) => {
    dispatch(uploadbookRequest(bookData));
    axios.post('/api/v2/books', bookData).then(
      (res) => {
        dispatch(uploadbookResponse(res.data.message));

      }
    ).catch(error => {
      dispatch(uploadbookError(error.response.data));
    });
  }

}
