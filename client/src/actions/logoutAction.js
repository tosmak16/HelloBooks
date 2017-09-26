import { browserHistory } from 'react-router';

import { setCurrentuser } from '../../actions/setCurrentuser';


export default function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('count');
    localStorage.removeItem('bookId');
    localStorage.removeItem('id');

    localStorage.removeItem('category');
    localStorage.removeItem('isbn');
    localStorage.removeItem('stocknumber');
    localStorage.removeItem('author');
    localStorage.removeItem('summary');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('image');
    dispatch(setCurrentuser({}));
    browserHistory.push('/login');
  };
}
