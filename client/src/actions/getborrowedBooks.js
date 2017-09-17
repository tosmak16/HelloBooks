import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';


import { getborrowedbooksError, getborrowedbooksRequest, getborrowedbooksReponse } from '../../actions/getborrowedBooks';


export default function getborrowedBooks() {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;
  return (dispatch) => {
    dispatch(getborrowedbooksRequest());
    axios
      .get('/api/v2/user/' + userId + '/books')
      .then(
      (res) => {

        dispatch(getborrowedbooksReponse(res.data.result));
      }
      ).catch(error => {

        // dispatch(getborrowedbooksError(error.response.data))
      });
  };
}
