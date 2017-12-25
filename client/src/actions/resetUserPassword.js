import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { resetPasswordRequest, resetPasswordResponse, resetPasswordError } from '../../actions/resetPassword';
import resetPassword from '../../reducers/resetPassword';

/**
 * @export
 * @param {boolean} set 
 * @returns {object} response
 */
export const resetUserPassword = (userData) => {
  const validEmail = /[a-zA-Z]+[a-zA-Z0-9]*@[a-z]+.[a-z]+$/;
  return (dispatch) => {
    if (_.isEmpty(userData) || !userData.match(validEmail)) {
      const errorMessage = 'valid email address is required'
      Materialize.toast(errorMessage, 1000, 'red');
      dispatch(resetPasswordError(errorMessage));
      return errorMessage;
    }
    dispatch(resetPasswordRequest(userData));
    return fetch('/api/v2/users/resetPassword', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userData })
    })
      .then(
      (res) => {
        if (res.status >= 400) {
          res.json().then((response) => {
            Materialize.toast(response.message, 1000, 'red');
            dispatch(resetPasswordError(response.message))
          })
        } else {
          res.json().then((response) => {
            Materialize.toast(response.message, 5000, 'green');
            dispatch(resetPasswordResponse(response.message));
          })
        }
      })
  };
}

export default resetUserPassword;
