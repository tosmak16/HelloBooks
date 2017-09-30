import axios from 'axios';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'

import { getbooksError, getbooksRequest, getbooksReponse } from '../../actions/getBooks';


export default function getbooks(set) {
  const token = window.localStorage.jwtToken;
  return (dispatch) => {
    dispatch(getbooksRequest());
    return fetch('http://localhost:8000/api/v2/books', {
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
          dispatch(getbooksReponse(response.result));
          if (!set) { browserHistory.push('/books'); }
          else if (set) {
          }
        }
      })
      .catch(
      error => {
        dispatch(getbooksError(error))
      }
      )

    // return axios
    //   .get('/api/v2/books')
    //   .then(
    //   (res) => {
    //     dispatch(getbooksReponse(res.data.result));
    //     if (!set) { browserHistory.push('/books'); }
    //     else if (set) {

    //     }
    //   }
    //   ).catch(error => {
    //     dispatch(getbooksError(error.response.data))
    //   });
  };
}
