import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
import { validateUserDetails } from '../helperFunctions/validateUserDetails';
/**
 * @export
 * @param {object} userData 
 * @returns {string} response message
 */
export function userSignup(userData) {
  let error = '';
  return async (dispatch) => {
    dispatch(signupRequest(userData));
    const validationResponse = await validateUserDetails(userData)
    if (validationResponse !== '') {
      process.env.NODE_ENV === 'test' || Materialize.toast(validationResponse, 1000, 'red');
      dispatch(signupError(validationResponse));
    }
    else {
      const response = await fetch('/api/v2/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const jsonResponse = await response.json().then(jsonRes => jsonRes)
      if (response.status >= 400) {
        process.env.NODE_ENV === 'test' || Materialize.toast(jsonResponse.message, 1000, 'red');
        dispatch(signupError(jsonResponse.message));
      }
      else {
        process.env.NODE_ENV === 'test' || Materialize.toast(jsonResponse.message, 1000, 'green');
        dispatch(signupResponse(jsonResponse.message));
        process.env.NODE_ENV === 'test' || browserHistory.push('/login');
      }
    }
  };
}
