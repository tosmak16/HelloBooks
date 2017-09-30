import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'


import { loginError, loginRequest, loginResponse } from '../../actions/loginActions';
import { setCurrentuser } from '../../actions/setCurrentuser';


export default function userSignin(userData) {
  return dispatch => {
    dispatch(loginRequest(userData));

    return fetch('http://localhost:8000/api/v2/users/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(
      (res) => res.json())
      .then((response) => {
        if (response.status >= 400) {

          throw response.message
        }
        else if (response.status === 200) {
          const token = response.token;
          window.localStorage.setItem('jwtToken', token);
          const x = jwtDecode(token);
          dispatch(setCurrentuser(x));
          dispatch(loginResponse(response.message));
          if (localStorage.jwtToken) {
            browserHistory.push('/books')
          }
        }
      })
      .catch(error => {
        dispatch(loginError(error));
      });

    // axios
    //   .post('/api/v2/users/signin', userData)
    //   .then((res) => {
    //     const token = res.data.token;
    //     localStorage.setItem('jwtToken', token);
    //     getbooks(false);
    //     const x = jwtDecode(token);
    //     dispatch(setCurrentuser(x));
    //     dispatch(loginResponse(res.data));
    //     if (localStorage.jwtToken) {
    //       browserHistory.push('/books')
    //     }

    //   })
    //   .catch(error => {
    //     dispatch(loginError(error.response.data));
    //   });
  }

}
