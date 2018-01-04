import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { getBooksError, getBooksRequest, getBooksReponse } from '../../actions/getBooks';

/**
 * @export getBooks
 * @description it sends get books request
 * @param {boolean} set 
 * @returns {action} dispacted actions
 */
export const getBooks = (set) => {
  const token = window.localStorage.jwtToken;
  return async (dispatch) => {
    dispatch(getBooksRequest());
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
      dispatch(getBooksReponse(jsonResponse.books)) :
      dispatch(getBooksError(jsonResponse.message))
  };
}
export default getBooks
