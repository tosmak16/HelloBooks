import axios from 'axios';
import { browserHistory } from 'react-router';
import { deletebookError, deletebookRequest, deletebookResponse } from '../../actions/deleteBooks';




export function deleteBook(bookData) {
  return (dispatch) => {
    dispatch(deletebookRequest(bookData));
    axios.delete('/api/v2/books/' + bookData).then(
      (res) => {
        dispatch(deletebookResponse('book has been deleted'));

      }
    ).catch(error => {
      dispatch(deletebookError(error.response.data));
    });
  }

}
