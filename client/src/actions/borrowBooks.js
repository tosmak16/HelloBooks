import jwtDecode from 'jwt-decode';
import axios from 'axios';


import { borrowBookError, borrowBookRequest, borrowBookResponse } from '../../actions/borrowBook';
import { popMessage } from '../../actions/popMessages';


// const token = res.data.token;
// localStorage.setItem('jwtToken', token);
// setAuthToken(token);

// const x = jwtDecode(token);


export default function borrowBooks(token, bookId) {

  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;


  return (dispatch) => {
    dispatch(borrowBookRequest(bookId));
    axios
      .post('/api/v2/users/' + userId + '/books', { bookId: bookId })
      .then(res => {
        dispatch(borrowBookResponse(res.data.message));
      })
      .catch(error => {
        dispatch(borrowBookError(error.response.data));
      })
  }

}
