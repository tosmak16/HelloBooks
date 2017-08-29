import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setAuthToken from '../../shield/setAuthToken';
import { setCurrentuser } from '../../actions/setCurrentuser';

export default function userSignin(userData) {
  return dispatch => axios.post('/api/v2/users/signin', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const x = jwtDecode(token);
    dispatch(setCurrentuser(x));
  });
}
