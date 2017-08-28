import axios from 'axios';
import jwt from 'jsonwebtoken';

import setAuthToken from '../../shield/setAuthToken';
import { setCurrentuser } from '../../actions/setCurrentuser';

export default function userSignin(userData) {
  return dispatch => axios.post('/api/v2/users/signin', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const x = jwt.decode(token);
    console.log(x);
    dispatch(setCurrentuser(x));
  });
}
