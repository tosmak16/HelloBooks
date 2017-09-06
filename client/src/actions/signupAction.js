import axios from 'axios';
import { browserHistory } from 'react-router';

import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';

export function userSignup(userData) {
  let errors = '';
  return (dispatch) => {
    dispatch(signupRequest(userData));
    axios.post('/api/v2/users/signup', userData).then(
      (res) => {
        dispatch(signupResponse(res));
        browserHistory.push('/');
      }
    ).catch(error => {
      dispatch(signupError(error.response.data))
    });
  };
}
