import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
import { validateUserDetails } from '../components/validationHelperFunctions/validateUserDetails';
/**
 * @export
 * @param {object} userData 
 * @returns {string} response message
 */
export function userSignup(userData) {
  let error = '';
  return (dispatch) => {
    dispatch(signupRequest(userData));
    validateUserDetails(userData).then((responseMessage) => {
      if (responseMessage !== '') {
        dispatch(signupError(responseMessage));
      }
      else {
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
                dispatch(signupError(response.message));
              });
            }
            else {
              res.json().then((response) => {
                dispatch(signupResponse(response.message));
                browserHistory.push('/login');
              })
            }
          })
      }
    })
  };
}
