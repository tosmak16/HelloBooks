import jwtDecode from 'jwt-decode';
import axios from 'axios';


import { borrowBookError, borrowBookRequest, borrowBookResponse } from '../../actions/borrowBook';
import { popMessage } from '../../actions/popMessages';


// const token = res.data.token;
// localStorage.setItem('jwtToken', token);
// setAuthToken(token);

// const x = jwtDecode(token);


export default function borrowBooks(token, bookId) {

  console.log('token: ' + token + ' bookId: ' + bookId);

  let decodedToken = jwtDecode(token);
  console.log(decodedToken);
  let userId = decodedToken.id;
  console.log(userId);

  return (dispatch) => {
    dispatch(borrowBookRequest(bookId));
    axios
      .post('/api/v2/users/' + userId + '/books', { bookId: bookId })
      .then(res => {
        console.log(res.data);
        dispatch(borrowBookResponse(res.data.message));
      })
      .catch(error => {
        dispatch(borrowBookError(error.response.data));
        console.log(error.response.data);
      })
  }

}
