import { browserHistory } from 'react-router';

import { setCurrentuser } from '../../actions/setCurrentuser';


export default function logout() {

  localStorage.clear()

  console.log(localStorage.getItem('jwtToken'));
  return (dispatch) => {
    dispatch(setCurrentuser({}));

  };
}
