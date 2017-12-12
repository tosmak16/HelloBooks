import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { loginError, loginRequest, loginResponse } from '../../actions/loginActions';
import { setCurrentuser } from '../../actions/setCurrentuser';

/** 
 * @export
 * @param {object} userData 
 * @returns {string} response message
 */
export default function userSignin(userData) {
  return dispatch => {
    dispatch(loginRequest(userData));
    return fetch('/api/v2/users/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            dispatch(loginError(response.message));
          })
        }
        else {
          res.json().then((response) => {
            const token = response.token;
            window.localStorage.setItem('jwtToken', token);
            const decodedToken = jwtDecode(token);
            dispatch(setCurrentuser(decodedToken));
            dispatch(loginResponse(response.message));
            if (localStorage.jwtToken && decodedToken.role.toString() === 'user') {
              browserHistory.push('/books')
            }
            else if (localStorage.jwtToken && decodedToken.role.toString() === 'admin') {
              browserHistory.push('/admin')
            }
          })
        }
      })
  }
}
