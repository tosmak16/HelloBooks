import axios from 'axios';

export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common.token = `${token}`;
  } else {
    delete axios.defaults.common.token;
  }
}

