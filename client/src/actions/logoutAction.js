import { browserHistory } from 'react-router';

import { setCurrentuser } from '../../actions/setCurrentuser';


export default function logout() {

  localStorage.clear()

  return (dispatch) => {
    dispatch(setCurrentuser({}));

  };
}
