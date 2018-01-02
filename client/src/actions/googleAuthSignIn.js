import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import jwtDecode from 'jwt-decode';
import { setCurrentuser } from '../../actions/setCurrentuser';
import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
/**
 * @export
 * @param {object} userData 
 * @returns {string} response message
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
      process.env.NODE_ENV === 'test' || Materialize.toast(jsonResponse.message, 1000, 'red');
      dispatch(signupError(jsonResponse.message));
    }
    else {
      const token = jsonResponse.token;
      window.localStorage.setItem('jwtToken', token);
      const decodedToken = jwtDecode(token);
      dispatch(setCurrentuser(decodedToken));
      dispatch(signupResponse(jsonResponse.message));
      process.env.NODE_ENV === 'test' || Materialize.toast(jsonResponse.message, 1000, 'green');
      if (localStorage.jwtToken && decodedToken.role.toString() === 'user') {
        browserHistory.push('/books')
      }
      else if (localStorage.jwtToken && decodedToken.role.toString() === 'admin') {
        browserHistory.push('/admin')
      }
    }
  };
}
