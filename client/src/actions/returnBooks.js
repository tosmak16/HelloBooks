import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import { uploadImage } from './uploadImage';
import { returnbookError, returnbookRequest, returnbookResponse } from '../../actions/returnBook';



export default function returnbook(bookData) {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;
  console.log(bookData.bookId);
  return (dispatch) => {
    dispatch(returnbookRequest(bookData));
    axios.put('/api/v2/users/' + userId + '/books', bookData).then(
      (res) => {
        dispatch(returnbookResponse(res.data.message));

      }
    ).catch(error => {
      dispatch(returnbookError(error.response.data));
    });
  }

}
