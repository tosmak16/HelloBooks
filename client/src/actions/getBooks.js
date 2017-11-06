import axios from 'axios';
import {
  browserHistory
} from 'react-router';
import 'whatwg-fetch'

import {
  getbooksError,
  getbooksRequest,
  getbooksReponse
} from '../../actions/getBooks';

/**
 * 
 * 
 * @export
 * @param {any} set 
 * @returns 
 */
export default function getbooks(set) {
  const token = window.localStorage.jwtToken;
  return (dispatch) => {
    dispatch(getbooksRequest());
    return fetch('/api/v2/books', {
      method: 'GET',
      body: {
        token: token
      },
      headers: {
        token: token
      },
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {

          throw response.message
        } else if (response.status === 200) {
          dispatch(getbooksReponse(response.books));
          if (!set) {
            browserHistory.push('/books');
          } else if (set) { }
        }
      })
      .catch(
      error => {
        dispatch(getbooksError(error))
      }
      )
  };
}
