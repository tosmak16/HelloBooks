import { browserHistory } from 'react-router';

import { setCurrentuser } from '../../actions/setCurrentuser';


export default function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentuser({}));
    browserHistory.push('/login');
  };
}
