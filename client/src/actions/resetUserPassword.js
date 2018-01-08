import { browserHistory } from 'react-router';
import _ from 'lodash';
import 'whatwg-fetch'
import { resetPasswordRequest, resetPasswordResponse, resetPasswordError } from '../../actions/resetPassword';
import resetPassword from '../../reducers/resetPassword';

/**
 * @export resetUserPassword
 * 
 * @description it dispatches actions for password reset request and response
 * 
 * @param {string} userData 
 * 
 * @returns {action} dispacted actions
 */
export const resetUserPassword = (userData) => {
  const validEmail = /[a-zA-Z]+[a-zA-Z0-9]*@[a-z]+.[a-z]+$/;
  return async (dispatch) => {
    if (_.isEmpty(userData) || !userData.match(validEmail)) {
      const errorMessage = await 'valid email address is required'
      Materialize.toast(errorMessage, 1000, 'red');
      return dispatch(resetPasswordError(errorMessage));
    }
    dispatch(resetPasswordRequest(userData));
    const response = await fetch('/api/v2/users/resetPassword', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userData })
    })
    const jsonResponse = await response.json().then(jsonRes => jsonRes)
    if (response.status >= 400) {
      dispatch(resetPasswordError(jsonResponse.message))
      Materialize.toast(jsonResponse.message, 1000, 'red');
    } else {
      dispatch(resetPasswordResponse(jsonResponse.message));
      Materialize.toast(jsonResponse.message, 5000, 'green');
    }
  };
}
export default resetUserPassword;
