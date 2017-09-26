import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';


import { getunreturnedbooksError, getunreturnedbooksRequest, getunreturnedbooksReponse } from '../../actions/getunreturnedBooks';


export default function getunreturnedBooks() {
  let decodedToken = jwtDecode(localStorage.jwtToken);
  let userId = decodedToken.id;
 // let returned = false;
  return (dispatch) => {
    dispatch(getunreturnedbooksRequest());
    axios
      .get('/api/v2/users/' + userId + '/books?returned=false')
      .then(
      (res) => {

        dispatch(getunreturnedbooksReponse(res.data.result));
      }
      ).catch(error => {

        // dispatch(getunreturnedbooksError(error.response.data))
      });
  };
}
