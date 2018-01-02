import axios from 'axios';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { getbooksError, getbooksRequest, getbooksReponse } from '../../actions/getBooks';

/**
 * @export getbooks
 * @description it sends get books request
 * @param {boolean} set 
 * @returns {action} dispacted actions
 */
export const getbooks = (set) => {
  const token = window.localStorage.jwtToken;
  return async (dispatch) => {
    dispatch(getbooksRequest());
    const response = await fetch('/api/v2/books', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: { token },
      headers: { token },
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    response.status === 200 ?
      dispatch(getbooksReponse(jsonResponse.books)) :
      dispatch(getbooksError(jsonResponse.message))
  };
}
export default getbooks
