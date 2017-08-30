import axios from 'axios';
import { browserHistory } from 'react-router';

import { signupError, signupRequest, signupResponse } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

export function userSignup(userData) {
  let errors = '';
  return (dispatch) => {
    console.log('data: ' + userData);
    dispatch(signupRequest(userData));
    axios.post('/api/v2/users/signup', userData).then(
      (res) => {
        console.log(res);
        dispatch(signupResponse(res));
        dispatch(addFlashMessage({
          type: 'success',
          text: 'Registration succesful !'
        }));
        browserHistory.push('/');
      }
    ).catch(error => {
      errors = error.response.data;
      dispatch(signupError(error.response.data))
    });
  };
}
