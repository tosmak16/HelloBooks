import axios from 'axios';

export default function userSignin(userData) {
  return dispatch => axios.post('/api/v2/users/signin', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
  });
}
