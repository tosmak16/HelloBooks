import axios from 'axios';
import { browserHistory } from 'react-router';

import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
import { popMessage } from '../../actions/popMessages';

export function userSignup(userData) {
  let errors = '';
  return (dispatch) => {
    dispatch(signupRequest(userData));
    axios.post('/api/v2/users/signup', userData).then(
      (res) => {
        dispatch(signupResponse(res));
        dispatch(popMessage({
          type: 'success',
          text: 'Registration successful!'
        }));
        browserHistory.push('/');
      }
    ).catch(error => {
      dispatch(signupError(error.response.data))
    });
  };
}
