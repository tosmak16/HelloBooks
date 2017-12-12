import axios from 'axios';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';

/**
 * @export
 * @param {object} userData 
 * @returns {string} response message
 */
export function userSignup(userData) {
  let error = '';
  return (dispatch) => {
    dispatch(signupRequest(userData));

    return fetch('/api/v2/users/signup', {
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
            console.log(response.message);
            dispatch(signupError(response.message));
          });
        }
        else {
          res.json().then((response) => {
            console.log(response.message);
            dispatch(signupResponse(response.message));
            browserHistory.push('/login');
          })
        }
      })
  };
}
