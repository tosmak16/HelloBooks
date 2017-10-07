import lodash from 'lodash'
import { browserHistory } from 'react-router';

import { showBookDetails } from '../../actions/showBookDetails';



export default function checkBookDetails(bookId, set) {
  if (set === true) { browserHistory.push('/details'); }
  return (dispatch) => {
    dispatch(showBookDetails(bookId));
  }

}
