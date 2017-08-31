import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { loginError, loginRequest, loginResponse } from '../../actions/loginActions';
import { popMessage } from '../../actions/popMessages';


import setAuthToken from '../../shield/setAuthToken';
import { setCurrentuser } from '../../actions/setCurrentuser';



export default function userSignin(userData) {
  return dispatch => {
    dispatch(loginRequest(userData));
    axios
      .post('/api/v2/users/signin', userData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);

        const x = jwtDecode(token);
        dispatch(setCurrentuser(x));
        dispatch(loginResponse(res.data));
      })
      .catch(error => {
        dispatch(loginError(error.response.data));
      });
  }

}
