import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'
import { loginError, loginRequest, loginResponse } from '../../actions/loginActions';
import { setCurrentuser } from '../../actions/setCurrentuser';
import { validateLoginDetails } from '../helperFunctions/validateLoginDetails';
/** 
 * @export userSignin
 * @description it sends request and  dispatches user login request, error and response
 * @param {object} userData 
 * @returns {action} dispacted actions
 */
export default function userSignin(userData) {
  return async dispatch => {
    dispatch(loginRequest(userData));
    const validationResponse = await validateLoginDetails(userData)
    if (validationResponse !== '') {
      dispatch(loginError(validationResponse));
    }
    else {
      const response = await fetch('/api/v2/users/signin', {
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
        dispatch(loginError(jsonResponse.message));
      }
      else {
        const token = jsonResponse.token;
        window.localStorage.setItem('jwtToken', token);
        const decodedToken = jwtDecode(token);
        dispatch(setCurrentuser(decodedToken));
        process.env.NODE_ENV === 'test' || Materialize.toast(response.message, 1000, 'green');
        dispatch(loginResponse(jsonResponse.message));
        if (localStorage.jwtToken && decodedToken.role.toString() === 'user') {
          browserHistory.push('/books')
        }
        else if (localStorage.jwtToken && decodedToken.role.toString() === 'admin') {
          browserHistory.push('/admin')
        }

      }

    }
  }
}
