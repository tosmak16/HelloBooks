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
  return async (dispatch) => {
    dispatch(getbooksRequest());
    const response = await fetch('/api/v2/books', {
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
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getbooksReponse(jsonResponse.books)) :
      dispatch(getbooksError(jsonResponse.message))
  };
}
