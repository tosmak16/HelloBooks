import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import jwtDecode from 'jwt-decode';
import { setCurrentUserAuth } from '../../actions/setCurrentUserAuth';
import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
/**
 * @export googleAuthSignIn
 * 
 * @description it sends user's google signin details
 * 
 * @param {object} googleUserData 
 * 
 * @returns {action} dispacted actions
 */
export const googleAuthSignIn = (googleUserData) => {
  const userData = {
    token: googleUserData.Zi.access_token,
    username: googleUserData.w3.ofa,
    password: googleUserData.Zi.id_token,
    email: googleUserData.w3.U3,
    firstName: googleUserData.w3.ofa,
    lastName: googleUserData.w3.wea
  }
  return async (dispatch) => {
    dispatch(signupRequest(userData));
    const response = await fetch('/api/v2/users/googleAuth', {
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
      const token = jsonResponse.token;
      window.localStorage.setItem('jwtToken', token);
      const decodedToken = jwtDecode(token);
      dispatch(setCurrentUserAuth(decodedToken));
      dispatch(signupResponse(jsonResponse.message));
      Materialize.toast(jsonResponse.message, 1000, 'green');
      if (localStorage.jwtToken && decodedToken.role.toString() === 'user') {
        browserHistory.push('/books')
      }
      else if (localStorage.jwtToken && decodedToken.role.toString() === 'admin') {
        browserHistory.push('/admin')
      }
    }
  };
}
export default googleAuthSignIn;
