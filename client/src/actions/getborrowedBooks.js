import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import 'whatwg-fetch'


import { getborrowedbooksError, getborrowedbooksRequest, getborrowedbooksReponse } from '../../actions/getborrowedBooks';


export default function getborrowedBooks(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return (dispatch) => {
    dispatch(getborrowedbooksRequest());

    return fetch('http://localhost:8000/api/v2/user/' + userId + '/books', {
      method: 'GET',
      body: { token: token },
      headers: { token: token },
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {

          throw response.message
        }
        else if (response.status === 200) {
          dispatch(getborrowedbooksReponse(response.result));
        }
      }).catch(error => {

        dispatch(getborrowedbooksError(error))
      });

  };
}
