import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
import { validateUserDetails } from '../helperFunctions/validateUserDetails';
/**
 * @description it dispatch action for signup request and response
 * @param {object} userData 
 * @returns {action} dispacted actions
 */
export const signup = (userData) => {
  let error = '';
  return async (dispatch) => {
    dispatch(signupRequest(userData));
    const validationResponse = await validateUserDetails(userData)
    if (validationResponse !== '') {
      Materialize.toast(validationResponse, 1000, 'red');
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
        Materialize.toast(jsonResponse.message, 1000, 'red');
        dispatch(signupError(jsonResponse.message));
      }
      else {
        Materialize.toast(jsonResponse.message, 1000, 'green');
        dispatch(signupResponse(jsonResponse.message));
        process.env.NODE_ENV === 'test' || browserHistory.push('/login');
      }
    }
  };
}
export default signup;
