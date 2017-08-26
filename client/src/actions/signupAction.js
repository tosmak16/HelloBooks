import axios from 'axios';

export function userSignup(userData) {
  return dispatch => axios.post('/api/v2/users/signup', userData);
}
