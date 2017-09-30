import axios from 'axios';
import { browserHistory } from 'react-router';

import 'whatwg-fetch'




import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
import { displayMessage } from '../../actions/displayMessages'

export function userSignup(userData) {
  let error = '';
  return (dispatch) => {
    dispatch(signupRequest(userData));

    return fetch('http://localhost:8000/api/v2/users/signup', {
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
        if (response.status === 400) {

          throw response.message
        }
        else if (response.status === 201) {
          console.log(response.status);
          dispatch(signupResponse(response.message));
          dispatch(displayMessage({
            type: 'success',
            text: 'Registration successful'
          }));
          browserHistory.push('/');
        }
      })
      .catch(error => {

        dispatch(signupError(error))
      });
    // return axios.post('/api/v2/users/signup', userData).then(
    //   (response) => {
    //     dispatch(signupResponse(response));
    //     // dispatch(displayMessage({
    //     //   type: 'success',
    //     //   text: 'Registration successful'
    //     // }));
    //     browserHistory.push('/');
    //   }
    // ).catch(error => {
    //   dispatch(signupError(error.response.data))
    // });
  };
}
