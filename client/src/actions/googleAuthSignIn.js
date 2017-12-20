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
  return (dispatch) => {
    dispatch(signupRequest(userData));
    return fetch('/api/v2/users/googleAuth', {
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
            const token = response.token;
            window.localStorage.setItem('jwtToken', token);
            const decodedToken = jwtDecode(token);
            dispatch(setCurrentuser(decodedToken));
            dispatch(signupResponse(response.message));
            if (localStorage.jwtToken && decodedToken.role.toString() === 'user') {
              browserHistory.push('/books')
            }
            else if (localStorage.jwtToken && decodedToken.role.toString() === 'admin') {
              browserHistory.push('/admin')
            }
          })
        }
      })
  };
}
