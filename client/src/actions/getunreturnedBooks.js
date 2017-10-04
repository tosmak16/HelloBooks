import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';


import { getunreturnedbooksError, getunreturnedbooksRequest, getunreturnedbooksReponse } from '../../actions/getunreturnedBooks';


export default function getunreturnedBooks(token) {
  let decodedToken = jwtDecode(token);
  let userId = decodedToken.id;
  return (dispatch) => {
    dispatch(getunreturnedbooksRequest());
    return fetch('http://localhost:8000/api/v2/users/' + userId + '/books?returned=false', {
      method: 'GET',
      body: { token: token },
      headers: { token: token },
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {
          if (!isEmpty(response.message)) {
            throw response.message
          }
        }
        else if (response.status === 200) {
          dispatch(getunreturnedbooksReponse(response.result));
        }
        else {
          if (!isEmpty(response)) {
            throw response
          }
        }
      }).catch(error => {
        if (!isEmpty(error)) {
          dispatch(getunreturnedbooksError(error))
        }
      });

  };
}
