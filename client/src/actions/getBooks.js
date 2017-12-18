import axios from 'axios';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { getbooksError, getbooksRequest, getbooksReponse } from '../../actions/getBooks';

/**
 * @export
 * @param {boolean} set 
 * @returns {object} response
 */
export default function getbooks(set) {
  const token = window.localStorage.jwtToken;
  return (dispatch) => {
    dispatch(getbooksRequest());
    return fetch('/api/v2/books', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: {
        token: token
      },
      headers: {
        token: token
      },
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(getbooksError(response.message))
          })
        } else {
          res.json().then((response) => {
            dispatch(getbooksReponse(response.books));
            if (!set) {
              browserHistory.push('/books');
            } else if (set) { }
          })
        }
      }
      )
  };
}
